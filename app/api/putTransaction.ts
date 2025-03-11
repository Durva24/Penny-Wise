// api/transactionApi.ts

// Function to add a transaction to Google Sheets via Apps Script
export async function addTransaction(transactionData: {
  name: string;
  type: string;
  amount: number;
  transactionType: string;
  category: string;
  note: string;
  date: string;
}) {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbyJ6KzWs1QdL86o0gflTFKHZvGqpeYNh9cfjbRyV9A6vf2AL-Cx8lOFrFONursaOPHSiQ/exec?action=addTransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error adding transaction:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

// Function to fetch all transactions
export async function getTransactions() {
  try {
    const response = await fetch("YOUR_WEB_APP_URL?action=getTransactions", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}