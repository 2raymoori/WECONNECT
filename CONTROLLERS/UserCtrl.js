const UserModel = require("../MODELS/UserModel");
const jwt = require('jsonwebtoken');
const encryptPass = require('bcryptjs');
const {validationResult} = require('express-validator/check')

const addUser = async (req,res)=>{
    try {
        const{fName,lName,email,password,confirmPass} =req.body
        const validationRes = validationResult(req);
        console.log(validationRes);
        if(validationRes.errors.length >0){
            return res.status(201).json({"status":"Error","data":validationRes.errors}  )
        }
        else if(password.trim() !== confirmPass.trim()){
            return res.status(201).json({"status":"Error","data":[{"msg":"Sorry Both password and Confirm password must be the same."}]}  )

        }else{
            const newUser = new UserModel();
            newUser.firstName = fName;
            newUser.lastName = lName;
            newUser.email = email;
            // ENCRYPT PASSWORD
            const salt = await encryptPass.genSalt(10);
            const hashPass = await encryptPass.hash(password,salt);
            newUser.password = hashPass;

            /// GENERATE TOKEN
            const payload = {
                "email":email,
                "id":newUser.id
            }
            jwt.sign(payload,"4472897njieS_!",{expiresIn:3600},async(err,token)=>{
                if(err){
                    console.log("Error....."+err);
                    return res.status(201).json({"status":"Error","data":[{"msg":"sdfsdf"}]})
                }
                else{
                    console.log("TOKEN GEN Success....."); 
                     await newUser.save();   
                    // return res.status(200).json({"status":"Success","data":newUser})
                    return res.status(200).json({"status":"Success","data":[{"msg":newUser,"token":token}]})
                }
            })
    
         

        }
    } catch (error) {
        return res.status(500).json({"status":"Failure","data":"Error..."})
    }
}

const deleteUser = (req,res)=>{

}
const modifyUser = (req,res)=>{

}
const allUser = (req,res)=>{
    console.log(req.user)

};
const getUser = (req,res)=>{

}

module.exports ={
    addUser,
    deleteUser,
    modifyUser,
    allUser,
    getUser
}