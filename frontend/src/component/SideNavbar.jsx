import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

function SideNavbar() {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          bgcolor: "#0F172A",
          color: "white",
          borderRight: "none",
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#38BDF8",
          }}
        >
          ProductHub
        </Typography>
      </Box>

      <List>
        <ListItemButton
          onClick={() => navigate("/dashboard/my-product")}
          sx={{
            mx: 2,
            mb: 1,
            borderRadius: 2,
            "&:hover": {
              bgcolor: "#1E293B",
            },
          }}
        >
          <ListItemText primary="📦 My Product" />
        </ListItemButton>

        <ListItemButton
          onClick={() => navigate("/dashboard/add-product")}
          sx={{
            mx: 2,
            mb: 1,
            borderRadius: 2,
            "&:hover": {
              bgcolor: "#1E293B",
            },
          }}
        >
          <ListItemText primary="➕ Add Product" />
        </ListItemButton>

        <ListItemButton
          onClick={() => navigate("/dashboard/profile")}
          sx={{
            mx: 2,
            borderRadius: 2,
            "&:hover": {
              bgcolor: "#1E293B",
            },
          }}
        >
          <ListItemText primary="👤 Profile" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default SideNavbar;