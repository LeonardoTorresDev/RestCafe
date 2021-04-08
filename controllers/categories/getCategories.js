const { parseSort } = require('../../helpers/helpers');
const Category = require('../../models/category');

const getCategories = async (req,res)=>{

    const {
        limit=5,
        from=0,
        sort="_id",
        order="asc"
    }=req.query;
    
    const query={state: true};
    const [total,categories]=await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user','name')
            .skip(Number(from))
            .limit(Number(limit))
            .sort(parseSort(sort,order)) 
    ]);

    res.status(200).json({
        ok: true,
        total,
        sent: categories.length,
        categories
    });
}

module.exports=getCategories;