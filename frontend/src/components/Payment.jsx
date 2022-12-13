import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ReceiptIcon from '@mui/icons-material/Receipt';

import { useSelector, useDispatch } from 'react-redux'

function Payment(props) {

  let total=0
  const {cart} = useSelector(
    (state) => state.cart)


  const {payment} = useSelector(
    (state) => state.payment
  )
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
          console.log(payment)
    };



  return (
    <div>
     
    <Button sx={{width:200}}  variant="contained" color='success'startIcon={<ReceiptIcon />}    onClick={handleClickOpen}>
      Imprimir pago
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Imprimir</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <span>Nombre: </span> <span>{props.name}</span><br></br>
          <h5>{cart.map((item)=>{
                      total=total+(item.price*item.quantity) 
                       return (
                          
                          <div>
                                <span>{item.text}.........</span>
                                <span>{item.price}</span>
                                <span> x{item.quantity}</span> 
                                           
                                </div>       
                        )
                      
          }
                    
         )
                      
                      
                      }
                      
                      </h5><br></br>
          <span>Total a pagar: {total}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleClose}

        >Confirmar</Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}

export default Payment