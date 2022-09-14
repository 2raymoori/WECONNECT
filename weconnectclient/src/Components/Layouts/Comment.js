import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Comment = (props) => {
  const [show, setShow] = useState(props.commentFlag);

  const handleClose = () => {
    props.hidePost();
  };
  const handleShow = () => props.commentPostFlag();

  return (
    <>

      <Modal show={props.commentFlag} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Comment / Contribution</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comment Content</Form.Label>
              <Form.Control
                as="textarea"
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
          <Button variant="primary" onClick={handleClose}>
            Post Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Comment;
