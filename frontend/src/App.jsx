import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import MyProduct from "./pages/MyProduct";
import Profile from "./pages/Profile";
import AllProducts from "./pages/AllProduct";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="my-product" element={<MyProduct />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="profile"element={<Profile />}/>
        </Route>


       <Route path="admin-dashboard" element={<AdminDashboard />}>
  <Route path="profile" element={<Profile />} />
  <Route path="all-products" element={<AllProducts />}/>
</Route>
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;