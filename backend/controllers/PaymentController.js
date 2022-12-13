const asyncHandler = require('express-async-handler')
const Payment = require('../models/PaymentModel')
const User = require('../models/userModel')


const getPayment = asyncHandler(async (req, res) => {
  const payments = await Payment.find({ user: req.user.id })
  res.status(200).json(payments)
})
  
const  setPayment= asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const payments = await Payment.create({
    text: req.body.text,
    price:req.body.price,
    user: req.user.id,
  })

  res.status(200).json(payments)
})  
  module.exports = {
    getPayment ,
    setPayment  
  }
  