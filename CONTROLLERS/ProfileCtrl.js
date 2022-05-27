const ProfileSchema = require('../MODELS/ProfileModel');
const {validationResult}  = require('express-validator/check')
const addProfile = async(req,res)=>{
    try {
        const errChk = validationResult(req);
        if(errChk.errors.length > 0) {
            return res.status(400).json({"status":"Error","data":errChk.errors}  )
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
        await profileToDelete.save();
        return res.status(200).json({"status":"Success","data":[{"msg":"profile Delete Successfull"}]})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({"status":"Failure","data":"Server Error..."})

    }
}
const allProfile =async (req,res)=>{
    try {
        const allProfile = await ProfileSchema.find();
        return res.status(200).json({"status":"Success","data":[{"msg":allProfile}]})

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"status":"Failure","data":"Server Error..."});

    }
}
const modifyProfile = async(req,res)=>{
    try {
        let profileToUpdate = await ProfileSchema.findById(req.params.id)
        if(profileToUpdate) {
            const {skills,company,website,bio,youtube,instagram,linkedin,facebook,working} = req.body;
            if(company){profileToUpdate.company = company}
            if(website){profileToUpdate.website = website};
            if(bio){profileToUpdate.bio = bio}
            if(working){profileToUpdate.status = working}
            else{profileToUpdate.status=false}
            if(skills){
                profileToUpdate.skills = skills.split(",");
                profileToUpdate.user = req.user.id;
            }
            const social = {};
            let flag = 0 // check if there is a need for social field to be added.
            if(youtube){social.youtube = youtube;flag = 1}
            if(facebook){social.facebook = facebook;flag = 1}
            if(linkedin){social.linkedin = linkedin;flag = 1}
            if(instagram){social.instagram = instagram;flag = 1}
            if(flag !=0){
                profileToUpdate.social = social;
            }
            await profileToUpdate.save();
            return res.status(200).json({"status":"Success","data":[{"msg":profileToUpdate}]})
            return res.status(400).json({"status":"Error","data":[{"msg":"Sorry user with This profile already exists"}]}  )
        }
        else{
            console.log(profileToUpdate);
            return res.status(400).json({"status":"Error","data":[{"msg":"Sorry No such profile exists in the system."}]}  )
        }
    } catch (error) {

    }
}

const profile = async(req,res)=>{
    try {
        const profile = await ProfileSchema.findById(req.params.id)
        return res.status(200).json({"status":"Success","data":[{"msg":profile}]})
    } catch (error) {
        return res.status(500).json({"status":"Failure","data":"Server Error..."})

    }
}
const curUserProfile = async (req, res) => {
    try {
        const curProfile = await ProfileSchema.findOne({user:req.user.id}).populate("user",["firstName","lastName","email"]);
        if(curProfile) {
            return res.status(200).json({"status":"Success","data":[{"msg":curProfile}]})

        }
        return res.status(200).json({"status":"Success","data":[{"msg":curProfile}]})

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"status":"Failuress","data":"Server Error..."})
    }
}

const addEducation = async(req, res) => {
    try {
        // Check for a missing fieldp;
        const errChk = validationResult(req);
        if(errChk.errors.length > 0) {
            return res.status(400).json({"status":"Error","data":errChk.errors}  )
        }
        const searchProfile = await ProfileSchema.findById(req.params.id);
        if(searchProfile){
            const {school,degree,fieldofstudy,from,to,description}  = req.body;
            const education = {school,degree,fieldofstudy,from,description};
            if(to){
                education.to = to;
            }else{
                education.current = true;
            }
            searchProfile.education.push(education);
            await searchProfile.save();
            return res.status(200).json({"status":"Success","data":[{"msg":searchProfile}]})
        }
        else{
            return res.status(400).json({"status":"Error","data":[{"msg":"Sorry No such profile exists in the system."}]}  )
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"status":"Failure","data":"Server Error..."})

    }
}
const modifyEducation = async(req, res) =>{
    try {

    } catch (error) {

    }
}
const addExperience = async(req, res) => {

    try {
        // Check for a missing field;
        const errChk = validationResult(req);
        if(errChk.errors.length > 0) {
            return res.status(400).json({"status":"Error","data":errChk.errors}  )
        }
        const searchProfile = await ProfileSchema.findById(req.params.id);
        if(searchProfile){
            const {title,company,location,from,to,description}  = req.body;
            const experience = {title,company,from,description};
            if(location){experience.location = location}
            if(to){
                experience.to = to;
            }else{
                experience.current = true;
            }
            searchProfile.experience.push(experience);
            await searchProfile.save();
            return res.status(200).json({"status":"Success","data":[{"msg":searchProfile}]})
        }
        else{
            return res.status(400).json({"status":"Error","data":[{"msg":"Sorry No such profile exists in the system."}]}  )
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"status":"Failure","data":"Server Error..."})

    }
}
const modifyExperience = async(req, res) =>{
    try {

    } catch (error) {

    }
}

module.exports = {
    addProfile,deleteProfile,modifyProfile,allProfile,profile,addEducation,addExperience,curUserProfile
}
