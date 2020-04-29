const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Model/user');

app.post('/signUp',(req,res)=>{
    const {email,password,user} = req.body;

    User.find({email},(err,userDb)=>{
        
        if(err){console.log(err);return}
        if(userDb.length==0){

            bcrypt.hash(password, 10, (err, hash)=> {
                // Store hash in your password DB.
                if(err){console.log(err);return}

                let newUser = new User({email,password:hash,name:user});

                newUser.save((err,userSaved)=>{
                    if(err){console.log(err);return}
                    console.log('23',userSaved);
                    let data = {
                        nombre:userSaved.name,
                        correo:userSaved.email
                    }

                    let token = jwt.sign(data, process.env.KeyToken,{expiresIn:'1d'});

                    res.json({ok:true,message:'Usuario guardado con exito',code:1,token});
                });


            });

            
        }else{
            res.json({ok:true,message:'Ya existe ese correo en nuesta base de datos',code:2});
        }
    });
});



module.exports = app;