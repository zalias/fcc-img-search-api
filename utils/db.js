var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, function(){
  console.log('Mongodb connected');
});

module.exports = mongoose;