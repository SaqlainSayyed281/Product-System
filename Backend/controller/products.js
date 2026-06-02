const Product = require("../Model/productschema");

exports.CreateProducts = async (req, res) => {
  try {

    console.log("BODY =>", req.body);
    console.log(req.headers["content-type"]);
console.log(req.body);
    const { title, description, price } = req.body;

    const userId = req.user.userId;

    if (!title || !description || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const create = await Product.create({
      title,
      description,
      price,
      user: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      _id: create._id,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.ViewAllProduct = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1,
      limit = Number(req.query.limit) || 3,
      skip = (page - 1) * limit;

    const products = await Product.find({
      user: req.user.userId,
      isDeleted: false,
    })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalProducts = await Product.countDocuments({
      user: req.user.userId,
      isDeleted: false,
    });

    return res.status(200).json({
      success: true,
      page,
      limit,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.ViewSingleProducts = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findOne({
      _id: productId,
      user: req.user.userId,
      isDeleted: false,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.UpdateOwnProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    const update = { ...req.body };

    const updateData = {};
    const message = [];

    if (update.title) {
      updateData.title = update.title;
      message.push("title updated successfully");
    }

    if (update.description) {
      updateData.description = update.description;
      message.push("description updated successfully");
    }

    if (update.price !== undefined) {
      updateData.price = Number(update.price);
      message.push("price updated successfully");
    }

    if (update.isDeleted === true) {
      updateData.isDeleted = true;
      message.push("product deleted successfully");
    }

    if (update.isDeleted === false) {
        updateData.isDeleted = false 
        message.push("product recovered")
    }

    const product = await Product.findOneAndUpdate(
      {
        _id: productId,
        user: req.user.userId,
      },
      updateData,
      {
        new: true,
      },
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message,
      product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

//------------------------Admin-Side---------------------------------------------

exports.GetAllProduct = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1,
      limit = Number(req.query.limit) || 3,
      skip = (page - 1) * limit;

    const products = await Product.find({
      isDeleted: false,
    })
      .populate("user", "name email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalProducts = await Product.countDocuments({
      isDeleted: false,
    });

    return res.status(200).json({
      success: true,
      page,
      limit,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.GetSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findOne({
      _id: productId,
      isDeleted: false,
    }).populate("user", "name email");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.DeleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findOneAndUpdate(
      {
        _id: productId,
        isDeleted: false,
      },
      {
        isDeleted: true,
      },
      {
        new: true,
      },
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
