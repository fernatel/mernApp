import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { incrementQuantity, decrementQuantity, removeItem} from '../features/shoppingCart/shoppingCartSlice'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

function ItemCart() {

    const dispatch = useDispatch()
    const {cart} = useSelector(
        (state) => state.cart)

  return (
    <div>        
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                  <TableCell>Producto</TableCell>        
                  <TableCell align="right">Precio&nbsp;(S/.)</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Aumentar</TableCell>
                  <TableCell align="right">Disminuir</TableCell>
                  <TableCell align="right">Eliminar producto</TableCell>
              </TableRow>
            </TableHead>
                <TableBody>                
                      {cart.map((item)=>(
                          <TableRow                                      
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component="th" scope="row">{item.text}</TableCell>
                                <TableCell align="right">{item.price}</TableCell>
                                <TableCell align="right">{item.quantity}</TableCell>
                                <TableCell align="right"><Button  variant="contained" onClick={() => dispatch(incrementQuantity(item.id))} color='info'>+</Button></TableCell>
                                <TableCell align="right"><Button  variant="contained" onClick={() => dispatch(decrementQuantity(item.id))} color='warning'>-</Button></TableCell>
                                <TableCell align="right"><Button  variant="contained" onClick={() => dispatch(removeItem(item.id))} color='error'>X</Button></TableCell>
                            </TableRow>
                      ))}
                </TableBody>                        
        </Table>
    </TableContainer>
    </div>
  )
}

export default ItemCart