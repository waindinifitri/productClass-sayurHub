const {Admin, User } = require ('../models');
const {decryptPwd} = require('../helpers/bcrypt')
const {tokenGenerator} = require('../helpers/jwt')



class AdminController {
    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const admin = await Admin.findOne({
                where: { email }
            });
            if (admin) {
                if (decryptPwd(password, admin.password)) {
                    const access_token = tokenGenerator(admin)
                    res.status(200).json({ access_token });
                } else {
                    res.status(400).json("Password incorrect!")
                }
            } else {
                res.status(404).json("User not found!");
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
    
    static async deleteUser(req, res) {
        const id = req.userData.id

        try {
            const result = await User.destroy({
                where: { id }
            });
            res.status(202).json({
                result,
                msg : "User Delete successfully"
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async addUser(req, res) {
        const { fullname, email, password,role,description,notifications} = req.body;
        const profileImage = "https://damp-dawn-67180.herokuapp.com/"+req.file.path;
        try {
                const user = await User.create({
                    fullname,
                    email,
                    password,
                    profileImage,
                    role,
                    description,
                    notifications
                });
                res.status(201).json( user );
            
        } catch (err) {
            res.status(500).json(err);
        }
    }
    static async editUser(req, res) {
        const { fullname, email, password,role,description,notifications} = req.body;
        const profileImage = "https://damp-dawn-67180.herokuapp.com/"+req.file.path;
        try {
                const user = await User.update({
                    fullname,
                    email,
                    password,
                    profileImage,
                    role,
                    description,
                    notifications
                },{
                    where: {id}
                });
                res.status(201).json( user );
            
        } catch (err) {
            res.status(500).json(err);
        }
    }

}