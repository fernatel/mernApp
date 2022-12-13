import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Inventory from './components/Inventory'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import AddProduct from './components/AddProduct'

import { useSelector} from 'react-redux'
import PointSale from './components/PointSale'
function App() {
  const user = useSelector(
    (state) => state.auth.user
  )

  return (
    <>
       <Router>
            <div className='container'>
              {user===null? <>       
                <Routes>  
                  <Route path='*' element={<Navigate replace to='/login' />} />
                  <Route path='/login' element={<Login/>} />
                  <Route path='/register' element={<Register />} />
                </Routes>
                </>
                : <>
                  <Routes>
                    <Route path='/login' element={<Navigate replace to='/sale' />} />  
                    <Route path='/' element={<Navigate replace to='/sale' />} />                   
                  </Routes>
                <Dashboard > {/* componente padre */}
                  <Routes>
                   
                    <Route path='/addproduct' element={<AddProduct/>} />
                    <Route path='/sale' element={<PointSale/>} />
                    <Route path='/inventory' element={<Inventory/>} />
                  </Routes>
                </Dashboard> 
                </> }  
            </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
