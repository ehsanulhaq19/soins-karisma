const httpStatus = require('http-status');
const User = require('../models/User')
const authService = require('../services/authService')

const register = async (req, res) => {
    const data = req.body
    let hashPassword = null

    await authService.cryptPassword(data.password)
    .then(hashResponse => {
        hashPassword = hashResponse
    })

    const user = User.build({
        userName: data.username,
        email: data.email,
        password: hashPassword,
    });

    let message = ''
    await user.save()
    .then(res => {
        message = "User is created successfully"
    })
    .catch(e => {
        message = e?.errors?.[0]?.message ? e.errors[0].message : "User is not created"
    });

    res.status(httpStatus.CREATED).send({ ...{message} });
};

const login = async (req, res) => {
    const data = req.body
    const email = data.email
    const password = data.password

    const user = await User.findOne({ where: { email } });
    let isPasswordMatch = false
    
    await authService.comparePassword(password, user.password)
    .then(response => {
        isPasswordMatch = response
    })

    const response = {}

    if (isPasswordMatch) {
        response['token'] = authService.getUserJWT(user)
    }

    res.send({ ...response });
};

const logout = (req, res) => {
    const message = "Logout api"
    res.send({ message });
};

module.exports = {
  register,
  login,
  logout
};