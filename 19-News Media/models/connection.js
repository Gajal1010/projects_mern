const mongoose = require('mongoose');

// --------------------- BDD -----------------------------------------------------
// useNewUrlParser ;)
var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
   };

mongoose.connect('mongodb://localhost:27017/morningnews',
   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database Morning News connection : Success ***');
    }
   }
);