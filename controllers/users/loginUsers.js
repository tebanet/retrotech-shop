const { selectUserByEmail } = require();
const { generateError } = require();
const { loginUserSchema} = require();

const loginUser = async (req, res) => {
 try {
    await loginUserSchema.validateAsync(req.body);

    const { email } = req.body;

    const user = await selectUserByEmail (email);

    if (!user) {
        generateError("El email o la contraseña son incorrectos")
    }


    } catch (error) {
        next(error);
    }
}