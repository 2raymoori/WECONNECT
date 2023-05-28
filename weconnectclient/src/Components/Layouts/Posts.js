import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { loadOtherPosts, likePost } from "../../Actions/Post";
import { Alert } from "react-bootstrap";
import Comment from "./Comment";
import LikePostBtn from '../../Components/Posts/LikePostBtn'
import DiscussionBtn from '../../Components/Posts/DiscussionBtn'
import CommentList from "./CommentDisplay";

const Posts = (props) => {
  useEffect(() => {
    console.log(props.posts.otherPosts);
  });

  const likePost = (inputPostId) => {
    props.likePost(inputPostId);
  };

  const hidePost = () => {
    setCommentFlag(false);
  };


  const commentPostFlag = (id) => {
    // setPostId(id);
    setCommentFlag(!commentFlag);
  };
    const [commentFlag, setCommentFlag] = useState(false);
    const [commentListFlag, setCommentListFlag] = useState(false);
  const [post, setPost] = useState({pId:0,owner:"",title:"",content:""});

  const updatePost = (id,owner,content,title)=>{
    setPost({pId:id,owner:owner,title,content:content});
    setCommentListFlag(true);
  }
  return (
    <div>
        {post.pId === 0? (null):( <CommentList commentFlag={commentListFlag} hidePost={setCommentListFlag} postList={props.posts.otherPosts} post={post} />)}
      <Comment hidePost={hidePost} commentFlag={commentFlag}   />
      <h1 class="large text-primary">Posts</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Welcome to the community!
      </p>

      <div class="posts">
        {props.posts.otherPosts.map((e) => {
          return (
            <div class="post bg-white p-1 my-1 shadow p-3 mb-5 bg-body rounded">
              <div>
                <a href="profile.html">
                  <img
                    class="round-img"
                    src={e.user.profileImg? `http://localhost:5001/pImages/${e.user.profileImg}`:"https://ionicframework.com/docs/img/demos/avatar.svg"}
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
                <p class="post-date"><b>Posted on:</b> {e.postDate.split("T")[0]}</p>

                <LikePostBtn postId={e._id} likePost={likePost} e={e} />

                <button type="button" class="btn btn-light">
                  <i class="fas fa-thumbs-down"></i>
                </button>
                <DiscussionBtn pId = {e._id} commentTrackCount={e.comments.length} />
                  <button onClick={()=>{updatePost(e._id,e.user.firstName,e.description,e.title)}} className={"btn btn-primary"}> &nbsp;&nbsp;
                     View Comments
                  </button >

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
