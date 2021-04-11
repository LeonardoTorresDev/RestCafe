const { parseSort } = require('../../helpers/helpers');
const Product=require('../../models/product');

const getProducts=async(req,res)=>{

    const {
        limit=5,
        from=0,
        sort="_id",
        order="asc"
    }=req.query;

    const query={state: true};
    const [total,products]=await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('category','name')
            .populate('user','name')
            .skip(Number(from))
            .limit(Number(limit))
            .sort(parseSort(sort,order)) 
    ]);

    res.status(200).json({
        ok: true,
        total,
        sent: products.length,
        products
    });
}

module.exports=getProducts;