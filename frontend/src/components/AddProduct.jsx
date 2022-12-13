import React from 'react'
import { useEffect } from 'react'
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function AddProduct() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { user } = useSelector((state) => state.auth)
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  )
console.log(products)
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
  
 
 let orderText = products.map((e)=> e) //ORDEN ALFABETICO DEL NOMBRE
              .sort((o1,o2)=>{
              if(o1.text<o2.text){
                return -1;
              }else if(o1.text>o2.text){
                return 1;
              } else {
                return 0;
              }
            });


  return (
  
    <Box  >
      <Grid container 
            justifyContent="center"
            spacing={2}
            sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
            >
        <Grid 
        xs={12}
       
        xl={8}
        >
          
          
            <Item >
                <ProductForm />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="simple table">
                                <TableHead>
                                  <TableRow>
                                      <TableCell style={{ color: '#ffffff', background:'#000000'}}>Plato</TableCell>
                                      <TableCell style={{ color: '#ffffff', background:'#000000'}}align="right">Precio</TableCell>
                                      <TableCell style={{ color: '#ffffff', background:'#000000'}} align="right">Eliminar</TableCell>      
                                  </TableRow>
                                </TableHead>   

                                {products.length > 0 ? (
                                  <TableBody>
                                    {orderText.map((product) => (
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
                                  <h3>Sin productos</h3>
                                )}             
                    </Table>
                </TableContainer>
            </Item>
         
        </Grid>

     
        
      </Grid>

                              
    
    </Box>

  )
}

export default AddProduct