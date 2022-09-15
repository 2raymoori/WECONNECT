const express = require("express");
const { check } = require("express-validator/check");
const authenticate = require("../../MiddleWare/auth");
const {
  addpost,
  deletepost,
  modifypost,
  allpost,
  myposts,
  post,
  likePost,
  commentPost,
} = require("../../CONTROLLERS/PostCtrl");
const Router = express.Router();
Router.get("/allPosts", authenticate, allpost);
Router.get("/myposts", authenticate, authenticate, myposts);
Router.get("/post/:id", authenticate, post);
Router.post(
  "/add",
  [
    [
      check("description", "Sorry Description is required").not().isEmpty(),
      check("title", "Sorry Title is required").not().isEmpty(),
    ],
    authenticate,
  ],
  addpost
);
Router.delete("/:id", authenticate, deletepost);
Router.put("/:id", authenticate, modifypost);
Router.put("/:id/like", authenticate, likePost);

Router.put(
  "/:id/comment",
  [
    [check("description", "Sorry Description is Required").not().isEmpty()],
    authenticate,
  ],
  commentPost
);

module.exports = Router;

// {
//   "status": "Success",
//   "data": [
//     {
//       "msg": "Post Successfully added",
//       "data": {
//         "user": "62dd610e3281a0af9054ed8a",
//         "title": "LOT",
//         "description": "LOT Post",
//         "_id": "630248f41ade0d58580c4874",
//         "likes": [],
//         "comments": [],
//         "postDate": "2022-08-21T15:02:12.956Z",
//         "__v": 0
//       }
//     }
//   ]
// }
