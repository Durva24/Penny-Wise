// components/dashboard/TransactionDashboard.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { useTransactions, Transaction } from '@/app/api/getTransaction';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, Cell 
} from 'recharts';

// Type definitions for our data
type PeriodView = 'all' | 'monthly' | 'weekly';
type TransactionSummary = {
  date: string;
  balance: number;
  income: number;
  expense: number;
};

// Currency formatter for Indian Rupees
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Loading skeleton component
const ChartSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
    <div className="h-64 w-full bg-gray-200 rounded"></div>
  </div>
);

// Error component
const ErrorDisplay = ({ message, retry }: { message: string, retry: () => void }) => (
  <div className="py-6 flex flex-col items-center justify-center text-center">
    <div className="mb-3 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    </div>
    <h4 className="text-base font-medium text-gray-900">Failed to load transaction data</h4>
    <p className="mt-1 text-sm text-gray-500">{message}</p>
    <button 
      onClick={retry}
      className="mt-4 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50"
    >
      Try Again
    </button>
  </div>
);

// Empty state component
const EmptyState = () => (
  <div className="py-6 flex flex-col items-center justify-center text-center">
    <div className="mb-3 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
        <rect x="2" y="5" width="20" height="14" rx="2"></rect>
        <line x1="2" y1="10" x2="22" y2="10"></line>
      </svg>
    </div>
    <h4 className="text-base font-medium text-gray-900">No transaction data available</h4>
    <p className="mt-1 text-sm text-gray-500">Your transactions will appear here once you add them.</p>
  </div>
);

export default function TransactionDashboard() {
  const { transactions, isLoading, error, refetch } = useTransactions();
  const [activeView, setActiveView] = useState<PeriodView>('all');
  
  // Process the transaction data
  const processedData = useMemo(() => {
    if (!transactions.length) return { balanceHistory: [], monthlySummary: [], weeklySummary: [] };
    
    // Helper to parse dates from string
    const parseDate = (dateStr: string) => {
      if (!dateStr) return new Date(); // Default to current date if none provided
      
      // Try different date formats
      const dateFormats = [
        /(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})/, // DD-MM-YYYY or DD/MM/YYYY
        /(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/, // YYYY-MM-DD or YYYY/MM/DD
        /(\d{1,2})[-\/](\d{1,2})[-\/](\d{2})/, // DD-MM-YY or DD/MM/YY
      ];
      
      for (const format of dateFormats) {
        const match = dateStr.match(format);
        if (match) {
          // Adjust based on format
          if (format === dateFormats[0]) {
            return new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
          } else if (format === dateFormats[1]) {
            return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
          } else {
            // For YY format, assume 20XX for years < 50, 19XX for years >= 50
            const year = Number(match[3]);
            const fullYear = year < 50 ? 2000 + year : 1900 + year;
            return new Date(fullYear, Number(match[2]) - 1, Number(match[1]));
          }
        }
      }
      
      // Try as direct Date parsing
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? new Date() : date;
    };
    
    // Sort transactions by date
    const sortedTransactions = [...transactions].sort((a, b) => {
      const dateA = parseDate(a.Date);
      const dateB = parseDate(b.Date);
      return dateA.getTime() - dateB.getTime();
    });
    
    // Calculate running balance
    let balance = 0;
    const balanceHistory = sortedTransactions.map((transaction, index) => {
      if (transaction.Type === 'Credit') {
        balance += transaction.Amount;
      } else {
        balance -= transaction.Amount;
      }
      
      return {
        id: index,
        date: transaction.Date,
        name: transaction.Name,
        amount: transaction.Amount,
        type: transaction.Type,
        balance: balance,
      };
    });
    
    // Group transactions by month
    const monthlyData: Record<string, TransactionSummary> = {};
    
    sortedTransactions.forEach(transaction => {
      const date = parseDate(transaction.Date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          date: monthName,
          balance: 0,
          income: 0,
          expense: 0
        };
      }
      
      if (transaction.Type === 'Credit') {
        monthlyData[monthKey].income += transaction.Amount;
        monthlyData[monthKey].balance += transaction.Amount;
      } else {
        monthlyData[monthKey].expense += transaction.Amount;
        monthlyData[monthKey].balance -= transaction.Amount;
      }
    });
    
    const monthlySummary = Object.values(monthlyData);
    
    // Group transactions by week
    const weeklyData: Record<string, TransactionSummary> = {};
    
    sortedTransactions.forEach(transaction => {
      const date = parseDate(transaction.Date);
      
      // Get the week number (approximate)
      const startDate = new Date(date.getFullYear(), 0, 1);
      const days = Math.floor((date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
      const weekNumber = Math.ceil(days / 7);
      
      const weekKey = `${date.getFullYear()}-W${String(weekNumber).padStart(2, '0')}`;
      const weekLabel = `W${weekNumber}, ${date.toLocaleString('default', { month: 'short' })}`;
      
      if (!weeklyData[weekKey]) {
        weeklyData[weekKey] = {
          date: weekLabel,
          balance: 0,
          income: 0,
          expense: 0
        };
      }
      
      if (transaction.Type === 'Credit') {
        weeklyData[weekKey].income += transaction.Amount;
        weeklyData[weekKey].balance += transaction.Amount;
      } else {
        weeklyData[weekKey].expense += transaction.Amount;
        weeklyData[weekKey].balance -= transaction.Amount;
      }
    });
    
    const weeklySummary = Object.values(weeklyData);
    
    return { balanceHistory, monthlySummary, weeklySummary };
  }, [transactions]);
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-lg text-sm">
          {payload[0].payload.date && <p className="font-medium text-gray-700 mb-1">{payload[0].payload.date}</p>}
          
          {payload.map((entry: any, index: number) => (
            <p key={`tooltip-${index}`} style={{ color: entry.color }} className="flex items-center justify-between gap-4">
              <span>{entry.name}:</span>
              <span className="font-medium">{formatCurrency(entry.value)}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  // Custom legend for bar charts
  const renderColorfulLegendText = (value: string) => {
    const color = value === 'Income' ? '#22c55e' : value === 'Expense' ? '#ef4444' : '#3b82f6';
    return <span style={{ color }}>{value}</span>;
  };
  
  // Limit data points for better visualization
  const getVisibleData = () => {
    if (activeView === 'monthly') {
      return processedData.monthlySummary.slice(-12); // Last 12 months
    } else if (activeView === 'weekly') {
      return processedData.weeklySummary.slice(-12); // Last 12 weeks
    } else {
      // For 'all' view, limit to last 50 transactions for better visualization
      return processedData.balanceHistory.slice(-50);
    }
  };
  
  // Calculate statistics
  const getStats = () => {
    if (!transactions.length) return { total: 0, income: 0, expense: 0 };
    
    const income = transactions
      .filter(t => t.Type === 'Credit')
      .reduce((sum, t) => sum + t.Amount, 0);
      
    const expense = transactions
      .filter(t => t.Type === 'Debit')
      .reduce((sum, t) => sum + t.Amount, 0);
      
    return {
      total: income - expense,
      income,
      expense
    };
  };
  
  const stats = getStats();
  const visibleData = getVisibleData();
  
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h4 className="text-sm font-medium text-black-500 mb-1">Current Balance</h4>
          <p className="text-2xl font-semibold text-black-500">{formatCurrency(stats.total)}</p>
        </div>
        
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h4 className="text-sm font-medium text-gray-500 mb-1">Total Income</h4>
          <p className="text-2xl font-semibold text-green-500">{formatCurrency(stats.income)}</p>
        </div>
        
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h4 className="text-sm font-medium text-gray-500 mb-1">Total Expenses</h4>
          <p className="text-2xl font-semibold text-red-500">{formatCurrency(stats.expense)}</p>
        </div>
      </div>
      
      {/* Main Chart */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Financial Overview</h3>
          
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setActiveView('all')}
              className={`px-4 py-2 text-sm font-medium ${
                activeView === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } rounded-l-lg border border-gray-200`}
            >
              All Time
            </button>
            <button
              onClick={() => setActiveView('monthly')}
              className={`px-4 py-2 text-sm font-medium ${
                activeView === 'monthly'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-gray-200`}
            >
              Monthly
            </button>
            <button
              onClick={() => setActiveView('weekly')}
              className={`px-4 py-2 text-sm font-medium ${
                activeView === 'weekly'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } rounded-r-lg border border-gray-200`}
            >
              Weekly
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <ChartSkeleton />
        ) : error ? (
          <ErrorDisplay message={error} retry={refetch} />
        ) : !transactions.length ? (
          <EmptyState />
        ) : (
          <div className="h-80">
            {activeView === 'all' ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visibleData} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value, index) => index % 5 === 0 ? value : ''}
                    height={60}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => formatCurrency(value)}
                    width={80}
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    name="Balance"
                    type="monotone"
                    dataKey="balance"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={visibleData} 
                  margin={{ top: 5, right: 5, left: 5, bottom: 25 }}
                  barGap={0}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    height={60}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => formatCurrency(value)}
                    width={80}
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend formatter={renderColorfulLegendText} />
                  <Bar name="Income" dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  <Bar name="Expense" dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  <Line
                    name="Balance"
                    type="monotone"
                    dataKey="balance"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        )}
        
        {!isLoading && !error && transactions.length > 0 && (
          <div className="pt-4 text-center text-sm text-gray-500">
            {activeView === 'all' ? (
              <p>Showing account balance over time based on your transactions</p>
            ) : activeView === 'monthly' ? (
              <p>Monthly income, expenses and balance for the last 12 months</p>
            ) : (
              <p>Weekly income, expenses and balance for the last 12 weeks</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}