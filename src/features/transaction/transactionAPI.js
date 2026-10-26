import axios from "../../utils/axios";

// get transactions
export const getTransactions = async () => {
  try {
    const response = await axios.get("/transactions");
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};
// create transaction
export const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post("/transactions", transactionData);
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};
// edit transaction
export const editTransaction = async (transactionId, updatedData) => {
  try {
    const response = await axios.put(`/transactions/${transactionId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error editing transaction:", error);
    throw error;
  }
};
// delete transaction
export const deleteTransaction = async (transactionId) => {
  try {
    const response = await axios.delete(`/transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};
