import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import BackendCall from "../services/BackendCall";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid Email");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 10 characters");
      return;
    }

    try {
      console.log("LOGIN REQUEST =>", { email, password });

      const response = await BackendCall.post("/login", {
        email,
        password,
      },
      {
        withCredentials : true
      }
    
    );

      console.log("LOGIN RESPONSE =>", response);
  console.log("LOGIN DATA =>", response.data);

      alert("Login Success");

      if (response.data.role === "admin") {
        navigate("/admin-dashboard")
      } else{
        navigate("/dashboard")
      }

    } catch (error) {
  console.log("FULL ERROR =>", error);
  console.log("ERROR RESPONSE =>", error.response);
  console.log("ERROR DATA =>", error.response?.data);
  console.log("ERROR MESSAGE =>", error.message);

  alert("Invalid Email or Password");
}
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          p: 4,
          width: 400,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login Form
        </Typography>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Typography
          sx={{
            mt: 1,
            mb: 2,
            cursor: "pointer",
          }}
        >
          Forgot Password?
        </Typography>

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{ mb: 2 }}
        >
          LOGIN
        </Button>

        <Typography>
          Not a member?{" "}
          <Link to="/register">
            Signup now
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Login;