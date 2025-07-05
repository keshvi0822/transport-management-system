const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {  
        type: String,
        required: true
    }
});

const OwnerModel = mongoose.model("owner", OwnerSchema);
module.exports = OwnerModel;
