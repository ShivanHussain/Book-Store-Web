
import { useEffect } from 'react'
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { Routes , Route } from "react-router-dom";
import Allbooks from './Pages/Allbooks';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Cart from './Pages/Cart';
import Bookdetails from './Components/Bookdetails';
import { useDispatch, useSelector } from 'react-redux';
import { authenticationActions } from './Store/Authentication';
import Favourites from './Components/Profile/Favourites';
import Orderhistory from './Components/Profile/Orderhistory';
import Settings from './Components/Profile/Settings';
import Allorder from './Pages/Allorder';
import Addbook from './Components/Profile/Addbook';
import Updatebook from './Pages/Updatebook';
import Cartdetails from './Pages/Cartdetails';
import Aboutus from './Pages/Aboutus';
import Contact from './Pages/Contact';

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state)=> state.auth.role);
  useEffect(()=>{
  if(
      localStorage.getItem("id")  &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ){
      dispatch(authenticationActions.login());
      dispatch(authenticationActions.changeRole(localStorage.getItem("role")));
    }
  },[dispatch])
  //console.log(role);
  return (
    <>
    <div>
        <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home/>} />
           
            <Route path="/bookdetails/:id" element={<Bookdetails/>}/>
            <Route path="/profile" element={<Profile/>}>
                { role === "user"
                  ? <Route index element={<Favourites/>}/> 
                  : <Route index element={<Allorder/>}/>
                }
                { role === "admin" && ("")
                }
                <Route path="/profile/addBook" element={<Addbook/>}/>
                <Route path="/profile/orderHistory" element={<Orderhistory/>}/>
                <Route path="/profile/settings" element={<Settings/>}/>
            </Route>
            <Route path="/allbooks" element={<Allbooks/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/Cartdetails" element={<Cartdetails/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/updatebook/:id" element={<Updatebook/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/aboutus" element={<Aboutus/>}/>
            <Route path="/contact" element={<Contact/>}/>
          
          </Routes>
        <Footer/>
      </div>
    </>
  );
}

export default App;