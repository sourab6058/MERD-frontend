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
          MERD only has essential cookies! Everything is encrypted and nothing
          is shared with any third party! Essential cookies are, well,
          essential, so we need to have them.
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ alignSelf: "center", cursor: "pointer" }}>
        <span
          className="cta"
          style={{ fontSize: "1rem" }}
          onClick={() => handleClose(true)}
        >
          Okay
        </span>
      </DialogActions>
    </Dialog>
  );
}
