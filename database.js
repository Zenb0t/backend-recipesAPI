const mongoose = require('mongoose');
const dbName = "test";

const uri = process.env.URI_MONGODB ||`mongodb+srv://dbmexepanela:bananadademarmelo@recipe-cluster1.fhuul.mongodb.net/${dbName}?retryWrites=true&w=majority`;


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});