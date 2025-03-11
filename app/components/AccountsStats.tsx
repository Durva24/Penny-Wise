// components/dashboard/FinancialSummary.tsx
"use client";

import React, { useEffect, useState } from "react";
import { FinancialSummary, fetchTransactionSummary } from "@/app/api/getStats";
import { ArrowUpRight, ArrowDownRight, Wallet, RefreshCw } from "lucide-react";

export default function FinancialDashboard() {
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchTransactionSummary();
      setSummary(data);
      setError(null);
    } catch (err) {
      setError("Failed to load financial data");
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading && !refreshing) {
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
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
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
                {summary ? formatCurrency(summary.totalBalance) : '₹0'}
              </p>
              <div className="mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${summary && summary.totalBalance >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {summary && summary.totalBalance >= 0 ? "Positive Balance" : "Negative Balance"}
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
                {summary ? formatCurrency(summary.totalCredited) : '₹0'}
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
                {summary ? formatCurrency(summary.totalSpent) : '₹0'}
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
      {summary && (
        <div className="mt-8 p-6 border border-gray-200 rounded-lg bg-white">
          <div className="flex justify-between items-center mb-4">
            <p className="text-base font-medium text-gray-900">Spending vs Income</p>
            <div className="flex items-center">
              <span className="inline-block h-3 w-3 rounded-full bg-black mr-1"></span>
              <p className="text-sm font-medium text-gray-600">
                {summary.totalSpent > 0 && summary.totalCredited > 0
                  ? `${Math.round((summary.totalSpent / summary.totalCredited) * 100)}%`
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
                  {summary.totalSpent > 0 && summary.totalCredited > 0
                    ? Math.round((summary.totalSpent / summary.totalCredited) * 100)
                    : 0}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-4 mb-2 text-xs flex rounded-full bg-gray-200">
              <div
                style={{ width: `${Math.min(100, Math.round((summary.totalSpent / summary.totalCredited) * 100) || 0)}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                  summary.totalSpent / summary.totalCredited < 0.7 ? 'bg-black' : 
                  summary.totalSpent / summary.totalCredited < 0.9 ? 'bg-gray-700' : 'bg-gray-900'
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
      {summary && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg bg-white">
            <p className="text-sm text-gray-600">Savings Rate</p>
            <p className="text-gray-xl font-semibold">
              {summary.totalCredited > 0 
                ? `${Math.round(((summary.totalCredited - summary.totalSpent) / summary.totalCredited) * 100)}%` 
                : "0%"}
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg bg-white">
            <p className="text-sm text-gray-600">Average Transaction</p>
            <p className="text-xl font-semibold">
              {formatCurrency((summary.totalCredited + summary.totalSpent) / 2)}
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