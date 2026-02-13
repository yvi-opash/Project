import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

type user = {
  name: string;
  email: string;
  age: number;
  city: string;
  country: string;
  password: string;
  isloggin: boolean;
  role: "user" | "admin";
};

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setformData] = useState<user>({
    name: "",
    email: "",
    password: "",
    isloggin: false,
    role: "" as any,
    age: "" as any,
    city: "",
    country: "",
  });

  const [message, setMessage] = useState<string>("");

  const [User, setUser] = useState<user[]>([]);

  useEffect(() => {
    const existuser = localStorage.getItem("users");
    if (existuser) {
      setUser(JSON.parse(existuser));
    }
  }, []);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.age ||
      !formData.city ||
      !formData.country ||
      !formData.role
    ) {
      setMessage("Please fill all fields");
      return;
    }

    const existemail = User.find((user) => user.email === formData.email);

    if (existemail) {
      setMessage("Email already registered!");
      return;
    }

    if (formData.password.length < 2) {
      setMessage("Password must be at least 2 characters.");
      return;
    }

    const newUser = [...User, formData];
    localStorage.setItem("users", JSON.stringify(newUser));
    setMessage("Registration successful!");

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="login-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={(e) => setformData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={(e) => setformData({ ...formData, email: e.target.value })}
        />
        <input
          type="number"
          name="age"
          placeholder="Enter age"
          value={formData.age || ""}
          onChange={(e) =>
            setformData({ ...formData, age: parseInt(e.target.value) || 0 })
          }
        />
        <input
          type="text"
          name="city"
          placeholder="Enter city"
          value={formData.city}
          onChange={(e) => setformData({ ...formData, city: e.target.value })}
        />
        <input
          type="text"
          name="country"
          placeholder="Enter country"
          value={formData.country}
          onChange={(e) =>
            setformData({ ...formData, country: e.target.value })
          }
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={(e) =>
            setformData({ ...formData, password: e.target.value })
          }
        />
        <select
          name="role"
          value={formData.role}
          onChange={(e) =>
            setformData({
              ...formData,
              role: e.target.value as "user" | "admin",
            })
          }
          required
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
      <Link to="/">Login Here</Link>
    </div>
  );
};

export default Signup;
