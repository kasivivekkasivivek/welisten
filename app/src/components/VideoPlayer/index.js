
import { Component } from "react";
import {Modal,Button} from "react-bootstrap"
import React from "react";
import "./videoPlayer.css"

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Guide To Our Application
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <iframe width="100%" height="350" src="https://www.youtube.com/embed/e11Mzy2kYnY" 
        title="YouTube video player" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function VideoPlayer() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <button className="animated-button3 animated-button1" onClick={() => setModalShow(true)}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    App Guide
      </button>
      

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default VideoPlayer;