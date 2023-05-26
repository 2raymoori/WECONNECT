const ProfileSchema = require("../MODELS/ProfileModel");
const { validationResult } = require("express-validator/check");
const addProfile = async (req, res) => {
  try {
    const errChk = validationResult(req);
    if (errChk.errors.length > 0) {
      return res.status(400).json({ status: "Error", data: errChk.errors });
    }
    let checkProfile = await ProfileSchema.find({ user: req.user.id });
    if (checkProfile.length > 0) {
      return res.status(400).json({
        status: "Error",
        data: [{ msg: "Sorry user with This profile already exists" }],
      });
    }
    const {
      skills,
      company,
      website,
      bio,
      youtube,
      instagram,
      linkedin,
      facebook,
      status,
    } = req.body;
    const newProfile = new ProfileSchema();
    if (company) {
      newProfile.company = company;
    }
    if (website) {
      newProfile.website = website;
    }
    if (bio) {
      newProfile.bio = bio;
    }
    if (status) {
      newProfile.status = status;
    } else {
      newProfile.status = false;
    }
    newProfile.skills = skills.split(",");
    newProfile.user = req.user.id;
    const social = {};
    let flag = 0; // check if there is a need for social field to be added.
    if (youtube && youtube.trim().length == 0) {
      social.youtube = youtube;
      flag = 1;
    }
    if (facebook && facebook.trim().length == 0) {
      social.facebook = facebook;
      flag = 1;
    }
    if (linkedin && linkedin.trim().length == 0) {
      social.linkedin = linkedin;
      flag = 1;
    }
    if (instagram && instagram.trim().length == 0) {
      social.instagram = instagram;
      flag = 1;
    }
    if (flag != 0) {
      newProfile.social = social;
    }
    await newProfile.save();
    return res
      .status(200)
      .json({ status: "Success", data: [{ msg: newProfile }] });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: "Failure", data: "Server Error..." });
  }
};
const deleteProfile = async (req, res) => {
  try {
    const profileToDelete = await ProfileSchema.findByIdAndDelete(
      req.params.id
    );
    // await profileToDelete.save();
    return res.status(200).json({
      status: "Success",
      data: [{ msg: "profile Delete Successfull" }],
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: "Failure", data: "Server Error..." });
  }
};
const allProfile = async (req, res) => {
  try {
    const allProfile = await ProfileSchema.find().populate("user", [
      "firstName",
      "lastName",
      "email",
        "profileImg",
    ]);
    return res
      .status(200)
      .json({ status: "Success", data: [{ msg: allProfile }] });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: "Failure", data: "Server Error..." });
  }
};
const modifyProfile = async (req, res) => {
  try {
    let profileToUpdate = await ProfileSchema.findById(req.params.id);
    if (profileToUpdate) {
      const {
        skills,
        company,
        website,
        bio,
        youtube,
        instagram,
        linkedin,
        facebook,
        status,
      } = req.body;
      if (company) {
        profileToUpdate.company = company;
      }
      if (website) {
        profileToUpdate.website = website;
      }
      if (bio) {
        profileToUpdate.bio = bio;
      }
      if (status) {
        profileToUpdate.status = status;
      } else {
        profileToUpdate.status = false;
      }
      if (skills) {
        profileToUpdate.skills = skills.split(",");
        profileToUpdate.user = req.user.id;
      }
      const social = {};
      let flag = 0; // check if there is a need for social field to be added.
      if (youtube) {
        social.youtube = youtube;
        flag = 1;
      }
      if (facebook) {
        social.facebook = facebook;
        flag = 1;
      }
      if (linkedin) {
        social.linkedin = linkedin;
        flag = 1;
      }
      if (instagram) {
        social.instagram = instagram;
        flag = 1;
      }
      if (flag != 0) {
        profileToUpdate.social = social;
      }
      await profileToUpdate.save();
      return res
        .status(200)
        .json({ status: "Success", data: [{ msg: profileToUpdate }] });
      return res.status(400).json({
        status: "Error",
        data: [{ msg: "Sorry user with This profile already exists" }],
      });
    } else {
      console.log(profileToUpdate);
      return res.status(400).json({
        status: "Error",
        data: [{ msg: "Sorry No such profile exists in the system." }],
      });
    }
  } catch (error) {}
};

const profile = async (req, res) => {
  try {
    const profile = await ProfileSchema.findById(req.params.id);
    return res
      .status(200)
      .json({ status: "Success", data: [{ msg: profile }] });
  } catch (error) {
    return res.status(500).json({ status: "Failure", data: "Server Error..." });
  }
};
const curUserProfile = async (req, res) => {
  try {
    const curProfile = await ProfileSchema.findOne({
      user: req.user.id,
    }).populate("user", ["firstName", "lastName", "email", "profileImg"]);
    if (curProfile) {
      return res
        .status(200)
        .json({ status: "Success", data: [{ msg: curProfile }] });
    }
    return res
      .status(200)
      .json({ status: "Success", data: [{ msg: curProfile }] });
  } catch (error) {
    console.log("ERror.....");
    console.log(error.message);
    return res
      .status(500)
      .json({ status: "Failuress", data: "Server Error..." });
  }
};

const addEducation = async (req, res) => {
  try {
    // Check for a missing fieldp;
    const errChk = validationResult(req);
    if (errChk.errors.length > 0) {
      return res.status(400).json({ status: "Error", data: errChk.errors });
    }
    const searchProfile = await ProfileSchema.findById(req.params.id);
    if (searchProfile) {
      const { school, degree, fieldofstudy, from, to, description, current } =
        req.body;
      const education = { school, degree, fieldofstudy, from, description };
      if (!current) {
        education.to = to;
      } else {
        education.current = true;
      }
      searchProfile.education.push(education);
      await searchProfile.save();
      return res
        .status(200)
        .json({ status: "Success", data: [{ msg: searchProfile }] });
    } else {
      return res.status(400).json({
        status: "Error",
        data: [{ msg: "Sorry No such profile exists in the system." }],
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: "Failure", data: "Server Error..." });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const { profileId, educationId } = req.params;
    const profileFind = await ProfileSchema.findById(profileId);
    if (profileFind) {
      const newEdu = await profileFind.education.filter((e) => {
        return e.id !== educationId;
      });

      profileFind.education = newEdu;
      await profileFind.save();
      return res
        .status(200)
        .json({ Status: "Success", data: "Education Successfully Deleted." });
    } else {
      return res.status(201).json({
        status: "Failure",
        data: "Sorry no profile exists with this Id. Please try again with a valid Id.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Failure",
      data: "sorrry There exists an error within the server.",
    });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const { profileId, experienceId } = req.params;
    const profileFind = await ProfileSchema.findById(profileId);
    if (profileFind) {
      const newExperience = await profileFind.experience.filter((e) => {
        return e.id !== experienceId;
      });

      profileFind.experience = newExperience;
      await profileFind.save();
      return res
        .status(200)
        .json({ Status: "Success", data: "Experience Successfully Deleted." });
    } else {
      return res.status(201).json({
        status: "Failure",
        data: "Sorry no profile exists with this Id. Please try again with a valid Id.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Failure",
      data: "sorrry There exists an error within the server.",
    });
  }
};

const addExperience = async (req, res) => {
  try {
    // Check for a missing field;
    const errChk = validationResult(req);
    if (errChk.errors.length > 0) {
      return res.status(400).json({ status: "Error", data: errChk.errors });
    }
    const searchProfile = await ProfileSchema.findById(req.params.id);
    if (searchProfile) {
      const { title, company, location, from, to, current, description } =
        req.body;
      const experience = { title, company, from, description };
      if (location) {
        experience.location = location;
      }
      if (current) {
        experience.current = true;
      } else {
        experience.to = to;
      }
      searchProfile.experience.push(experience);
      await searchProfile.save();
      return res
        .status(200)
        .json({ status: "Success", data: [{ msg: searchProfile }] });
    } else {
      return res.status(400).json({
        status: "Error",
        data: [{ msg: "Sorry No such profile exists in the system." }],
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: "Failure", data: "Server Error..." });
  }
};
const modifyExperience = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  addProfile,
  deleteProfile,
  modifyProfile,
  allProfile,
  profile,
  addEducation,
  addExperience,
  curUserProfile,
  deleteEducation,
  deleteExperience,
};
