import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { createPost } from "../../Actions/Post";

const Post = (props) => {
  const [comment, setComment] = useState("");
  const [postTitle, setPostTitle] = useState("");

  const handleFormData = (e) => {
    setComment(e.target.value);
  };
  const handleFormDataTitle = (e) => {
    setPostTitle(e.target.value);
  };
  const submitForm = (e) => {
    e.preventDefault();
    console.log(`Post Title: ${postTitle}`);
    console.log(`Post Description: ${comment}`);
    props.createPost(postTitle, comment);
  };
  return (
    <div>
      <h1 class="large text-primary">Posts</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Welcome to the community!
      </p>

      <div class="post-form">
        <div class="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form onSubmit={submitForm} class="form my-1">
          <div className="form-group">
            <input
              type="text"
              value={postTitle}
              onChange={handleFormDataTitle}
              placeholder="Post Title"
              name="postTitle"
              required
            />
          </div>

          <textarea
            onChange={handleFormData}
            name="comment"
            value={comment}
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      <div class="posts">
        {props.posts.curUserPost.map((e) => {
          return (
            <div class="post bg-white p-1 my-1">
              <div>
                <a href="profile.html">
                  <img
                    class="round-img"
                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                    alt=""
                  />
                  <h4>John Doe</h4>
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
                <button type="button" class="btn btn-light">
                  <i class="fas fa-thumbs-up"></i>
                  <span>{e.likes.length}</span>
                </button>
                <button type="button" class="btn btn-light">
                  <i class="fas fa-thumbs-down"></i>
                </button>
                <a href="post.html" class="btn btn-primary">
                  Discussion{" "}
                  <span class="comment-count">{e.comments.length}</span>
                </a>
                <button type="button" class="btn btn-danger">
                  <i class="fas fa-times"></i>
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
export default connect(mapStateToProps, { createPost })(Post);
