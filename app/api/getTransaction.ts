// lib/api/transactionApi.ts
import { useState, useEffect } from 'react';

// Define types for our transaction data
export interface Transaction {
  'Sr. No.': number;
  'Name': string;
  'Type': 'Credit' | 'Debit';
  'Amount': number;
  'Transaction Type': string;
  'Category': string;
  'Note': string;
}

export interface TransactionResponse {
  status: 'success' | 'error';
  data: Transaction[];
  error?: string;
}

// Custom hook to fetch transactions with loading and error states
export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbyJ6KzWs1QdL86o0gflTFKHZvGqpeYNh9cfjbRyV9A6vf2AL-Cx8lOFrFONursaOPHSiQ/exec?action=getTransactions'
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data: TransactionResponse = await response.json();
      
      if (data.status === 'success') {
        setTransactions(data.data);
      } else {
        throw new Error(data.error || 'Failed to fetch transactions');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return { transactions, isLoading, error, refetch: fetchTransactions };
};