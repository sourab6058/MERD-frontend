import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

export default function Alert({ handleClose, open }) {
  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle>
        <h2>COOKIES 🍪</h2>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <h3>Accept Cookies?</h3>
          MERD only stores essential cookies to enhance user experience, these
          cookies stored are encrypted and not shared outside the MERD.
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ alignSelf: "center", cursor: "pointer" }}>
        <span
          className="cta"
          style={{ fontSize: "1rem" }}
          onClick={() => handleClose(true)}
        >
          Accept Cookies
        </span>
        <span
          onClick={() => handleClose(false)}
          style={{
            fontSize: "1rem",
            backgroundColor: "white",
            color: "blue",
            marginLeft: "1rem",
          }}
        >
          Decline Cookies
        </span>
      </DialogActions>
    </Dialog>
  );
}
