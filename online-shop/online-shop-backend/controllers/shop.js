const Product = require("../models/product");
const path = require("path");
const fs = require("fs");

exports.getHomeProducts = async (req, res, next) => {
  const products = await Product.find({ homeProd: true });
  if (!products) {
    const error = new Error("אופס! משהו השתבש");
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
  if (!prodId) {
    const error = new Error("אידי לא סופק");
    error.code = 404;
    return next(error);
  }

  const product = await Product.findById(prodId);
  if (!product) {
    const error = new Error("אין מוצר עם אידי זהה");
    error.code = 404;
    return next(error);
  }

  let imageUrl;
  if (req.file && req.file.path !== product.imageUrl) {
      imageUrl = req.file.path;
      clearImage(product.imageUrl);
  }

  let formedIngs;
  if(ingredients.length > 0){
    console.log('true', ingredients);
    formedIngs = ingredients.split(',');
  } else {
    formedIngs = [];
  }
  const formedCats = categories.split(",");
  product.title = title;
  product.name = name;
  product.description = description;
  product.price = price;
  product.imageUrl = imageUrl;
  product.ingredients = formedIngs;
  product.categories = formedCats;
  product.homeProd = homeProd;

  const updatedProd = await product.save();
  if (!updatedProd) {
    const error = new Error("אופס משהו השתבש");
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
          error = new Error("נכשל במחיקת התמונה הישנה");
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
    const error = new Error("אידי לא סופק");
    error.code = 404;
    return next(error);
  }

  const product = await Product.findById(prodId);
  if (!product) {
    const error = new Error("לא נמצא מוצר עם אידי זהה");
    error.code = 404;
    return next(error);
  }
  clearImage(product.imageUrl);

  const deletedProduct = await Product.findByIdAndDelete(prodId);
  if (!deletedProduct) {
    const error = new Error("אופס משהו השתבש");
    error.code = 500;
    return next(error);
  }
  res.status(200).json({ message: "product deleted" });
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

  let formedIngs;
  if(ingredients.length > 0){
    formedIngs = ingredients.split(',');
  } else {
    formedIngs = [];
  }

  const formedCats = categories.split(",");
  const product = await new Product({
    title,
    price,
    description,
    imageUrl,
    name,
    ingredients: formedIngs,
    homeProd,
    categories: formedCats
  }).save();
  if (!product) {
    const error = new Error("אופס! משהו השתבש");
    error.code = 500;
    return next(error);
  }
  res.status(200).json({ message: "added product", product: product });
};
