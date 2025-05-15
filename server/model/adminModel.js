// dependencies
const { model, Schema, default: mongoose } = require('mongoose');

// schema
const AdminSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required : true,
    },
    img:{
        type: String,
        required: true
    },
    pass:{
        type: String,
        required: false,
    },
    books: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Books',
        },
    ],
});

// model
const Admin = model('Admin', AdminSchema);

// export
module.exports = Admin;
