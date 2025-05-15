// dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../model/adminModel');

require('dotenv').config();

const saltRounds = 10;

exports.register = async (req, res) => {
    // pass hashing
    const hashPass = await bcrypt.hash(req.body.pass, saltRounds);

    try{

         const admin = new Admin({
            name: req.body.name,
            img: req.body.img,
            email : req.body.email,
            pass: hashPass,
        });
        await admin.save();
        res.status(200).json({
            msg: 'User created',
        });
        
    }catch (err) {
        res.status(500).json(err);
    }

}

exports.logIn = async (req, res) => {
    try{
        const adminInfo = await Admin.findOne({ email: req.body.email });
        

        if(adminInfo){
            const isValid = await bcrypt.compare(req.body.pass, adminInfo.pass);
            
            if (isValid) {
                // token generate
                const { name, img, email, _id } = adminInfo;
                const jwtObj = {
                    name,
                    img,
                    email,
                    id: _id,
                };
                const token = jwt.sign(jwtObj, process.env.JWT_SECRET, { expiresIn: '1hr' });

                res.status(200).json(token);
            } else {
                res.status(401).send('Auth err');
            }

        }else{
            res.status(401).send('Auth err')
        }
    }catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}