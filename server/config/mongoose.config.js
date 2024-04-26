//# 4
const mongoose = require('mongoose');

//               Connection String          replace MongoDB (only thing you need to change)
mongoose.connect('mongodb://127.0.0.1:27017/booboo_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))  // promise
    .catch(err => console.log('Something went wrong when connecting to the database ', err));