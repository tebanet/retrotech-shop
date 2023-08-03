const {getAllProducts} = require('../../db/queries/produtos/getAllProducts')

const getProducts= async (req,res,next) => {
    try {
        const products = await getAllProducts()
        res.send({
            status: 'ok',
            data: products,
        });
    } catch(error){
        next(error)
    }
}

module.exports =
    getProducts
