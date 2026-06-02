import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

function SideNavbar2() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 250,
        minHeight: "100vh",
        bgcolor: "#0F172A",
        color: "white",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          p: 3,
          color: "#38BDF8",
        }}
      >
        Admin
      </Typography>

      <List>
        <ListItemButton
          onClick={() => navigate("/admin-dashboard/profile")}
          sx={{
            mx: 2,
            mb: 1,
            borderRadius: 2,
            "&:hover": {
              bgcolor: "#1E293B",
            },
          }}
        >
          <ListItemText primary="👤 My Profile" />
        </ListItemButton>

        <ListItemButton
          onClick={() =>
            navigate("/admin-dashboard/all-products")
          }
          sx={{
            mx: 2,
            mb: 1,
            borderRadius: 2,
            "&:hover": {
              bgcolor: "#1E293B",
            },
          }}
        >
          <ListItemText primary="📦 Get All Products" />
        </ListItemButton>
      </List>
    </Box>
  );
}

export default SideNavbar2;