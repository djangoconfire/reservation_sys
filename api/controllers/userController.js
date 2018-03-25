var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_signup = (req,res,next) =>{
    User.find({username : req.body.username})
    .exec()
    .then(user =>{
        if(user.length >= 1){
            return res.status(409).json({
            message : "Username Exist"
            })
        }else{
            bcrypt.hash(req.body.password,10,(err,hash) =>{
                if(err){
                    return res.status(500).json({error : err})
                }else{
                    const user = new User({
                        username : req.body.username,
                        password : hash
                    });
                    user.save()
                    .then(result =>{
                        res.status(201).json({
                            message : 'User Created'
                        });
                    })
                    .catch(err =>{
                        res.status(500).json({error : err});
                    })
                }
            });
        }
    }); 
};


// User Login
exports.user_login = (req,res,next) =>{
  User.find({username : req.body.username})
  .exec()
  .then(user =>{
    if(user.length < 1){
      return res.status(401).json({
        message : 'Auth Failed'
      })
    }
    // compare hash
    bcrypt.compare(req.body.password , user[0].password ,(err,result) =>{
      if(err){
        return res.status(401).json({
          message : 'Auth Failed'
        })
      }

      if(result){
        const token = jwt.sign(
          {
            username : user[0].username,
            userId : user[0]._id
          },
          'secret',
          {
            expiresIn : "1h"
          }
        );

        return res.status(200).json({
          message : 'Auth Successful',
          token : token
        });

      }else{
        return res.status(401).json({
          message : 'Auth Failed'
        })
      }
    });
  })  
  .catch(err =>{
    res.status(500).json({error : err});
  })
};



// get All registered users

exports.get_all_users = (req,res,next) => {
    User.find()
    .exec()
    .then(doc =>{
        if(doc){
            return res.status(200).json(doc)
        }else{
            return res.status(404).json({message : "Data not found"});
        }
    })
    .catch(err =>{
        return res.status(400).json({error : err});
    })

};