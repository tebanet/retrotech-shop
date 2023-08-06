const { getProductByName } = require('../../db/queries/produtos/getProductByName');

const getProductName = async (req,res,next) => {
    try {
        const {letter} = req.params
        const product = await getProductByName(letter)
        res.send({
            status: 'ok',
            data: product,
        });
    } catch(error){
        next(error)
    }
}

module.exports = 
    getProductName
