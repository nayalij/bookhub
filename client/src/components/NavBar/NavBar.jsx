import React, {useState} from "react";
import "./NavBar.css";

import logo from "../Assets/logo.png";
import cart from "../Assets/cart.png";
import { Link } from "react-router-dom";

const Navbar = () => {

    const[menu,setMenu] = useState("book");

  return (

    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt=" "></img>
        <p>Book&nbsp;Hub</p>
      </div>

      <div className="nav-menu">
        <li onClick={()=>{setMenu("All_books")}}><Link style={{textDecoration:'none'}}to = '/home'>Books</Link> {menu==="All_books"?<hr/>:<></>}  </li>
        <li onClick={()=>{setMenu("Books")}}><Link style={{textDecoration:'none'}}to ='/books'>Book Table</Link>{menu==="Books"?<hr/>:<></>}</li>
       
      </div>

      <div className="nav-login-cart">
        <button><Link className="login-link"to=  '/login'>Login</Link></button>
        <Link  to='/cart'><img src={cart} alt="" /></Link>
       
      </div>

    </div>
  )
}

export default Navbar;
