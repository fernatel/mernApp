import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createProduct } from '../features/products/productSlice'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ProductForm() {
  const [text, setText] = useState('')
  const [price, setPrice] = useState()
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createProduct({ text,price }))
    setText('')
    setPrice()
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
            <div className='form-group'>         
              <TextField  
              style={{margin:"5px"}} 
              type='text'
              name='text'
              id='text'
              value={text}
              onChange={(e) => setText(e.target.value.toUpperCase())}
              label="Producto"
              /> 
              <TextField  
              style={{margin:"5px"}} 
              type='number'
              name='price'
              id='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              label="Precio"
              />  
            </div>
            <div className='form-group'>
                <Button type="submit" style={{margin:"10px"}} variant="contained">Agregar</Button> 
            </div>
      </form>
    </section>
  )
}

export default ProductForm
