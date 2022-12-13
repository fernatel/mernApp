import React from 'react'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';

export const TableRestaurant=[{
    table:'1',
    
    },{
    table:'2',
      
    },{
    table:'3',
     
    },{
    table:'4',
   
    },{
    table:'5',
      
    },{
    table:'6',
      
    },{
    table:'7',
      
    },{
    table:'8',
      
    } ,{
    table:'9',
      
    },{
    table:'10',
     
    },{
    table:'11',
    
    },{
    table:'12',
    
    },{
    table:'13',
      
    },{
    table:'14',
 
    },{
    table:'Otros',
      
    }       

]

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  
  }));

function Tables(props) {

  return ( 
    <Grid xs={12} container spacing={1}>
        {TableRestaurant.map(table=>(
            <Grid  xs={6} md={4} lg={4}  >
              {props.number===table.table? <Item ><TableRestaurantIcon  color='error' fontSize='large'/><h4>{table.table}</h4>
                
                </Item>:<Item ><TableRestaurantIcon  color='success' fontSize='large'/><h4>{table.table}</h4>
                
                </Item>}

               
            </Grid>   
        ))}
    </Grid>    
   
  )
}

export default Tables