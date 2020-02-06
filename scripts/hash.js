const crypto = require('crypto');
var exports = module.exports;



exports.createHash = ()=>{
const hash = crypto.createHash('sha1').update(new Date().getDate().toString()).digest('hex');
return hash;
};