const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../Model/user');


app.post('/login',(req,res)=>{
    const {email,password} = req.body;
    Usuario.findOne({email},(err,usuarioDB)=>{
        if(err){console.log(err);return}
        if(!usuarioDB){res.json({ok:false,message:'Datos Incorrectos'});return}//correo incorrecto

        if(!bcrypt.compareSync(password,usuarioDB.password)){//contraseña Incorrecta
            return res.json({
                ok:false,
                message:'Datos Incorrectos'
            });
        }
        
        let token = jwt.sign({name:usuarioDB.name,email:usuarioDB.email,_id:usuarioDB._id},process.env.KeyToken,{expiresIn:'1d'});

        res.json({
            ok:true,
            token,
            name:usuarioDB.name
        });
        
    })
});

module.exports = app;