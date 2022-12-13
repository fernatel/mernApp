const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
   /* user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    }, desbloquear para datos privados para cada usuario */
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    price:{
      type: Number,
      required: [false, 'Please add a text value'],
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('products', productSchema)
