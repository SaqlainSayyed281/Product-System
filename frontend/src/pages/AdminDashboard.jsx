import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideNavbar2 from "../component/SideNavbar2"

function AdminDashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideNavbar2 />

      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          minHeight: "100vh",
          bgcolor: "#F8FAFC",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminDashboard;