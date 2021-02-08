const Product = require("../models/product");
const path = require("path");
const fs = require("fs");


exports.getHomeProducts = async (req, res, next) => {
  const products = await Product.find({ homeProd: true });
  if (!products) {
    const error = new Error("something went wrong");
    error.code = 500;
    return next(error);
  }
  res.status(200).send(products);
};

exports.getAdminProducts = async (req,res,next)=>{
  const products = await Product.find();
  res.status(200).send(products)
}

exports.getAllProducts = async(req,res,next)=>{
  const products = await Product.find();
  res.status(200).send(products)
}


exports.editProduct = async (req, res, next) => {
  const {
    title,
    price,
    description,
    ingredients,
    categories,
    homeProd,
    name
  } = req.body;
  const prodId = req.body._id;
  let error;
  if (!prodId) {
    const error = new Error("no id was provided");
    error.code = 404;
    return next(error);
  }

  const product = await Product.findById(prodId);
  if (!product) {
    const error = new Error("no product with that id was found");
    error.code = 404;
    return next(error);
  }

  let imageUrl;
  if (req.file && req.file.path !== product.imageUrl) {
      imageUrl = req.file.path;
      clearImage(product.imageUrl);
  }
  const formedIngredients = ingredients.split(",");
  const formedCats = categories.split(",");
  product.title = title;
  product.name = name;
  product.description = description;
  product.price = price;
  product.imageUrl = imageUrl;
  product.ingredients = formedIngredients;
  product.categories = formedCats;
  product.homeProd = homeProd;

  const updatedProd = await product.save();

  if (!updatedProd) {
    const error = new Error("something went wrong");
    error.code = 500;
    return next(error);
  }
  res.status(200).send(updatedProd);
};

const clearImage = (filepath) => {
  filepath = path.join(__dirname, "../", filepath);
  let error = null;

  try {
    fs.unlinkSync(filepath, (err) => {
      if (err) {
          error = new Error("failed to remove old picture");
      }
    });
    if(error){
        throw error;
    }
  }
   catch (error) {
    console.log(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const prodId = req.params.prodId;

  if (!prodId) {
    const error = new Error("no id was provided");
    error.code = 404;
    return next(error);
  }

  const product = await Product.findById(prodId);
  if (!product) {
    const error = new Error("no product with the given id was found");
    error.code = 404;
    return next(error);
  }
  clearImage(product.imageUrl);

  const deletedProduct = await Product.findByIdAndDelete(prodId);
  if (!deletedProduct) {
    const error = new Error("something went wrong");
    error.code = 500;
    return next(error);
  }
  res.status(200).json({ message: "product deleted" });
};

exports.getSinglProd = async (req, res, next) => {
  const { prodId } = req.params;
  if (!prodId) {
    const error = new Error("no product id was given");
    error.code = 400;
    return next(error);
  }
  const product = await Product.findById(prodId);
  if (!product) {
    const error = new Error("no product found");
    error.code = 404;
    return next(error);
  }

  res.status(200).send(product);
};

exports.addProduct = async (req, res, next) => {
  const {
    title,
    price,
    description,
    ingredients,
    categories,
    name,
    homeProd,
  } = req.body;
  let imageUrl;
  if (req.file) imageUrl = req.file.path;
  const formedIngredients = ingredients.split(",");
  const formedCats = categories.split(",");

  const product = await new Product({
    title,
    price,
    description,
    imageUrl,
    name,
    ingredients: formedIngredients,
    homeProd,
    categories: formedCats
  }).save();
  if (!product) {
    const error = new Error("something went wrong");
    error.code = 500;
    return next(error);
  }
  res.status(200).json({ message: "added product", product: product });
};
