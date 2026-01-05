import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function createUser(req, res) {

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        role: req.body.role,
    });

    user.save().then(() => {
        res.status(201).json({
            message: "User created successfully",
        });
    }).catch(() => {
        res.status(500).json({
            message: "Failed to create user",
        });
 });

}

export function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password

    User.findOne({ email: email }).then
        ((user) => {
            if(user == null){
                req.status(404).json(
                    {
                        message: "User not found",
                    }
                )
            } else {
                const isPasswordCorrect = bcrypt.compareSync(password, user.password);  
                if(isPasswordCorrect){

                   const token = jwt.sign(
                        {
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role: user.role
                        },
                        process.env.JWT_KEY
                    )

                    res.status(200).json(
                        {
                            message: "Login successful",
                            token: token,
                            role: user.role,
                        }
                    )
                } else {
                    res.status(404).json(
                        {
                            message: "Incorrect password",
                        }
                    )
                }
                                }
        }
    )
}

