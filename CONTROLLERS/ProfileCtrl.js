const ProfileSchema = require('../MODELS/ProfileModel');
const {validationResult}  = require('express-validator/check')
const addProfile = async(req,res)=>{
    try {
        const errChk = validationResult(req);
        if(errChk.errors.length > 0) {
            return res.status(400).json({"status":"Error","data":validationRes.errors}  )
        }
        let checkProfile = await ProfileSchema.find({user:req.user.id});
        if(checkProfile.length > 0) {
            return res.status(400).json({"status":"Error","data":[{"msg":"Sorry user with This profile already exists"}]}  )
        };
        const {skills,company,website,bio,youtube,instagram,linkedin,facebook,working} = req.body;
        const newProfile = new ProfileSchema();
        if(company){newProfile.company = company}
        if(website){newProfile.website = website};
        if(bio){newProfile.bio = bio}
        if(working){newProfile.status = working}
        else{newProfile.status=false}
        newProfile.skills = skills.split(",");
        newProfile.user = req.user.id;
        const social = {};
        let flag = 0 // check if there is a need for social field to be added.
        if(youtube){social.youtube = youtube;flag = 1}
        if(facebook){social.facebook = facebook;flag = 1}
        if(linkedin){social.linkedin = linkedin;flag = 1}
        if(instagram){social.instagram = instagram;flag = 1}
        if(flag !=0){
            newProfile.social = social;
        }
        await newProfile.save();
        return res.status(200).json({"status":"Success","data":[{"msg":newProfile}]})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({"status":"Failure","data":"Server Error..."})
    }
}
const deleteProfile = async(req,res)=>{
    try {
        const profileToDelete = await ProfileSchema.findByIdAndDelete(req.params.id);
        // await profileToDelete.save();
        return res.status(200).json({"status":"Success","data":[{"msg":"profile Delete Successfull"}]})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({"status":"Failure","data":"Server Error..."})

    }
}
const allProfile = (req,res)=>{}
const modifyProfile = (req,res)=>{}
const profile = (req,res)=>{}

module.exports = {
    addProfile,deleteProfile,modifyProfile,allProfile,profile
}
