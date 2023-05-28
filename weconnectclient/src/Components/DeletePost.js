import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import {addComment,deletePost} from "../Actions/Post"


const DeletePost = (props) => {
    const [show, setShow] = useState(false);


    const handleCommentAdd = ()=>{
        // props.addComment(props.postId,commentContent);
        // props.updateCommentCount(true);
        // setCommentContent("");
    }
    const handleShow = () => {
        setShow(true)
    };
    const handleClose = () => setShow(false);
    const confirmDelete = ()=>{
        props.deletePost(props.postId);
        // props.deletePost(props.postId);
        handleClose();
        // props.hidePost();
    }

    return (
        <>

            <button onClick={handleShow} type="button" className="btn btn-danger">
                <i className="fas fa-times"></i>
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2>Are you sure you want to delete this Post?</h2>
                    <div>

                        <button onClick={handleClose} className={'btn btn-primary'}>Cancel</button>
                        <button onClick={confirmDelete} className={'btn btn-danger'}>Confirm</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};
export default connect(null,{deletePost})(DeletePost)
// addComment
