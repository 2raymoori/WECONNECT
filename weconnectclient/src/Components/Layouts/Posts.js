import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { loadOtherPosts, likePost } from "../../Actions/Post";
import { Alert } from "react-bootstrap";
import Comment from "./Comment";
import LikePostBtn from '../../Components/Posts/LikePostBtn'

const Posts = (props) => {
  useEffect(() => {
    console.log(props.posts);
  });

  const likePost = (inputPostId) => {
    props.likePost(inputPostId);
  };

  const hidePost = () => {
    setCommentFlag(false);
  };

  const commentPostFlag = (id) => {
    setPostId(id);
    setCommentFlag(!commentFlag);
  };
  const [commentFlag, setCommentFlag] = useState(false);
  const [postId, setPostId] = useState(2130);

  return (
    // February 8th 2000
    <div>
      <Comment hidePost={hidePost} commentFlag={commentFlag} postId={postId} />
      <h1>Current #Posts: {props.posts.otherPosts.length}</h1>
      <h1 class="large text-primary">Posts</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Welcome to the community!
      </p>

      <div class="posts">
        {props.posts.otherPosts.map((e) => {
          return (
            <div class="post bg-white p-1 my-1">
              <div>
                <a href="profile.html">
                  <img
                    class="round-img"
                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                    alt=""
                  />
                  <h4>{e.user.firstName} {e.user.lastName}</h4>
                </a>
              </div>
              <div>
                <p>
                  <i>
                    <b>
                      <u>{e.title}</u>
                    </b>
                  </i>
                </p>
                <p class="my-1">{e.description}</p>
                <p class="post-date">Posted on 04/16/2019</p>
                <LikePostBtn postId={e._id} likePost={likePost} e={e} />
                <button type="button" class="btn btn-light">
                  <i class="fas fa-thumbs-down"></i>
                </button>
                <button
                  onClick={() => {
                    commentPostFlag(e._id);
                  }}
                  class="btn btn-primary"
                >
                  Discussion{" "}
                  <span class="comment-count">{e.comments.length}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  posts: state.postReducer,
});
export default connect(mapStateToProps, { loadOtherPosts, likePost })(Posts);
