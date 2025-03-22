// components/dashboard/SpendingDashboard.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { useTransactions, Transaction } from '../../lib/api/transactionApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Utility functions for data processing
const formatCurrency = (amount: number, currency: string = '₹') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency === '₹' ? 'INR' : 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};

const getWeekNumber = (date: Date): number => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

const getWeekRange = (date: Date): string => { 
  const currentDate = new Date(date);
  const day = currentDate.getDay();
  const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is sunday
  const startOfWeek = new Date(currentDate.setDate(diff));
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  
  const startMonth = startOfWeek.toLocaleString('default', { month: 'short' });
  const endMonth = endOfWeek.toLocaleString('default', { month: 'short' });
  
  return `${startOfWeek.getDate()} ${startMonth} - ${endOfWeek.getDate()} ${endMonth}`;
};

const getCurrentMonth = (): string => {
  return new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
};

interface PeriodData {
  totalBudget: number;
  spent: number;
  creditAmount: number;
  debitAmount: number;
  transactionCount: number;
  topCategories: Array<{category: string, amount: number}>;
  currency: string;
  periodLabel: string;
}

const SpendingDashboard = () => {
  const { transactions, isLoading, error } = useTransactions();
  const [viewMode, setViewMode] = useState<'monthly' | 'weekly'>('monthly');
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedWeek, setSelectedWeek] = useState<number>(getWeekNumber(new Date()));
  const [currentYear] = useState<number>(new Date().getFullYear());
  
  // Monthly budget estimation (in a real app, this would come from user settings)
  const monthlyBudget = 35000;
  const weeklyBudget = monthlyBudget / 4.3; // Approximate weekly budget
  
  // Process data based on selected time period
  const periodData = useMemo((): PeriodData => {
    if (isLoading || !transactions.length) {
      return {
        totalBudget: viewMode === 'monthly' ? monthlyBudget : weeklyBudget,
        spent: 0,
        creditAmount: 0,
        debitAmount: 0,
        transactionCount: 0,
        topCategories: [],
        currency: '₹',
        periodLabel: viewMode === 'monthly' ? getCurrentMonth() : getWeekRange(new Date())
      };
    }
    
    // Filter transactions by selected period
    const filteredTransactions = transactions.filter(tx => {
      const txDate = new Date(tx.Date);
      if (viewMode === 'monthly') {
        return txDate.getMonth() === selectedMonth && txDate.getFullYear() === currentYear;
      } else {
        return getWeekNumber(txDate) === selectedWeek && txDate.getFullYear() === currentYear;
      }
    });
    
    // Calculate totals
    let creditAmount = 0;
    let debitAmount = 0;
    const categoryAmounts: Record<string, number> = {};
    
    filteredTransactions.forEach(tx => {
      if (tx.Type === 'Credit') {
        creditAmount += tx.Amount;
      } else {
        debitAmount += tx.Amount;
        
        // Accumulate category amounts for spending analysis
        const category = tx.Category || 'Uncategorized';
        categoryAmounts[category] = (categoryAmounts[category] || 0) + tx.Amount;
      }
    });
    
    // Get top spending categories
    const topCategories = Object.entries(categoryAmounts)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 4);
    
    return {
      totalBudget: viewMode === 'monthly' ? monthlyBudget : weeklyBudget,
      spent: debitAmount,
      creditAmount,
      debitAmount,
      transactionCount: filteredTransactions.length,
      topCategories,
      currency: '₹',
      periodLabel: viewMode === 'monthly' 
        ? new Date(currentYear, selectedMonth).toLocaleString('default', { month: 'long', year: 'numeric' })
        : getWeekRange(new Date(currentYear, 0, 1 + (selectedWeek - 1) * 7))
    };
  }, [transactions, isLoading, viewMode, selectedMonth, selectedWeek, currentYear]);
  
  // Calculate percentage spent
  const percentageSpent = Math.min(Math.round((periodData.spent / periodData.totalBudget) * 100), 100);
  
  // Determine progress bar color based on percentage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-orange-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  // Generate period navigation options
  const periodOptions = useMemo(() => {
    if (viewMode === 'monthly') {
      return Array.from({ length: 12 }, (_, i) => ({
        value: i,
        label: new Date(currentYear, i).toLocaleString('default', { month: 'long' })
      }));
    } else {
      // Generate week options for the current year
      const weeksInYear = 52;
      return Array.from({ length: weeksInYear }, (_, i) => ({
        value: i + 1,
        label: `Week ${i + 1}: ${getWeekRange(new Date(currentYear, 0, 1 + i * 7))}`
      }));
    }
  }, [viewMode, currentYear]);
  
  // Handle period navigation
  const handlePrevPeriod = () => {
    if (viewMode === 'monthly') {
      setSelectedMonth(prev => (prev === 0 ? 11 : prev - 1));
    } else {
      setSelectedWeek(prev => (prev === 1 ? 52 : prev - 1));
    }
  };
  
  const handleNextPeriod = () => {
    if (viewMode === 'monthly') {
      setSelectedMonth(prev => (prev === 11 ? 0 : prev + 1));
    } else {
      setSelectedWeek(prev => (prev === 52 ? 1 : prev + 1));
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Period selection tabs */}
      <Tabs 
        defaultValue="monthly" 
        onValueChange={(value) => setViewMode(value as 'monthly' | 'weekly')}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="monthly">Monthly View</TabsTrigger>
            <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={handlePrevPeriod}
              className="p-1 rounded hover:bg-gray-100"
              aria-label="Previous Period"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            
            <span className="font-medium">{periodData.periodLabel}</span>
            
            <button 
              onClick={handleNextPeriod}
              className="p-1 rounded hover:bg-gray-100"
              aria-label="Next Period"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
        
        <TabsContent value="monthly" className="mt-0">
          <BudgetSummary 
            periodData={periodData}
            percentageSpent={percentageSpent}
            getProgressColor={getProgressColor}
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-0">
          <BudgetSummary 
            periodData={periodData}
            percentageSpent={percentageSpent}
            getProgressColor={getProgressColor}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
      
      {/* Additional spending analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Transaction Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-500">Total Transactions</span>
                  <p className="text-xl font-semibold">{periodData.transactionCount}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-green-50 rounded">
                    <span className="text-xs text-green-600">Income</span>
                    <p className="font-medium text-green-700">
                      {formatCurrency(periodData.creditAmount, periodData.currency)}
                    </p>
                  </div>
                  
                  <div className="p-2 bg-red-50 rounded">
                    <span className="text-xs text-red-600">Expenses</span>
                    <p className="font-medium text-red-700">
                      {formatCurrency(periodData.debitAmount, periodData.currency)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Top Spending Categories</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ) : periodData.topCategories.length > 0 ? (
              <div className="space-y-3">
                {periodData.topCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 bg-blue-${(index + 4) * 100}`}></div>
                      <span className="text-sm">{category.category}</span>
                    </div>
                    <span className="text-sm font-medium">
                      {formatCurrency(category.amount, periodData.currency)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No spending data available for this period.</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          Error loading transactions: {error}
        </div>
      )}
    </div>
  );
};

// Budget summary component extracted for reuse
const BudgetSummary = ({ 
  periodData, 
  percentageSpent, 
  getProgressColor,
  isLoading 
}: { 
  periodData: PeriodData,
  percentageSpent: number,
  getProgressColor: (percentage: number) => string,
  isLoading: boolean
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Budget Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3 animate-pulse">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200"></div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-28"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Budget</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(periodData.totalBudget, periodData.currency)}
              </span>
            </div>
            
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div 
                className={`h-2 rounded-full ${getProgressColor(percentageSpent)}`} 
                style={{ width: `${percentageSpent}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Spent</span>
              <span className="text-sm text-gray-900">
                {formatCurrency(periodData.spent, periodData.currency)} ({percentageSpent}%)
              </span>
            </div>
            
            <div className="flex justify-between pt-2">
              <span className="text-sm text-gray-600">Remaining</span>
              <span className={`text-sm font-medium ${percentageSpent >= 90 ? 'text-red-600' : 'text-green-600'}`}>
                {formatCurrency(periodData.totalBudget - periodData.spent, periodData.currency)}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpendingDashboard;