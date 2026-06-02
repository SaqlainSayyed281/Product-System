import { Box, Typography } from "@mui/material";
import SideNavbar from "../component/SideNavbar";
import { Outlet } from "react-router-dom";


function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideNavbar />

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "#F8FAFC",
          minHeight: "100vh",
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
        >
          User Dashboard
        </Typography>

        <Outlet />
      </Box>
    </Box>
  );
}

export default Dashboard;