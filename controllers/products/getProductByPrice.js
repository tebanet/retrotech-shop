const { getProductByPrice } = require('../../db/queries/produtos/getProductByPrice');

const getProductPrice = async (req,res,next) => {
    try {
        const {min,max} = req.params
        const product = await getProductByPrice(min,max)
        res.send({
            status: 'ok',
            data: product,
        });
    } catch(error){
        next(error)
    }
}

module.exports = 
    getProductPrice