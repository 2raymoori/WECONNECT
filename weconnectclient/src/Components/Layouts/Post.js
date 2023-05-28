import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { createPost } from "../../Actions/Post";
import CommentList from "./CommentDisplay";
import DeletePost from "../DeletePost";

const Post = (props) => {
  const [comment, setComment] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [post, setPost] = useState({pId:0,owner:"",title:"",content:""});
  const [commentListFlag, setCommentListFlag] = useState(false);

  const handleFormData = (e) => {
    setComment(e.target.value);
  };
  const handleFormDataTitle = (e) => {
    setPostTitle(e.target.value);
  };
  const submitForm = (e) => {
    e.preventDefault();
    props.createPost(postTitle, comment);
  };
  const updatePost = (id,owner,content,title)=>{
    setPost({pId:id,owner:owner,title,content:content});
    setCommentListFlag(true);
  }
  return (
    <div>
      {post.pId === 0? (null):( <CommentList commentFlag={commentListFlag} hidePost={setCommentListFlag} postList={props.posts.otherPosts} post={post} />)}
      <h1 class="large text-primary">Posts</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Welcome to the community!
      </p>

      <div class="post-form">
        <div class="bg-primary text-center p rounded-5">
          <h3>Say / Ask Something Something...</h3>
        </div>
        <form onSubmit={submitForm} className="form mb-5">
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
          <div className="d-grid gap-2 col-6 mx-auto">
            <input type="submit" className="btn btn-outline-success  my-1" value="Submit"/>
          </div>
        </form>
      </div>

      <div class="posts">
        {props.posts.curUserPost.map((e) => {
          return (
            <div class="post bg-white p-1 my-1 shadow p-3 mb-5 bg-body rounded">
              <div></div>
              <div>
                <p>
                  <i>
                    <b>
                      <u>{e.title}</u>
                    </b>
                  </i>
                </p>
                <p class="my-1">{e.description}</p>
                <p class="post-date">Posted on 04/16/2019ss</p>
                <button type="button" class="btn btn-light">
                  <i class="fas fa-thumbs-up"></i>
                  <span>{e.likes.length}</span>
                </button>
                <button type="button" class="btn btn-light">
                  <i class="fas fa-thumbs-down"></i>
                </button>
                <button onClick={()=>{updatePost(e._id,e.user.firstName,e.description,e.title)}}  class="btn btn-primary">
                  Discussion{" "}
                  <span class="comment-count">{e.comments.length}</span>
                </button>
                {/*/// bring back delete button*/}
                <DeletePost postId={e._id}/>
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
