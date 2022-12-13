const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthenticateUserController = {
    register: async (req, res) => {
        const categories = [
            { value: "Electronics", label: "Electronics", icon: "user" },
            { value: "Health",label: "Health", icon: "user" },
            { value: "Bills",label: "Bills", icon: "user" },
            { value: "Shopping",label: "Shopping", icon: "user" },
        ]
        try {
            const { firstName, lastName, email, password } = req.body;
            // Check User Exist
            const existUser = await UserModel.exists({ email: email }, (error, id) => {
                if (error) {
                    console.log(error);
                    return;
                } else {
                    id ? res.status(406).json({ message: "User Already Exist", data: id }) : null;
                }
            });
            // hashPassword
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashPassword = bcrypt.hashSync(password, salt);

            const newUser = new UserModel({
                firstName,
                lastName,
                email,
                password: hashPassword,
                categories: categories
            });

            const CreateUser = await newUser.save();
            res.status(201).json({ message: "User Created Successfully", data: CreateUser });
        } catch (e) {
            res.status(500).json({ message: "Registration Error", data: [] });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            // Check User Exist
            const user = await UserModel.findOne({ email: email });
            if (!user) {
                res.status(401).json({ message: "User Not Found", data: user });
                return;
            }

            // check password
            const PasswordMatch = await bcrypt.compare(password, user.password);
            if (!PasswordMatch) {
                res.status(401).json({ message: "Password don't Exist" })
                return;
            }
            const payload = {
                username: email,
                id: user._id,
            }
            const token = await jwt.sign(payload, process.env.JWT_SECRET);
            res.status(200).json({ message: "User Login Successfully", token, user });
        } catch (e) {
            res.status(500).json({ message: "Login Error", data: e });
        }
    },
    getUser: async (req, res) => {
        res.json({ user: req.user });
    }
}

module.exports = AuthenticateUserController;