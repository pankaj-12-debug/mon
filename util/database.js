
//const Sequelize=require('sequelize');
//const sequelize=new Sequelize('node-complete','root','Meena@123',{
  //  dialect:'mysql',
   // host:'localhost'
//});
//module.exports=sequelize;
const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;
let _db;
const MongoConnect=callback=>{
  MongoClient.connect('mongodb+srv://pankajUser:zxc2jvvLEYZmV35P@cluster0.fvdyvew.mongodb.net/?retryWrites=true&w=majority')
.then(client=>{
  console.log('Connected');
  _db=client.db();
  callback()
}).catch(err=>{
  console.log(err);
  throw err;
})
}
const getDb=()=>{
  if(_db)
  {
    return _db;
  }
  throw 'no database found!'
}
//module.exports=MongoConnect;
exports.MongoConnect=MongoConnect;
exports.getDb=getDb;