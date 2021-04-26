const {Schema,model}=require('mongoose');

const ProductSchema=Schema({
    name:{
        type: String,
        required: [true,'Name is required']
    },
    state:{
        type: Boolean,
        default: true,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "user is required"]
    },
    unitPrice:{
        type: Number,
        default: 0
    },
    stock:{
        type: Number,
        default: 0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description:{
        type: String
    },
    img:{
        type: String
    }
});

module.exports=model('Product',ProductSchema);