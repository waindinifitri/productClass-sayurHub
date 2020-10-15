const { User } = require("../models");
const {decryptPwd} = require('../helpers/bcrypt')
const {tokenGenerator} = require('../helpers/jwt')


class UserController {
	static async register(req, res) {
		const { full_name, email, password, role } = req.body;
		try {
			const found = await User.findOne({
				where: {
					email
				}
			})
			if (found) {
				res.status(409).json({
					msg: "Email already registered! Input another email account, thanks!"
				})
			} else {
				const user = await User.create({
					full_name,
					email,
					password,
					role
				});
				const access_token = tokenGenerator(user);
				res.status(201).json(access_token);
			}
		} catch (err) {
			res.status(500).json(err);
		}
	}
	  static async login(req, res, next) {
		const { email, password } = req.body;
		console.log(req.body);
		try {
			const user = await User.findOne({
				where: { email }
			});
			if (user) {
				if(decryptPwd(password, user.password)) {
				const access_token = tokenGenerator(user);
				res.status(200).json({ token : access_token });
			  } else {
				  res.status(409).json({
				  msg: "Incorrect password!"
				})
			  }
			} else{
                res.status(404).json({
                    msg : "User not found!"
                })
            }
			} catch (err) {
			  next(err);
			}
	}
	
	static async findById(req, res) {
		const id = req.params.id;
		try {
			const user = await User.findOne({
				where: { id }
			});
			if (user) {
                res.status(200).json(user)    
            }
            else {
                res.status(404).json(`User is not found.`)
            }
        } 
        catch (error) {
            next(error)
        }
	}
    static async editUser(req, res) { 
		const id = req.params.id;
		const { full_name, profile_image, email, description } = req.body;
		try {
			const found = await User.findOne({ 
                where : { id }
            })
            if (found) {
				users.update({
                    full_name,
					profile_image,
                    email,
					description
				}, {
					where: { id },
					}
				);
			}   
			res.status(202).json({
				msg : "Successfully updated your profile!"
		}); 
		} catch (err) {
			res.status(500).json(err);
		}
	}
	static async getAllUser(req, res) {
		console.log("See all the Users");
		try {
		  const user = await User.findAll({})
	
		  res.status(200).json({user: user});
		} catch (err) {
		  res.status(500).json({
			message: err,
		  });
		}
	  }
}
module.exports = UserController;