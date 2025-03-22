// components/dashboard/FinancialSummary.tsx
"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, Wallet, RefreshCw, Calendar, ChevronRight, ChevronLeft } from "lucide-react";
import { useTransactions, Transaction } from "@/app/api/getTransaction";

// Extended interface to include time period data
interface FinancialSummary {
  totalBalance: number;
  totalCredited: number;
  totalSpent: number;
}

interface TimePeriodData {
  overall: FinancialSummary;
  weekly: FinancialSummary;
  monthly: FinancialSummary;
  currentWeek: string;
  currentMonth: string;
}

export default function FinancialDashboard() {
  const { transactions, isLoading, error: fetchError, refetch } = useTransactions();
  
  const [summaryData, setSummaryData] = useState<TimePeriodData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overall' | 'monthly' | 'weekly'>('overall');
  const [currentWeekOffset, setCurrentWeekOffset] = useState<number>(0);
  const [currentMonthOffset, setCurrentMonthOffset] = useState<number>(0);

  // Calculate financial summaries
  const calculateSummaries = (transactions: Transaction[]): TimePeriodData => {
    // Initialize empty summary objects
    const overall: FinancialSummary = { totalBalance: 0, totalCredited: 0, totalSpent: 0 };
    const weekly: FinancialSummary = { totalBalance: 0, totalCredited: 0, totalSpent: 0 };
    const monthly: FinancialSummary = { totalBalance: 0, totalCredited: 0, totalSpent: 0 };
    
    // Get current date for weekly and monthly filters
    const today = new Date();
    
    // Calculate week range based on offset
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay() + (currentWeekOffset * 7));
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekStart.getDate() + 6);

    // Calculate month range based on offset
    const currentMonth = new Date(today.getFullYear(), today.getMonth() + currentMonthOffset, 1);
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + currentMonthOffset + 1, 0);
    
    // Format date strings for display
    const weekDateFormat = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' });
    const currentWeekStr = `${weekDateFormat.format(currentWeekStart)} - ${weekDateFormat.format(currentWeekEnd)}`;
    
    const monthDateFormat = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' });
    const currentMonthStr = monthDateFormat.format(currentMonth);

    // Process transactions
    transactions.forEach(transaction => {
      const amount = transaction.Amount;
      const transactionDate = new Date(transaction.Date);
      
      // Overall summary
      if (transaction.Type === 'Credit') {
        overall.totalCredited += amount;
        overall.totalBalance += amount;
      } else {
        overall.totalSpent += amount;
        overall.totalBalance -= amount;
      }
      
      // Weekly summary
      if (transactionDate >= currentWeekStart && transactionDate <= currentWeekEnd) {
        if (transaction.Type === 'Credit') {
          weekly.totalCredited += amount;
          weekly.totalBalance += amount;
        } else {
          weekly.totalSpent += amount;
          weekly.totalBalance -= amount;
        }
      }
      
      // Monthly summary
      if (transactionDate.getMonth() === currentMonth.getMonth() && 
          transactionDate.getFullYear() === currentMonth.getFullYear()) {
        if (transaction.Type === 'Credit') {
          monthly.totalCredited += amount;
          monthly.totalBalance += amount;
        } else {
          monthly.totalSpent += amount;
          monthly.totalBalance -= amount;
        }
      }
    });
    
    return {
      overall,
      weekly,
      monthly,
      currentWeek: currentWeekStr,
      currentMonth: currentMonthStr
    };
  };

  const loadData = async () => {
    try {
      setRefreshing(true);
      await refetch();
      setError(null);
    } catch (err) {
      setError("Failed to load financial data");
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (transactions.length > 0) {
      const data = calculateSummaries(transactions);
      setSummaryData(data);
    }
  }, [transactions, currentWeekOffset, currentMonthOffset]);

  const handleRefresh = () => {
    loadData();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handlePreviousWeek = () => {
    setCurrentWeekOffset(prev => prev - 1);
  };

  const handleNextWeek = () => {
    setCurrentWeekOffset(prev => prev + 1);
  };

  const handlePreviousMonth = () => {
    setCurrentMonthOffset(prev => prev - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonthOffset(prev => prev + 1);
  };

  const resetTimeframes = () => {
    setCurrentWeekOffset(0);
    setCurrentMonthOffset(0);
  };

  if (isLoading && !refreshing) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-full mt-6"></div>
      </div>
    );
  }

  // Get the current active summary based on selected tab
  const getActiveSummary = () => {
    if (!summaryData) return null;
    switch (activeTab) {
      case 'monthly':
        return summaryData.monthly;
      case 'weekly':
        return summaryData.weekly;
      default:
        return summaryData.overall;
    }
  };

  const activeSummary = getActiveSummary();

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Financial Summary</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{refreshing ? "Refreshing..." : "Updated just now"}</span>
          <button 
            onClick={handleRefresh} 
            className={`p-2 rounded-full hover:bg-gray-100 focus:outline-none ${refreshing ? 'animate-spin' : ''}`}
            disabled={refreshing}
          >
            <RefreshCw size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* Time period tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => {setActiveTab('overall'); resetTimeframes();}}
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'overall' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Overall
        </button>
        <button
          onClick={() => setActiveTab('monthly')}
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'monthly' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Monthly
        </button>
        <button
          onClick={() => setActiveTab('weekly')}
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'weekly' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Weekly
        </button>
      </div>
      
      {/* Time period navigation */}
      {activeTab !== 'overall' && summaryData && (
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={activeTab === 'weekly' ? handlePreviousWeek : handlePreviousMonth}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
          >
            <ChevronLeft size={16} className="text-gray-600" />
          </button>
          
          <div className="flex items-center">
            <Calendar size={16} className="text-gray-600 mr-2" />
            <span className="font-medium">
              {activeTab === 'weekly' ? summaryData.currentWeek : summaryData.currentMonth}
            </span>
          </div>
          
          <button
            onClick={activeTab === 'weekly' ? handleNextWeek : handleNextMonth}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
          >
            <ChevronRight size={16} className="text-gray-600" />
          </button>
        </div>
      )}
      
      {fetchError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {fetchError}
          </p>
          <button 
            onClick={handleRefresh} 
            className="mt-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none"
          >
            Retry
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Balance */}
        <div className="rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow bg-gray-50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <Wallet size={20} className="text-gray-700 mr-2" />
                <p className="text-base font-medium text-gray-600">Total Balance</p>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {activeSummary ? formatCurrency(activeSummary.totalBalance) : '₹0'}
              </p>
              <div className="mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${activeSummary && activeSummary.totalBalance >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {activeSummary && activeSummary.totalBalance >= 0 ? "Positive Balance" : "Negative Balance"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Credited */}
        <div className="rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow bg-gray-50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <ArrowUpRight size={20} className="text-green-600 mr-2" />
                <p className="text-base font-medium text-gray-600">Total Income</p>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {activeSummary ? formatCurrency(activeSummary.totalCredited) : '₹0'}
              </p>
              <div className="mt-1">
                <div className="flex items-center text-sm">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Income
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Spent */}
        <div className="rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow bg-gray-50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <ArrowDownRight size={20} className="text-red-600 mr-2" />
                <p className="text-base font-medium text-gray-600">Total Expenses</p>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {activeSummary ? formatCurrency(activeSummary.totalSpent) : '₹0'}
              </p>
              <div className="mt-1">
                <div className="flex items-center text-sm">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                    Expenses
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar showing spending vs income ratio */}
      {activeSummary && (
        <div className="mt-8 p-6 border border-gray-200 rounded-lg bg-white">
          <div className="flex justify-between items-center mb-4">
            <p className="text-base font-medium text-gray-900">Spending vs Income</p>
            <div className="flex items-center">
              <span className="inline-block h-3 w-3 rounded-full bg-black mr-1"></span>
              <p className="text-sm font-medium text-gray-600">
                {activeSummary.totalSpent > 0 && activeSummary.totalCredited > 0
                  ? `${Math.round((activeSummary.totalSpent / activeSummary.totalCredited) * 100)}%`
                  : "0%"}
              </p>
            </div>
          </div>
          
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-gray-600">
                  Healthy spending: &lt;70%
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-gray-600">
                  {activeSummary.totalSpent > 0 && activeSummary.totalCredited > 0
                    ? Math.round((activeSummary.totalSpent / activeSummary.totalCredited) * 100)
                    : 0}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-4 mb-2 text-xs flex rounded-full bg-gray-200">
              <div
                style={{ width: `${Math.min(100, Math.round((activeSummary.totalSpent / activeSummary.totalCredited) * 100) || 0)}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                  activeSummary.totalSpent / activeSummary.totalCredited < 0.7 ? 'bg-black' : 
                  activeSummary.totalSpent / activeSummary.totalCredited < 0.9 ? 'bg-gray-700' : 'bg-gray-900'
                }`}
              ></div>
            </div>
            
            {/* Legend */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-black mr-2"></span>
                <span className="text-xs text-gray-600">0-70% (Good)</span>
              </div>
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-gray-700 mr-2"></span>
                <span className="text-xs text-gray-600">71-90% (Warning)</span>
              </div>
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-gray-900 mr-2"></span>
                <span className="text-xs text-gray-600">91-100% (Critical)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      {activeSummary && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg bg-white">
            <p className="text-sm text-gray-600">Savings Rate</p>
            <p className="text-xl font-semibold">
              {activeSummary.totalCredited > 0 
                ? `${Math.round(((activeSummary.totalCredited - activeSummary.totalSpent) / activeSummary.totalCredited) * 100)}%` 
                : "0%"}
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg bg-white">
            <p className="text-sm text-gray-600">Average Transaction</p>
            <p className="text-xl font-semibold">
              {formatCurrency((activeSummary.totalCredited + activeSummary.totalSpent) / 
                (activeSummary === summaryData?.weekly ? 7 : 
                 activeSummary === summaryData?.monthly ? 30 : 
                 Math.max(transactions.length, 1)))}
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
          View All Transactions
        </button>
      </div>
    </div>
  );
}