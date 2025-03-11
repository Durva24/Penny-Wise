// services/transactionApi.ts
interface TransactionData {
  name: string;
  type: string; // "Income" or "Expense"
  amount: number;
  transactionType: string; // "Cash", "Card", etc.
  category: string;
  note: string;
  date: string;
}

/**
 * Adds a new transaction to the spreadsheet using the Google Apps Script
 * @param data Transaction data to be added
 * @returns Promise with the response from the server
 */
export const addTransaction = async (data: TransactionData): Promise<any> => {
  try {
    // Base URL for the Google Apps Script
    const baseUrl = "https://script.google.com/macros/s/AKfycbyNGVUZ0QojssudgYD2JtDLvaqYNnJ1buqzQ07RRL_AzVtYfh9_z2lpogwdlXwk6UD68w/exec";
    
    // Create URL with query parameters
    const url = new URL(baseUrl);
    
    // Add all parameters to the URL
    url.searchParams.append("name", data.name);
    url.searchParams.append("type", data.type);
    url.searchParams.append("amount", data.amount.toString());
    url.searchParams.append("transactionType", data.transactionType);
    url.searchParams.append("category", data.category);
    url.searchParams.append("note", data.note);
    url.searchParams.append("date", data.date);
    
    // Make GET request to the URL with parameters
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Check content type to determine how to process the response
    const contentType = response.headers.get("content-type");
    
    if (contentType && contentType.includes("application/json")) {
      // If response is JSON, parse it
      return await response.json();
    } else {
      // If not JSON (likely plain text), return as text but in a structured format
      const textResponse = await response.text();
      return { 
        success: true, 
        message: textResponse,
        data: data
      };
    }
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
};

// Export types for use in other components
export type { TransactionData };