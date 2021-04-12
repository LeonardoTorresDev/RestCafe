const {Schema,model}=require('mongoose');

const UserSchema=Schema({
    name:{
        type: String,
        required: [true, 'Name is required']
    },
    email:{
        type: String,
        required:[true,'Email is required'],
        unique:true
    },
    password:{
        type: String
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE'],
        default: 'USER_ROLE'
    },
    state:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    },
    verified:{
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON=function(){
    const {__v,password,_id,...user}=this.toObject();
    user.uid=_id;
    return user;
}

module.exports=model('User',UserSchema);