import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ProductForm from '../components/ProductForm'
import Spinner from '../components/Spinner'
import { getProducts, reset } from '../features/products/productSlice'
import { deleteProduct } from '../features/products/productSlice'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function Inventory() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [text, setText] = useState(null)
  const { user } = useSelector((state) => state.auth)
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  )

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



let searchProduct = [text]


console.log(products)
  return (
    <div>
     <Box sx={{ flexGrow: 1 }}>
      <Grid container 
            justifyContent="center"
            spacing={2}>
        <Grid 
        xs={12}
       
        xl={8}
        >
            <Item >
             
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={products}
            
            onChange={(e,v) => setText(v)}
            sx={{ width: 300 }}
            getOptionLabel = {option => option.text}            
            renderInput={(params) => <TextField {...params} 
            style={{marginBottom:"5px"}} 
            type='text'
            name='text'
            id='text'
            label="Buscar Producto"
            />}
            />
            
            
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="simple table">
                                <TableHead>
                                  <TableRow>
                                      <TableCell style={{ color: '#ffffff', background:'#000000'}}>Plato</TableCell>
                                      <TableCell style={{ color: '#ffffff', background:'#000000'}}align="right">Precio</TableCell>
                                      <TableCell style={{ color: '#ffffff', background:'#000000'}} align="right">Eliminar</TableCell>
                                  </TableRow>
                                </TableHead>   
                                {text===null ? (
                                  <TableBody>
                                  {products.map((product) => (
                                   
                                    <TableRow
                                    
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{product.text}</TableCell>
                                        <TableCell align="right">{product.price}</TableCell>
                                        <TableCell align="right"><Button variant="text" color='warning' onClick={() => dispatch(deleteProduct(product._id))}>X</Button> </TableCell>   
                                    </TableRow> 
                                  ))}
                              </TableBody>
                                ) : (
                                  <TableBody>
                                    {searchProduct.map((product) => (
                                     
                                      <TableRow
                                      
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                      >
                                          <TableCell component="th" scope="row">{product.text}</TableCell>
                                          <TableCell align="right">{product.price}</TableCell>
                                          <TableCell align="right"><Button variant="text" color='warning' onClick={() => dispatch(deleteProduct(product._id))}>X</Button> </TableCell>   
                                      </TableRow> 
                                    ))}
                                </TableBody>
                                  
                                )} 
                                          
                    </Table>
                </TableContainer>
            </Item>
         
        </Grid>

     
        
      </Grid>

                              
    
    </Box>
    </div>
  )
}

export default Inventory