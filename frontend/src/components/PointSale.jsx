import React from 'react'
import { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getProducts, reset } from '../features/products/productSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import ItemCart from './ItemCart';
import {addToCart,removeAll} from '../features/shoppingCart/shoppingCartSlice';
import axios from 'axios';
import Payment from './Payment';
import Tables from './Tables';
import {TableRestaurant} from './Tables'

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,

}));

function PointSale() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [text, setText] = useState(null)
  const [price, setPrice] = useState(0)
  const [id, setId] = useState('')
  const [nameRuc, setNameruc]=useState('')
  const [searchRuc,setSearchRuc]=useState('')
  const [table,setTable]=useState('')

  const { products, isLoading, isError, message } = useSelector(
      (state) => state.products
    )
  
  const { user } = useSelector( //sin las {} va tomar como un objeto y dentro un arreglo  {[]} si especificamos con las llaves devolvera una arreglo
    (state) => state.auth)

  const dataCart = async () =>{
    products.map((product)=>{
      if(product.text===text)
            { 
              dispatch(addToCart(
                {id, text, price}
              ))
            }   
    }) 


    if(searchRuc.length===11){
    await axios({
      method: "get",
      url:  `api/ruc/`+searchRuc , 
    }).then((response) => {    
     setNameruc(response.data)          
    })}
/*
    const response = await axios.get('/api/ruc/' + '20138998780')
    return console.log(response.data)

*/
  }


  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getProducts())
   
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])
  if (isLoading) {
    return <Spinner />
  }

console.log(nameRuc)
  return (
    
      <Grid xs={12}  container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid xs={12} md={6} >
                    <Item>  
                      <h1>Datos</h1>
                      <TextField  id="combo-box-demo" sx={{width: 280,margin:1}} onChange={(e) => setSearchRuc(e.target.value)} label="RUC"  />
                      <TextField 
                      sx={{ width: 280, margin:1 }} 
                      value={nameRuc}
                      onChange={(e) => {
                        setNameruc(e.target.value)
                      }} 
                      
                      label="Nombre" />
                      <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={TableRestaurant}
                            getOptionLabel = {option => option.table} 
                            onChange={(e,v) => {
                              setTable(v.table)
                            }}   
                            autoSelect
                            renderInput={(params) => <TextField   sx={{ width: 280, margin:1 }} {...params} label="Mesa" />
                          }/>
                      <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={products}
                            onChange={(e,v) => {
                              setText(v.text)
                              setPrice(v.price)                    
                              setId(v._id)
                            }}
                            autoSelect
                            getOptionLabel = {option => option.text}    
                       
                            renderInput={(params) => <TextField
                              sx={{ width: 280, margin:1 }} 
                              
                              {...params} label="Producto" />
                          }/>
                        <Button sx={{width: 280, margin:1 }}  variant="contained" onClick={dataCart} color='success'startIcon={<AddShoppingCartIcon  />}>
                          Agregar a pedidos
                        </Button>   
                    </Item>
            </Grid>
            <Grid display={{ xs: 'none', sm: 'block' }} xs={12} md={6} rowSpacing={0}   >
                <Item  sx={{ maxHeight: 320,overflowY: "scroll" }}> 
                  <h1>Mesas</h1>      
              <Tables
              number={table}
              />
              </Item> 
            </Grid>            
            <Grid   sx={{ width: "100%", display: "table", tableLayout: "fixed" }} xs={12}>      
                <Item>
                  <h1>Pedidos</h1>    
                    <ItemCart/>                                               
                  <Stack display={{  xs: 'block', sm: 'flex' }} sx={{marginTop:1}}  direction={{xs: "column", md: "row"}} spacing={2} >
                    <Button sx={{width:200}}   onClick={()=>dispatch(removeAll())} variant="contained" color='error' startIcon={<DeleteIcon />}>
                      Borrar todo
                    </Button>
                    <Button   sx={{width:200}} variant="contained" color='secondary'startIcon={<OutdoorGrillIcon />}>
                      Enviar a cocina
                    </Button>
                    <Payment
                    name={nameRuc}
                    />      
                  </Stack>
                </Item>
            </Grid>          
             
      </Grid>
   
  )
}

export default PointSale