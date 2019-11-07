import React from "react";
import { MDBContainer, MDBAlert } from 'mdbreact';

const Alert = () => {
    return (
      <MDBAlert color="warning" dismiss>
        <strong>Hello Guest!</strong> Try out this DEMO!
      </MDBAlert>
    );
  };
  
  export default Alert;