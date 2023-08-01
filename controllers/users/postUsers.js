const bcrypt = require('bcrypt');
const newUserSchema = require('../../schemas/users/newUser.js');
const { insertUser, selectUserById } = require('../../db/queries/users');

const postUsers = async (req, res, next) => {
  try {
    await newUserSchema.validateAsync(req.body);

    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await insertUser({
      ...req.body,
      password: hashedPassword,
    });

    const createdUser = await selectUserById(userId);

    delete createdUser.password;

    res.status(201).send({ status: 'ok', data: createdUser });
  } catch (error) {
    next(error);
  }
};

module.exports = postUsers;
