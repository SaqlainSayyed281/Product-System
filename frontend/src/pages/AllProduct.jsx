import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import BackendCall from "../services/BackendCall";

function AllProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    getAllProducts();
  }, [page]);

  const getAllProducts = async () => {
    try {
      const response = await BackendCall.get(
        `/all-product?page=${page}`,
        {
          withCredentials: true,
        }
      );

      setProducts(response.data.products || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const deleteProduct = async () => {
    try {
      await BackendCall.delete(
        `/delete-product/${selectedId}`,
        {
          withCredentials: true,
        }
      );

      getAllProducts();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight="bold"
        mb={4}
      >
        All Products
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Title</b>
              </TableCell>

              <TableCell>
                <b>Description</b>
              </TableCell>

              <TableCell>
                <b>Price</b>
              </TableCell>

              <TableCell>
                <b>Action</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.length > 0 ? (
              products.map((item) => (
                <TableRow key={item._id}>
                  <TableCell
                    sx={{
                      cursor: "pointer",
                      color: "blue",
                    }}
                    onClick={() =>
                      navigate(
                        `/admin-dashboard/single-product/${item._id}`
                      )
                    }
                  >
                    {item.title}
                  </TableCell>

                  <TableCell>
                    {item.description}
                  </TableCell>

                  <TableCell>
                    ₹{item.price}
                  </TableCell>

                  <TableCell>
                    <IconButton
                      onClick={(e) =>
                        handleMenuClick(
                          e,
                          item._id
                        )
                      }
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                >
                  No Products Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        display="flex"
        justifyContent="center"
        mt={3}
      >
        <Pagination
          page={page}
          count={totalPages}
          onChange={(e, value) =>
            setPage(value)
          }
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={deleteProduct}
        >
          Delete Product
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default AllProducts;