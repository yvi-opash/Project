import { Link , useNavigate} from 'react-router-dom'
import './Header.css'

type user = {
    name: string,
    email: string,
    password: string,
    isloggin : boolean,
}

const Header = () => {
    const navigate = useNavigate()

    function handleLogout () {
        const loginuser = localStorage.getItem('users') 
        
        const user1 : user[] = loginuser ? JSON.parse(loginuser) : [];
        
        const loggedInUser = user1.find(user => user.isloggin === true);
        if(loggedInUser) {
            loggedInUser.isloggin = false;
            localStorage.setItem('users', JSON.stringify(user1));
        }
        
        navigate('/')
    }

    return (
        <div className="header">
            <h1>Admin Panel</h1>
            <nav className="nav-links">
                <Link to="/admin-home">Home</Link>
                <Link to="/users">Users</Link>
               
            </nav>
            <button onClick={handleLogout} >Logout</button>
        </div>
    )
}

export default Header
