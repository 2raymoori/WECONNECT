const PostModel = require("../MODELS/PostModel");
const { validationResult } = require("express-validator/check");
const addpost = async (req, res) => {
  try {
    const { description, title } = req.body;
    const validationRes = validationResult(req);
    if (validationRes.errors.length > 0) {
      return res
        .status(400)
        .json({ status: "Error", data: validationRes.errors });
    }
    const newPost = new PostModel({
      description,
      title,
      user: req.user.id,
    });
    await newPost.save();
    return res.status(200).json({
      status: "Success",
      data: [{ msg: "Post Successfully added", data: newPost }],
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: "Failure", data: "Error..." });
  }
};
const deletepost = async (req, res) => {
  try {
    const postToDelete = await PostModel.findById(req.params.id);
    if (postToDelete.user == req.user.id) {
      await postToDelete.delete();
      return res.status(200).json({
        status: "success",
        data: [{ msg: "Post Successfully Deleted", data: postToDelete }],
      });
    } else {
      return res
        .status(400)
        .json({ status: "Failure", data: [{ msg: "Post Delete Failed" }] });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: "Failure", data: "Error..." });
  }
};
const allpost = async (req, res) => {
  try {
    const allPost = await PostModel.find();
    return res
      .status(200)
      .json({ status: "Success", data: [{ msg: allPost }] });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: "Failure", data: "Error..." });
  }
};
const modifypost = async (req, res) => {
  try {
    const { description, title } = req.body;
    const modifyPost = await PostModel.findById(req.params.id);
    if (modifyPost.user == req.user.id) {
      if (title) {
        modifyPost.title = title;
      }
      if (description) {
        modifyPost.description = description;
      }
      await modifyPost.save();
      return res.status(200).json({
        status: "Success",
        data: [{ msg: "Post Successfully added", data: modifyPost }],
      });
    } else {
      return res
        .status(400)
        .json({ status: "Failure", data: [{ msg: "Post Update Failed" }] });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: "Failure", data: "Error..." });
  }
};
const myposts = async (req, res) => {
  try {
    const myPosts = await PostModel.find({ user: req.user.id });
    return res
      .status(200)
      .json({ status: "Success", data: [{ msg: "My Posts", data: myPosts }] });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: "Failure", data: "Error..." });
  }
};
const post = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    return res
      .status(200)
      .json({ status: "Success", data: [{ msg: "post", data: post }] });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: "Failure", data: "Error..." });
  }
};
const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const findPost = await PostModel.findById(postId);
    if (findPost) {
      console.log(req.user.id);
      const likesList = findPost.likes;
      const newLIke = { users: req.user.id };
      let flag = false;
      likesList.map((e) => {
        if (e.users == req.user.id) {
          flag = true;
        }
      });
      if (!flag) {
        findPost.likes.push(newLIke);
        await findPost.save();
      }
      return res.status(200).json({
        status: "Success",
        data: [{ msg: "Post like success", data: findPost }],
      });
      console.log("Post Found");
    } else {
      return res.status(400).json({
        status: "Failure",
        data: [{ msg: "No Post with such an Id in the System" }],
      });
    }
  } catch (error) {
    return res.status(500).json({ status: "Failure", data: "Error..." });
  }
};
/*
const unlikePost = async(req,res) =>{
    try {
        const postId = req.params.id;
        const findPost = await PostModel.findById(postId);
        if(findPost){
            const likesList = findPost.likes;
            const newLIke = {"users":req.user.id};
            let flag = false;
            likesList.map(e=>{
                if(e.users == req.user.id){
                    flag = true;
                }
            })
            if(!flag){
                findPost.likes.push(newLIke);
                await findPost.save();
            }
            return res.status(200).json({"status":"Success","data":[{"msg":"Post like success","data":findPost}]})
            console.log("Post Found");
        }
        else{
            return res.status(400).json({"status": "Failure","data":[{"msg": "No Post with such an Id in the System"}]})
        }
    } catch (error) {
        return res.status(500).json({"status":"Failure","data":"Error..."})
    }

}
*/

const commentPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const findPost = await PostModel.findById(postId);
    if (findPost) {
      const newComment = {
        users: req.user.id,
        description: req.body.description,
      };
      findPost.comments.push(newComment);
      await findPost.save();

      return res.status(200).json({
        status: "Success",
        data: [{ msg: "Post like success", data: findPost }],
      });
      console.log("Post Found");
    } else {
      return res.status(400).json({
        status: "Failure",
        data: [{ msg: "No Post with such an Id in the System" }],
      });
    }
  } catch (error) {
    return res.status(500).json({ status: "Failure", data: "Error..." });
  }
};

module.exports = {
  addpost,
  deletepost,
  modifypost,
  allpost,
  myposts,
  post,
  likePost,
  commentPost,
};
