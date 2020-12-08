const mongoose = require('mongoose');
const dbName = "test";

const uri = `mongodb+srv://dbmexepanela:bananadademarmelo@recipe-cluster1.fhuul.mongodb.net/${dbName}?retryWrites=true&w=majority`;


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});