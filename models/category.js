const {Schema,model}=require('mongoose');

const categorySchema=Schema({
    name:{
        type: String,
        required: [true,'Name is required']
    },
    state:{
        type: Boolean,
        default: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "user is required"]
    }
});

module.exports=model('Category',categorySchema);