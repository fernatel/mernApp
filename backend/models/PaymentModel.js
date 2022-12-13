const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema(
    {  user: {
        type: mongoose.Schema.Types.ObjectId,
        
        required: true,
        ref: 'User',
      },
      name:{
        type: String
      },
      products:[ {
          product:{type: String},
          price:{type: Number},
          quantity:{type: Number},
        
      }],
      total:{
        type:Number
      }
      
    },
    {
      timestamps: true,
    }
  )
  

module.exports = mongoose.model('Payment', paymentSchema )