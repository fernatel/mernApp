import axios from 'axios'

const API_URL = '/api/payment/'

// Create new product
const createPayment = async (paymentData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.post(API_URL, paymentData, config)
  
    return response.data
  }
  
  // Get user products
  const getPayments = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
  }
  

  const paymentService = {
    createPayment,
    getPayments
  }
  
  export default paymentService