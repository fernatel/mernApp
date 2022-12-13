import React from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { Navigate, NavLink } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryIcon from '@mui/icons-material/Inventory';
import Divider from '@mui/material/Divider';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
const drawerWidth = 240;

function Dashboard(props) {
  const [title, setTitle] = useState('Punto de venta');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  
  const menuItems = [
   
    { 
      text: 'Punto de venta', 
      icon: <PointOfSaleIcon />, 
      onclick:()=>{
        navigate('/sale')
        setTitle('Punto de venta')
      }
    },
    { 
      text: 'Inventario', 
      icon: <InventoryIcon/>, 
      onclick:()=>{
        navigate('/inventory')
        setTitle('Inventario')
      }
    },
    { 
      text: 'Agregar producto', 
      icon: <AddBusinessIcon/>, 
      onclick:()=>{
        navigate('/addproduct')
        setTitle('Agregar producto')
      }
    },
    { 
      text: 'Salir', 
      icon: <LogoutIcon/>, 
      onclick:onLogout 
    
    }
  ];


  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar component={()=><center><img width="200"  src={require('../images/logo.png')}/></center>}  />
          
      <Divider />
      <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text}
              onClick={item.onclick}  
                      
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
      </List>

      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
               
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        style={{ background: '#c81114' }}//******************************** */
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar >
        
          <IconButton
            color="#ffb429"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
            <Typography variant="h6" noWrap component="div">
              {title}
            </Typography>
    
          
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography paragraph>
          {props.children}
        </Typography>
        
      </Box>

     

    </Box>

   
    </>
  )
}
Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
export default Dashboard
