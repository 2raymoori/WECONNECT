import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import {addComment} from "../../Actions/Post"

const Comment = (props) => {
  const [show, setShow] = useState(props.commentFlag);
  const [commentContent,setCommentContent] = useState("");

  const handleClose = () => {
    props.hidePost();
    setCommentContent("");
  };
  const handleCommentAdd = ()=>{
    props.addComment(props.postId,commentContent);
    props.updateCommentCount(true);
    setCommentContent("");
  }
  const captureText = (e)=>{
    setCommentContent(e.target.value)
  }
  const handleShow = () => props.commentPostFlag();

  return (
    <>
      <Modal show={props.commentFlag} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Comment / Contribution</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comment Content</Form.Label>
              <Form.Control
                as="textarea"
                value={commentContent}
                onChange={captureText}
                placeholder={props.postId}
                text="Lamin O. Touray"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel Comment
          </Button>
          <Button variant="primary" onClick={handleCommentAdd}>
            Post Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default connect(null,{addComment})(Comment)
// addComment
