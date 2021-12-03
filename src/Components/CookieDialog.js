import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

export default function Alert({ handleClose }) {
  return (
    <Dialog aria-labelledby="simple-dialog-title" open={true}>
      <DialogTitle>Cookies</DialogTitle>
      <DialogContent>
        <DialogContentText>Cookies</DialogContentText>
      </DialogContent>
      <DialogActions
        style={{ alignSelf: "center", cursor: "pointer" }}
        onClick={handleClose}
      >
        <span className="cta" style={{ fontSize: "1rem" }}>
          Accept Cookies
        </span>
        <span
          onClick={handleClose}
          className="cta"
          style={{ fontSize: "1rem", backgroundColor: "white", color: "blue" }}
        >
          Decline Cookies
        </span>
      </DialogActions>
    </Dialog>
  );
}
