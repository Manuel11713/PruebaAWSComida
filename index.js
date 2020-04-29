require('./config');

const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());   //Equivalente a body-parser
app.use(require('./Routes/index'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

mongoose.connect('mongodb+srv://manuel:Spartan11713@cluster0-rhrav.mongodb.net/test?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true },(err,res)=>{
  if(err){console.log(err);return}
  console.log('Db connected');

});

app.listen(process.env.PORT | 5000,()=>{
    console.log('Server on port ',process.env.PORT | 5000);
});


