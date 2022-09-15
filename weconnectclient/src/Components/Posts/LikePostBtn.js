import React,{useState,Fragment} from 'react';

const LikePostBtn = ({postId,likePost,e})=>{
	const [likeCount,setLikeCount] = useState(0);
	return(
		<Fragment>
		
                <button
                  onClick={() => {
                    likePost(postId);
                    if(e.likes.length == 0 && likeCount == 0){
                    	setLikeCount(1)
                    }
                    else if(e.likes.length != 0 && likeCount == 0){
                    	setLikeCount(e.likes.length+1);
                    }else{
                    	setLikeCount(likeCount+1);
                    }
                  }}
                  type="button"class="btn btn-light">
                  <i class="fas fa-thumbs-up"></i>
                  <span>{likeCount ==0 ? e.likes.length : likeCount}</span>
                </button>
		</Fragment>
		)
}
export default LikePostBtn;