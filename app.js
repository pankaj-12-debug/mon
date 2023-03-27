const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
 
//const sequelize=require('./util/database');
const MongoConnect=require('./util/database').MongoConnect
//=======
//const sequelize=require('./util/database');
//const Product=require('./models/product');
const User=require('./models/user');
//const Cart=require('./models/cart');
//const CartItem=require('./models/cart-item');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//db.execute('SELECT * FROM products').then(result=>{
  //  console.log(result[0],result[1]);
//}).catch(err=>{
  //  console.log(err);
//})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next)=>{
User.findById('6421b62f57109624b8f4faeb')
.then(user=>{
  req.user=user;
  next();
}).catch(err=>{
  console.log(err);
 next();
})
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
//User.hasMany(Product);
//User.hasOne(Cart);
//Cart.belongsTo(User);
//Cart.belongsToMany(Product,{through:CartItem});
//Product.belongsToMany(Cart,{through:CartItem});

/*sequelize.sync().then(result=>{
  //  console.log(result);
  return User.findByPk(1);
    //app.listen(3000);
})
.then(user=>{
  if(!user)
  {
    return User.create({name:'pankaj',email:'pankaj@gmail.com'});
  }
  return user;
})
.then(user=>{
  //console.log(user);
  return user.createCart();
 
})
.then(cart=>{
  app.listen(3000);
})
.catch(err=>{
    console.log(err);
});
*/
//app.listen(3000);
MongoConnect(()=>{
  console.log('client');
  app.listen(3000);
})