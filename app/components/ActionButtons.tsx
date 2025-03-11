// components/dashboard/TransactionForm.tsx
"use client";

import { useState, FormEvent } from "react";
import { addTransaction } from "@/app/api/putTransaction";

interface FormData {
  name: string;
  type: string;
  amount: number;
  transactionType: string;
  category: string;
  note: string;
  date: string;
}

export default function TransactionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "Expense", // Default to Expense
    amount: 0,
    transactionType: "Cash", // Default to Cash
    category: "",
    note: "",
    date: new Date().toISOString().split('T')[0], // Default to today
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await addTransaction(formData);
      
      if (result.success) {
        setMessage({ text: "Transaction added successfully!", type: "success" });
        // Reset form (except date)
        setFormData({
          name: "",
          type: "Expense",
          amount: 0,
          transactionType: "Cash",
          category: "",
          note: "",
          date: formData.date,
        });
      } else {
        setMessage({ text: `Error: ${result.error}`, type: "error" });
      }
    } catch (error) {
      setMessage({ text: `Error: ${error instanceof Error ? error.message : String(error)}`, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
        <h2 className="text-xl font-semibold text-white">Add Transaction</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {message && (
          <div 
            className={`p-3 rounded-md ${
              message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount (₹)
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <select
              id="transactionType"
              name="transactionType"
              value={formData.transactionType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Food, Travel"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Note (Optional)
          </label>
          <textarea
            id="note"
            name="note"
            rows={2}
            value={formData.note}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add a note..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Processing..." : "Save Transaction"}
        </button>
      </form>
    </div>
  );
}