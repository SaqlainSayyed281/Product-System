import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider, 
  CircularProgress,
  Button
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import BackendCall from "../services/BackendCall";



function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await BackendCall.get(
        "/profile",
        {
          withCredentials: true,
        }
      );

      console.log("PROFILE RESPONSE =>", response);
console.log("PROFILE DATA =>", response.data);


      setUser(response.data.user);
      setLoading(false)
    } catch(error){
      setLoading(false)
  console.log("PROFILE ERROR =>", error);
  console.log("PROFILE RESPONSE =>", error.response);
  console.log("PROFILE DATA =>", error.response?.data);
}
  };

  const handleLogout = async () => {
  try {
    await BackendCall.post(
      "/logout",
      {},
      {
        withCredentials: true,
      }
    );

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};


  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5,
      }}
    >
      <Card
        sx={{
          width: 550,
          borderRadius: 4,
          boxShadow: 5,
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Avatar
              sx={{
                width: 90,
                height: 90,
                mb: 2,
              }}
            >
              <PersonIcon fontSize="large" />
            </Avatar>

            <Typography
              variant="h5"
              fontWeight="bold"
            >
              {user.name || "User"}
            </Typography>

            <Typography color="text.secondary">
              {user.role || "-"}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            Full Name
          </Typography>

          <Typography variant="h6" mb={2}>
            {user.name || "-"}
          </Typography>

          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            Email Address
          </Typography>

          <Typography variant="h6" mb={2}>
            {user.email || "-"}
          </Typography>

          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            Role
          </Typography>

          <Typography variant="h6">
            {user.role || "-"}
          </Typography>

        <Button
  fullWidth
  variant="contained"
  color="error"
  sx={{ mt: 3 }}
  onClick={handleLogout}
>
  Logout
</Button>

        </CardContent>
      </Card>
    </Box>
  );
}

export default Profile;