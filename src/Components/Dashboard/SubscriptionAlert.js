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
}) {
  function handleOneTimeSubscribe() {
    handleSubscriptionAlert();
    showOneTimeSubPopUp();
  }
  function handleCancel() {
    handleSubscriptionAlert();
    handleCancelPopUp(true);
  }
  return (
    <>
      {registered ? (
        <div>
          {" "}
          <Dialog aria-labelledby="simple-dialog-title" open={true}>
            <DialogTitle>Not Subscribed to selected Categories.</DialogTitle>
            <DialogContent>
              <DialogContentText>
                We see you have chosen a different city / category from what you
                have subscribed to. You have the following options
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{ alignSelf: "center", cursor: "pointer" }}>
              <Link className="cta" to="subscribe">
                Subscribe
              </Link>
              <span className="cta" onClick={handleOneTimeSubscribe}>
                Try one time
              </span>
              <span onClick={handleCancel} className="cta">
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
            <DialogTitle><h2 className="registeration-required-title">Registeration Required</h2></DialogTitle>
            <DialogContent>
              <DialogContentText>
                <h4 className="registeration-required-content" align="center">You need to subscribe to view data.</h4>
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{ alignSelf: "center", cursor: "pointer" }}>
              <div className="registration-required-buttons">
              <Link className="registration-required-btn-subscribe" to="subscribe" >
               <span className="cta">Subscribe</span>
              </Link>
              <a
                href="https://hosting.digifyworks.com/merd/subscription-process-cancel/"
                href="https://merd.online/subscription-process-cancel/"
                
              >
              <span className="cta">Cancel</span>
              </a>
              </div>
            </DialogActions>
            </div>
          </Dialog>
        </div>
      )}
    </>
  );
}
