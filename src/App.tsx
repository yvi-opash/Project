import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './Pages/Admin_Home';
import Userlist from  './Pages/Userlist';
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import User_Home from "./Pages/User_Home";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin-home" element={<Home/>}/>
          <Route path="/user-home" element={<User_Home/>}/>
          <Route path="/users" element={<Userlist/>}/>
          <Route path='/' element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
