import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Link } from "react-router-dom";

export default function SubscriptionAlert({
  registered,
  handleSubscriptionAlert,
  showOneTimeSubPopUp,
  handleCancelPopUp,
  postObject,
  onlyDemographic,
  takeToSub,
  alertMessage,
}) {
  const [show, setShow] = useState(true);
  function handleOneTimeSubscribe() {
    handleSubscriptionAlert();
    showOneTimeSubPopUp();
  }
  function handleCancel(state) {
    handleSubscriptionAlert();
    handleCancelPopUp(state);
  }
  //href="https://merd.online/login/"
  function handleLogin() {
    //selections made are stored in cookie, user do not have to make selecttions after logging in
    if (!postObject.hasOwnProperty("type"))
      localStorage.setItem("selectionsMade", JSON.stringify(postObject));
    //in end the window is redirected to login page (php)
    window.location.href = "https://merd.online/login/";
  }

  let message = onlyDemographic
    ? "We see you are only subscribed to only demographic. You can subscribe to all products to view more data. "
    : "We see you have chosen a different city / category from what you have subscribed to. You have the following options";

  let title = onlyDemographic
    ? "Not subscribed to All Products"
    : "Not Subscribed to selected Categories.";
  if (alertMessage) {
    message = alertMessage.message;
    title = alertMessage.title;
  }

  function handleSubscribe() {
    if (alertMessage) {
      takeToSub();
      setShow(false);
    } else {
      window.location.href = "/subscribe-more";
    }
  }

  return (
    <>
      {registered ? (
        <div>
          {" "}
          <Dialog aria-labelledby="simple-dialog-title" open={show}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions style={{ alignSelf: "center", cursor: "pointer" }}>
              <span className="cta" onClick={handleSubscribe}>
                Subscribe
              </span>
              <span className="cta" onClick={handleOneTimeSubscribe}>
                Try one time
              </span>
              <span onClick={() => handleCancel(true)} className="cta">
                Cancel
              </span>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <div>
          {" "}
          <Dialog aria-labelledby="simple-dialog-title" open={true}>
            <div className="dashboard-alert">
              <DialogTitle>
                <h2 className="registeration-required-title">
                  Registeration Required
                </h2>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <h4 className="registeration-required-content" align="center">
                    You need to subscribe to view data.
                  </h4>
                </DialogContentText>
              </DialogContent>
              <DialogActions style={{ alignSelf: "center", cursor: "pointer" }}>
                <div className="registration-required-buttons">
                  <Link
                    className="registration-required-btn-subscribe"
                    to="subscribe"
                  >
                    <span className="cta">Subscribe</span>
                  </Link>
                  <a
                    className="registration-required-btn-subscribe"
                    onClick={handleLogin}
                  >
                    <span className="cta">Login</span>
                  </a>
                  <span className="cta" onClick={() => handleCancel(false)}>
                    Cancel
                  </span>
                </div>
              </DialogActions>
            </div>
          </Dialog>
        </div>
      )}
    </>
  );
}
