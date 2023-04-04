//const mongodb=require('mongodb');
const Product = require('../models/product');

//const ObjectId=mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
//  const product = new Product(null, title, imageUrl, description, price);
  //product.save().then(()=>{
    //res.redirect('/');
  //}).catch(err=>{
    //console.log(err);
  //});
  //res.redirect('/');
 // Product.create({
   // title:title,
    //price:price,
    //imageUrl:imageUrl,
    //description:description
  //})
  const product=new Product({
    title:title,
    price:price,
    description:description,
    imageUrl:imageUrl
  });
  product.save().then(result=>{
  //  console.log(result);
  console.log('done');
  res.redirect('/admin/products');
  }).catch(err=>{
    console.log(err);
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
 // Product.findAll({where:{id:prodId}})
  .then(product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
  .catch(err=>{
    console.log(err);
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findById(prodId).then(product=>{
// const product=new Product(updatedTitle,updatedPrice,updatedDesc,updatedImageUrl,prodId);
      product.title=updatedTitle;
    product.price=updatedPrice;
    product.description=updatedDesc;
    product.imageUrl=updatedImageUrl;
    return product.save();
  })
  //product.save()
  .then(result=>{
    console.log('updated product');
    res.redirect('/admin/products');
  })
  .catch(err=>{
    console.log(err);
    })
  //const updatedProduct = new Product(
    //prodId,
    //updatedTitle,
    //updatedImageUrl,
    //updatedDesc,
    //updatedPrice
  //);
  //updatedProduct.save();
  //res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  //req.user.getProducts()
  Product.find()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err=>{
    console.log(err);
  })
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
 // Product.deleteById(prodId);
 Product.findByIdAndRemove(prodId)
 //.then(()=>{
  //return product.destroy();
 //})
 .then(()=>{
  console.log('delete product');
  res.redirect('/admin/products');
 })
 .catch(err=>{
  console.log(err);
 })
}; 
