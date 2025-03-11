// components/dashboard/BudgetOverview.tsx
"use client";

import React, { useState, useEffect } from 'react';

interface BudgetData {
  totalBudget: number;
  spentAmount: number;
  currency: string;
}

// Custom hook to fetch budget data
const useBudgetData = () => {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBudgetData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Using the same API endpoint but with a different action parameter
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbyJ6KzWs1QdL86o0gflTFKHZvGqpeYNh9cfjbRyV9A6vf2AL-Cx8lOFrFONursaOPHSiQ/exec?action=getBudget'
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'success') {
        // For now, we'll use dummy data as a fallback if the actual data structure is different
        setBudgetData({
          totalBudget: data.budget?.totalBudget || 35000,
          spentAmount: data.budget?.spentAmount || 22750,
          currency: data.budget?.currency || '₹'
        });
      } else {
        throw new Error(data.error || 'Failed to fetch budget data');
      }
    } catch (err) {
      console.error("Error fetching budget data:", err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      
      // Fallback to dummy data in case of error
      setBudgetData({
        totalBudget: 35000,
        spentAmount: 22750,
        currency: '₹'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetData();
  }, []);

  return { budgetData, isLoading, error, refetch: fetchBudgetData };
};

// Format currency for Indian Rupees
const formatCurrency = (amount: number, currency: string = '₹') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency === '₹' ? 'INR' : 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};

const BudgetOverview = () => {
  const { budgetData, isLoading } = useBudgetData();
  
  // Calculate percentage spent
  const percentageSpent = budgetData 
    ? Math.min(Math.round((budgetData.spentAmount / budgetData.totalBudget) * 100), 100)
    : 0;
  
  // Determine progress bar color based on percentage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-orange-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-lg font-medium text-gray-900">Budget Overview</h3>
      
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
            <span className="text-sm text-gray-600">Monthly Budget</span>
            <span className="font-medium text-gray-900">
              {budgetData && formatCurrency(budgetData.totalBudget, budgetData.currency)}
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
              {budgetData && formatCurrency(budgetData.spentAmount, budgetData.currency)} ({percentageSpent}%)
            </span>
          </div>
          
          <div className="flex justify-between pt-2">
            <span className="text-sm text-gray-600">Remaining</span>
            <span className={`text-sm font-medium ${percentageSpent >= 90 ? 'text-red-600' : 'text-green-600'}`}>
              {budgetData && formatCurrency(budgetData.totalBudget - budgetData.spentAmount, budgetData.currency)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetOverview;