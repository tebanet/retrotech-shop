const { getProductByCategory } = require('../../db/queries/produtos/getProductByCategory');

const getProductCategory = async (req,res,next) => {
    try {
        const {letter} = req.params
        const product = await getProductByCategory(letter)
        res.send({
            status: 'ok',
            data: product,
        });
    } catch(error){
        next(error)
    }
}

module.exports = 
    getProductCategory