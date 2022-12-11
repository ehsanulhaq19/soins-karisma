const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cryptPassword = (password) => {
  return new Promise(function(resolve, reject) {
    try {
      const passwordString = isNaN(password) ? password : password.toString()
      bcrypt.genSalt(10, function(err, salt) {
        if (err) 
          reject(err);
    
        bcrypt.hash(passwordString, salt, function(err, hash) {
          if (err) {
            reject(err);
          }
          else {
            resolve(hash)
          }
        });
      });  
    } catch (error) {
      reject(error);
    }
  });
};

const comparePassword = (password, hashword) => {
  return new Promise (function(resolve, reject) {
    const passwordString = isNaN(password) ? password : password.toString()
    bcrypt.compare(passwordString, hashword, function(err, isPasswordMatch) {   
      if (err == null) {
        resolve(isPasswordMatch)
      } else {
        reject(err)
      }
    });
  })
};

const getUserJWT = (user) => {
  const data = {
    email: user.email,
    userName: user.userName
  }
  const privateKey = process.env.JWT_PRIVATE_KEY
  return jwt.sign(data, privateKey);
}

module.exports = {
    cryptPassword,
    comparePassword,
    getUserJWT
}