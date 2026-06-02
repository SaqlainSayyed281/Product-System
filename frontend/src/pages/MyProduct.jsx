import { useEffect, useState } from "react";
import BackendCall from "../services/BackendCall";

import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

function MyProduct() {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const [page , setPage] = useState(1)
  const [totalPages,setTotalPages] = useState(1)

  useEffect(() => {
    getProducts();
  }, [page]);

  const getProducts = async () => {
    try {
      const response = await BackendCall.get(
        `/view-allproduct?page=${page}`,
        {
          withCredentials: true,
        }
      );

      setProducts(response.data.products || []);
      setTotalPages(response.data.totalPages||1)
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewProduct = async (id) => {
    try {
      const response = await BackendCall.get(
        `/view-Singleproduct/${id}`,
        {
          withCredentials: true,
        }
      );

      setSingleProduct(response.data.product);
      setViewOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await BackendCall.put(
        `/updateOwn-product/${singleProduct._id}`,
        {
          title: singleProduct.title,
          description: singleProduct.description,
          price: singleProduct.price,
        },
        {
          withCredentials: true,
        }
      );

      alert("Product Updated");

      setEditOpen(false);

      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        My Products
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

                <TableRow
                  key={item._id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    handleViewProduct(item._id)
                  }
                >

                  <TableCell>
                    {item.title}
                  </TableCell>

                  <TableCell>
                    {item.description}
                  </TableCell>

                  <TableCell>
                    ₹ {item.price}
                  </TableCell>

                  <TableCell>

                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();

                        setSingleProduct(item);

                        setAnchorEl(
                          e.currentTarget
                        );
                      }}
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
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Pagination
  count={totalPages}
  page={page}
  onChange={(e, value) =>
    setPage(value)
  }
  color="primary"
/>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setEditOpen(true);
          }}
        >
          Edit Product
        </MenuItem>

      <MenuItem
  onClick={async () => {
    await BackendCall.put(
      `/updateOwn-product/${singleProduct._id}`,
      {
        isDeleted: true,
      },
      {
        withCredentials: true,
      }
    );

    setAnchorEl(null);
    getProducts();
  }}
>
  Delete Product
</MenuItem>

      </Menu>

      <Dialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
      >
        <DialogTitle>
          Product Details
        </DialogTitle>

        <DialogContent>

          <Typography variant="h6">
            {singleProduct?.title}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            {singleProduct?.description}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            ₹ {singleProduct?.price}
          </Typography>

        </DialogContent>
      </Dialog>

      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
      >
        <DialogTitle>
          Edit Product
        </DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            margin="normal"
            label="Title"
            value={singleProduct?.title || ""}
            onChange={(e) =>
              setSingleProduct({
                ...singleProduct,
                title: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={
              singleProduct?.description || ""
            }
            onChange={(e) =>
              setSingleProduct({
                ...singleProduct,
                description: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Price"
            value={singleProduct?.price || ""}
            onChange={(e) =>
              setSingleProduct({
                ...singleProduct,
                price: e.target.value,
              })
            }
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleUpdateProduct}
          >
            Update Product
          </Button>

        </DialogContent>
      </Dialog>

    </Box>
  );
}

export default MyProduct; 