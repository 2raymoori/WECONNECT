import { connect } from "react-redux";
import React, { useEffect } from "react";
import { loadOtherPosts } from "../../Actions/Post";
const Posts = (props) => {
  useEffect(() => {
    console.log(props.posts);
  });
  return (
    <div>
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

export default connect(mapStateToProps, { loadOtherPosts })(Posts);
