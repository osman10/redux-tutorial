import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getTransactions, createTransaction, editTransaction, deleteTransaction } from "./transactionAPI";

const initialState = {
transactions: [],
isLoading: false,
isError: false,
error: "",
editing: {}
};

// get transactions
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    try {
      const transactions = await getTransactions();
      return transactions;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// create transaction
export const createNewTransaction = createAsyncThunk(
  "transactions/createNewTransaction",
  async (transactionData) => {
    try {
      const newTransaction = await createTransaction(transactionData);
      return newTransaction;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// edit transaction
export const editExistingTransaction = createAsyncThunk(
  "transactions/editExistingTransaction",
  async ({ transactionId, updatedData }) => {
    try {
      const editedTransaction = await editTransaction(transactionId, updatedData);
      return editedTransaction;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// delete transaction
export const deleteExistingTransaction = createAsyncThunk(
  "transactions/deleteExistingTransaction",
  async (transactionId) => {
    try {
      await deleteTransaction(transactionId);
      return transactionId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//create slice
const transactionSlice = createSlice({
  name: "transactions",
  initialState,

  reducers: {
    // Define any synchronous reducers here
    editActive:(state, action) => {
      state.editing = action.payload;
    },
    editInactive:(state) => {
      state.editing = {};
    }
  },

  extraReducers: (builder) => {
    builder
      // get transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      // create transaction
      .addCase(createNewTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createNewTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.push(action.payload);
      })
      .addCase(createNewTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      // edit transaction
      .addCase(editExistingTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(editExistingTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.transactions.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(editExistingTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      // delete transaction
      .addCase(deleteExistingTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteExistingTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = state.transactions.filter((t) => t.id !== action.payload);
      })
      .addCase(deleteExistingTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  }
});

export const { editActive, editInactive } = transactionSlice.actions;
export default transactionSlice.reducer;
