import React,{useState,Fragment} from 'react';
import Comment from "../Layouts/Comment";

const DiscussionBtn = ({pId,commentTrackCount})=>{
	const [commentCount,setCommentCount] = useState(commentTrackCount);
  const [commentFlag, setCommentFlag] = useState(false);
  const [postId, setPostId] = useState(2130);
  const hidePost = () => {
    setCommentFlag(false);
  };
  const updateCommentCount = (flag)=>{
                    if(commentTrackCount == 0 && commentCount == 0){
                      setCommentCount(1)
                    }
                    else if(commentTrackCount != 0 && commentCount == 0){
                      setCommentCount(commentTrackCount+1);
                    }else{
                      setCommentCount(commentCount+1);
                    }

  }
  const commentPostFlag = (id) => {
    setPostId(id);
    setCommentFlag(!commentFlag);
  };
	return(
            <Fragment>
             <Comment hidePost={hidePost} updateCommentCount={updateCommentCount} commentFlag={commentFlag} postId={postId} />
                <button
                  onClick={() => {
                    commentPostFlag(pId);
                  }}
                  class="btn btn-primary"
                >
                  Comment{" "}
                  <span class="comment-count">{commentCount}</span>
                </button>
                </Fragment>

		)
}
export default DiscussionBtn;
