// components/dashboard/TransactionHistory.tsx
"use client";

import React, { useState, Suspense, lazy } from 'react';
import { useTransactions } from '@/app/api/getTransaction';

// Currency formatter for Indian Rupees
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Function to get transaction icon based on category
const getTransactionIcon = (category: string) => {
  const icons: Record<string, React.ReactNode> = {
    'Food': (
      <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
        </svg>
      </div>
    ),
    'Shopping': (
      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
      </div>
    ),
    'Transport': (
      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
          <rect x="1" y="3" width="15" height="13"></rect>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
      </div>
    ),
    'default': (
      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
          <rect x="2" y="5" width="20" height="14" rx="2"></rect>
          <line x1="2" y1="10" x2="22" y2="10"></line>
        </svg>
      </div>
    )
  };

  return icons[category] || icons['default'];
};

// Skeleton loader component for transactions
const TransactionSkeleton = () => (
  <div className="animate-pulse space-y-3">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-center justify-between py-3">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200"></div>
          <div className="ml-3">
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
            <div className="h-2 w-16 bg-gray-200 rounded mt-2"></div>
          </div>
        </div>
        <div className="h-3 w-16 bg-gray-200 rounded"></div>
      </div>
    ))}
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
    <h4 className="text-base font-medium text-gray-900">Failed to load transactions</h4>
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
    <h4 className="text-base font-medium text-gray-900">No transactions yet</h4>
    <p className="mt-1 text-sm text-gray-500">Transactions will appear here once you start using your accounts.</p>
    <button className="mt-4 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50">
      Add Transaction
    </button>
  </div>
);

export default function TransactionHistory() {
  const { transactions, isLoading, error, refetch } = useTransactions();
  const [filter, setFilter] = useState<'all' | 'Credit' | 'Debit'>('all');
  
  // Filter transactions based on current filter
  const filteredTransactions = transactions.filter(transaction => 
    filter === 'all' || transaction.Type === filter
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
        <button className="text-sm text-gray-600 hover:text-black">See All</button>
      </div>
      
      {/* Filters */}
      <div className="mb-4 flex space-x-2 overflow-x-auto">
        <button 
          onClick={() => setFilter('all')}
          className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
            filter === 'all' 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Transactions
        </button>
        <button 
          onClick={() => setFilter('Credit')}
          className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
            filter === 'Credit' 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Income
        </button>
        <button 
          onClick={() => setFilter('Debit')}
          className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
            filter === 'Debit' 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Expenses
        </button>
      </div>
      
      {/* Transaction List with loading, error and empty states */}
      {isLoading ? (
        <TransactionSkeleton />
      ) : error ? (
        <ErrorDisplay message={error} retry={refetch} />
      ) : filteredTransactions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-1 divide-y divide-gray-100">
          {filteredTransactions.map((transaction) => (
            <div key={transaction['Sr. No.']} className="flex items-center justify-between py-3">
              <div className="flex items-center">
                {getTransactionIcon(transaction.Category)}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{transaction.Name}</p>
                  <p className="text-xs text-gray-500">{transaction.Category} • {transaction['Transaction Type']}</p>
                </div>
              </div>
              <div className={`text-sm font-medium ${
                transaction.Type === 'Credit' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.Type === 'Credit' ? '+' : '-'}{formatCurrency(transaction.Amount)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}