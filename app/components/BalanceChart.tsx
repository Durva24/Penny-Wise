// components/dashboard/AccountBalanceChart.tsx
"use client";

import React from 'react';
import { useTransactions } from '@/app/api/getTransaction';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

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
    <h4 className="text-base font-medium text-gray-900">Failed to load balance data</h4>
    <p className="mt-1 text-sm text-gray-500">{message}</p>
    <button 
      onClick={retry}
      className="mt-4 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50"
    >
      Try Again
    </button>
  </div>
);

export default function AccountBalanceChart() {
  const { transactions, isLoading, error, refetch } = useTransactions();
  
  // Calculate balance history based on transactions
  const calculateBalanceHistory = () => {
    if (!transactions.length) return [];
    
    // Sort transactions by Sr. No. to maintain chronological order
    const sortedTransactions = [...transactions].sort((a, b) => a['Sr. No.'] - b['Sr. No.']);
    
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
        balance: balance,
      };
    });
    
    return balanceHistory;
  };
  
  const balanceHistory = calculateBalanceHistory();
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-lg text-sm">
          <p className="font-medium text-gray-900">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Account Balance</h3>
      </div>
      
      {isLoading ? (
        <ChartSkeleton />
      ) : error ? (
        <ErrorDisplay message={error} retry={refetch} />
      ) : balanceHistory.length === 0 ? (
        <div className="py-6 flex flex-col items-center justify-center text-center">
          <div className="mb-3 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <rect x="2" y="5" width="20" height="14" rx="2"></rect>
              <line x1="2" y1="10" x2="22" y2="10"></line>
            </svg>
          </div>
          <h4 className="text-base font-medium text-gray-900">No balance data available</h4>
          <p className="mt-1 text-sm text-gray-500">Your account balance will appear here once you have transactions.</p>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={balanceHistory} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <XAxis dataKey="id" hide={true} />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => formatCurrency(value)}
                width={60}
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#000"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#000", strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}