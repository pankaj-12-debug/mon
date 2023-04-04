const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');

const errorController = require('./controllers/error');
 
//const sequelize=require('./util/database');
//const MongoConnect=require('./util/database').MongoConnect

//const sequelize=require('./util/database');
//const Product=require('./models/product');

//const User=require('./models/user');

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
/*app.use((req,res,next)=>{
User.findById('6421b62f57109624b8f4faeb')
.then(user=>{
  req.user=new User(user.name,user.email,user.cart,user._id);
  next();
}).catch(err=>{
  console.log(err);
})
})
*/
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//MongoConnect(()=>{
  //console.log('client');
  //app.listen(3000);
//})
mongoose.connect('mongodb+srv://pankajUser:zxc2jvvLEYZmV35P@cluster0.fvdyvew.mongodb.net/?retryWrites=true&w=majority')
.then(result=>{
  app.listen(3000);
}).catch(err=>{
  console.log(err)
})