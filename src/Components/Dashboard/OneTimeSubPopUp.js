import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

export default function OneTimeSubPopUp({ hideOneTimeSubPopUp }) {
  return (
    <div>
      <Dialog aria-labelledby="simple-dialog-title" open={true}>
        <DialogTitle>Buy as one off data.</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h4 align="center">
              Thank You. We will get back to you within six hours
            </h4>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ alignSelf: "center", cursor: "pointer" }}>
          <span className="cta" onClick={hideOneTimeSubPopUp}>
            Great!
          </span>
        </DialogActions>
      </Dialog>
    </div>
  );
}
