const mongoose = require('mongoose');
var exports = module.exports;


const  userSchema = new mongoose.Schema ({
 login: String,
 password: String,
});

exports.User = mongoose.model('User',userSchema);