import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import paymentService from './paymentService'

const initialState = {
    payment: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }

export const createPayment = createAsyncThunk(
    'payments/create',
    async (paymentData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await paymentService.createPayment(paymentData, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

export const getPayment = createAsyncThunk(
    'payments/getAll',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await paymentService.getPayments(token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )


  export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(createPayment.pending, (state) => {
          state.isLoading = true
        })
        .addCase(createPayment.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.payment.push(action.payload)
        })
        .addCase(createPayment.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(getPayment.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getPayment.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.payment = action.payload
        })
        .addCase(getPayment.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        
    },
  })


  
export const { reset } = paymentSlice.actions
export default paymentSlice.reducer
