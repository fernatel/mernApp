const express = require('express')
const router = express.Router()
const {setPayment, getPayment}= require('../controllers/PaymentController')
const { protect } = require('../middleware/authMiddleware')

router.get('/',protect,getPayment )
router.post('/',protect,  setPayment)


module.exports = router
