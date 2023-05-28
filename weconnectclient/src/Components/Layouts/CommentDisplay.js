import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import {addComment} from "../../Actions/Post"

const CommentList = (props) => {
    // const [show, setShow] = useState(props.commentFlag);
    const [commentContent,setCommentContent] = useState([]);

    const handleClose = () => {
        props.hidePost();
        console.log(commentContent);
        // setCommentContent("");
    };
    const filterComment = (postId)=>{
    for(let i=0;i<props.postList.length;i++){
        if(props.postList[i]._id === postId){
            return props.postList[i].comments;
        }
    }
    }
    const displayComment = ()=>{
        let commentList = filterComment(props.post.pId);
        console.log(commentList);
        return commentList.map((comment)=>{
            return (
                <div className={"p-1 m-2 rounded-3 bg-secondary bg-gradient"}>
                    <p className={"text-white fw-bold"}>{comment.description}</p>
                </div>
            )
        })
    }



    return (
        <>
            <Modal show={props.commentFlag} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{`${props.post.owner}'s Post`}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={"bg-white"}>
                    <div className={"text-center rounded p-1 border border-secondary"}>
                        <h6><u><i>{props.post.title}</i></u></h6>
                        <p >{props.post.content}</p>
                    </div>
                    {
                        displayComment()
                    }

                </Modal.Body>

            </Modal>
        </>
    );
};
export default connect(null,{addComment})(CommentList)
// addComment
