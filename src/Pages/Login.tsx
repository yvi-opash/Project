
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'
import { useState } from 'react'

type user = {
    name : string,
    email : string,
    password : string,
    isloggin : boolean,
    role : "user" | "admin"
}




const Login : React.FC = () => {
    
    const [formData, setformData] =useState<user>({
        name: "",
        email: "",
        password: "",
        isloggin : false,
        role :   "user"   
    })

    const [message, setmessage] = useState<string>('')  


    const navigate = useNavigate()

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();

        const regisereduser = localStorage.getItem("users");

        const user1 : user[] = regisereduser ? JSON.parse(regisereduser): [];

        const existuser = user1.find((user) => 
            user.email === formData.email && user.password === formData.password
        )

        

        if(existuser){
            existuser.isloggin = true;
            localStorage.setItem("users", JSON.stringify(user1));
            
            if(existuser.role === "admin"){
            navigate("/admin-home")
            }
            else{
                navigate("/user-home")
            }
        }
        else{
            setmessage("user not found, register first")
        }
    }   

return (
    <div className="login-container">
    <h1>Login Page</h1>
    <div>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email"  placeholder='Enter Email' value={formData.email} onChange={(e) => setformData({...formData, email: e.target.value})}/>
            <input type="password" name="password" id="" placeholder='Enter Password' value={formData.password}  onChange={(e) => setformData({...formData, password: e.target.value})}/>   
            <button type='submit'>Log In</button>
        </form>
        <p> {message} </p>
        <Link to="/signup">Register Here</Link>
    </div>
    </div>
  )
}

export default Login;