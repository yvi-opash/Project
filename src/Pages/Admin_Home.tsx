import Footer from "../components/Footer";
import Header from "../components/Header";
import { Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "./Admin_Home.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

interface User {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  age: number;
  city?: string;
  country?: string;
  isloggin: boolean;
}

const Admin_Home = () => {
  const [userName, setUserName] = useState("Admin");
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [pieData, setPieData] = useState({
    labels: ["Users", "Admins"],
    datasets: [
      {
        data: [0, 1],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  });
  const [chartData, setChartData] = useState({
    labels: ["18-25", "26-35", "36-45", "46-55", "56+"],
    datasets: [
      {
        label: "Users by Age Group",
        data: [5, 8, 3, 2, 1],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 230, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
      },
    ],
  });

  useEffect(() => {
    const users = localStorage.getItem("users");
    if (users) {
      const userData = JSON.parse(users);
      const loggedInUser = userData.find((user: User) => user.isloggin === true);
      if (loggedInUser) {
        setUserName(loggedInUser.name);
      }
      
      const regularUsers = userData.filter(
        (user: User) => user.role !== "admin",
      );
      const admins = userData.filter((user: User) => user.role === "admin");

      setUserCount(regularUsers.length);
      setAdminCount(admins.length);

      setPieData({
        labels: ["Users", "Admins"],
        datasets: [
          {
            data: [regularUsers.length, admins.length],
            backgroundColor: ["#36A2EB", "#FF6384"],
          },
        ],
      });

      const ageGroups = {
        "18-25": 0,
        "26-35": 0,
        "36-45": 0,
        "46-55": 0,
        "56+": 0,
      };

      userData.forEach((user: User) => {
        const age = user.age;
        if (age >= 18 && age <= 25) ageGroups["18-25"]++;
        else if (age >= 26 && age <= 35) ageGroups["26-35"]++;
        else if (age >= 36 && age <= 45) ageGroups["36-45"]++;
        else if (age >= 46 && age <= 55) ageGroups["46-55"]++;
        else if (age >= 56) ageGroups["56+"]++;
      });

      setChartData({
        labels: Object.keys(ageGroups),
        datasets: [
          {
            label: "Users by Age Group",
            data: Object.values(ageGroups),
            backgroundColor: [
              "rgba(255, 99, 132, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 205, 86, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(153, 102, 255, 0.8)",
            ],
          },
        ],
      });
    }
  }, []);

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <Typography variant="h3" gutterBottom>
          Welcome <span style={{ color: "#FF6384" }}>{userName}</span> to the Admin Dashboard  
        </Typography>

        <div className="cards-container">
          <div className="card-item">
            <Card>
              <CardContent>
                <Typography variant="h5" color="primary">
                  Total Users
                </Typography>
                <Typography variant="h2">{userCount}</Typography>
              </CardContent>
            </Card>
          </div>



          <div className="card-item">
            <Card>
              <CardContent>
                <Typography variant="h5" color="secondary">
                  Admin
                </Typography>
                <Typography variant="h2">{adminCount}</Typography>
              </CardContent>
            </Card>
          </div>
 
 
 
           <div className="card-item">
            <Card>
              <CardContent>
                <Typography variant="h5" color="success.main">
                  System Status
                </Typography>
                <Typography variant="h6" color="success.main">
                  Online
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>

        <div
          className="chart-container"
          style={{ marginTop: "2rem", padding: "1rem" }}
        >
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Users by Age Group
              </Typography>
              <div style={{ height: "400px" }}>
                <Bar
                  data={chartData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div
          className="chart-container"
          style={{ marginTop: "2rem", padding: "1rem" }}
        >
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                User vs Admin Distribution
              </Typography>
              <div style={{ height: "400px" }}>
                <Pie
                  data={pieData}
                  options={{ responsive: true, maintainAspectRatio: true }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin_Home;
