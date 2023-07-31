const bcrypt = require("bcrypt");
const { insertUser, selectUserById } = require();
const { newUserSchema }= require();

const postUsers = async (req, res, next) =>{
try {
    await newUserSchema.validateAsync(req.body);

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await insertUser({ ...req.body, password: hashedPassword});

    res.status(201).send({ status: "ok", data: await selectUserById(userId) });
} catch (error) {
    next(error);
}
};
