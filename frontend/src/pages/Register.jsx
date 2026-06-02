import { Link , useNavigate } from "react-router-dom";
import { useState } from "react";
import BackendCall from "../services/BackendCall";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleRegister = async () => {
   console.log("register button clicked")
    if (name.trim() === "") {
    alert("Name is required");
    return;
  }

  if (!email.includes("@")) {
    alert("Invalid Email");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  try {
    console.log("sending request")
    const response = await BackendCall.post("/register", {
      name,
      email,
      password,
    });

    console.log("success" ,response.data);
    alert("Register Success");
    navigate("/")


  } catch (error) {
    console.log("FULL ERROR =>", error);
    console.log("ERROR RESPONSE =>", error.response);
    console.log("ERROR DATA =>", error.response?.data);
    console.log("ERROR MESSAGE =>", error.message);

    alert("Registration Failed");
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
          Register
        </Typography>

        <TextField
          label="Full Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
          onClick={handleRegister}
        >
          REGISTER
        </Button>

        <Typography>
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Register;