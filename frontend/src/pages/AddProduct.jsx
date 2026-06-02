import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import BackendCall from "../services/BackendCall";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleAddProduct = async () => {
    if (!title || !description || !price) {
      alert("All fields are required");
      return;
    }

    try {
      console.log("PRICE BEFORE SEND =", price);

      const response = await BackendCall.post(
        "/create-product",
        {
          title,
          description,
          price,
        },
        {
          withCredentials: true,
        }
      );

      alert("Product Added Successfully");

      console.log(response.data);

      setTitle("");
      setDescription("");
      setPrice("");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed To Add Product"
      );
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: 500,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
        >
          Add Product
        </Typography>

        <TextField
          label="Product Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <TextField
          label="Price"
  
          fullWidth
          margin="normal"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </Paper>
    </Box>
  );
}

export default AddProduct;