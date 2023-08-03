const { getProductByiD } = require('../../db/queries/produtos/getProductByiD');

const getSingleProduct = async (req,res,next) => {
    try {
        const {id} = req.params
        const product = await getProductByiD(id)
        res.send({
            status: 'ok',
            data: product,
        });
    } catch(error){
        next(error)
    }
}

module.exports = 
    getSingleProduct
