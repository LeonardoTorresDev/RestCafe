const searchUsers=require('./searchUsers');
const searchCategories=require('./searchCategories');
const searchProducts=require('./searchProducts');

const search=async(req,res)=>{
    
    const {collection,query}=req.query;
    
    switch(collection){
        case('users'):
            await searchUsers(query,res);
            break;
        case('categories'):
            await searchCategories(query,res);
            break;
        case ('products'):
            await searchProducts(query,res);
            break;
        default:
            res.status(400).json({
                ok: false,
                msg: "Collection doesn't exist"
            });
    }

}

module.exports=search;