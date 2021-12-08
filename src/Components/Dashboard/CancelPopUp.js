import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

export default function CancelPopUp({ handleCancelPopUp }) {
  return (
    <div>
      <Dialog aria-labelledby="simple-dialog-title" open={true}>
        <DialogTitle>We are here for you.</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h4 align="center">
              We understand you do not want to subscribe or buy as one off data.
              We will see what we can do for you in this instance
            </h4>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ alignSelf: "center", cursor: "pointer" }}>
          <span className="cta" onClick={() => handleCancelPopUp(false)}>
            Okay
          </span>
        </DialogActions>
      </Dialog>
    </div>
  );
}
