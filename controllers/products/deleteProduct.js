const { getProductByiD } = require('../../db/queries/produtos/getProductByiD')
const { generateError } = require('../../helpers/generateError.js')

const deleteProduct= async (req,res,next) => {
    try {

        // req.userId
    const { id } = req.params;

    // conseguir a info do produto que quero apagar
    const product = await getProductByiD(id);
    console.log(product)

    // comprovar se o usuário do token e o mesmo que o tweet
    if (req.userId !== product.id_seller) {
       throw generateError("Estás a tentar apagar um produto que não é teu", 401)
    }
    
    // // apagar o tweet
    // await deleteProductByiD(id)
        res.send({
            status: 'ok',
            message: `O produto com o id: ${id} foi apagado`
        });
    } catch(error){
        next(error)
    }
}

module.exports = 
    deleteProduct
