import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import "../Dashboard/alert.css";

export default function Alert({
  title,
  contentText,
  btnText,
  ModalHandlerClose,
}) {
  return (
    <Dialog aria-labelledby="simple-dialog-title" open={true}>
      <div className="dashboard-alert">
      <DialogTitle><span className="dashboard-popup-title">{title}</span></DialogTitle>
      <DialogContent>
        <DialogContentText><p className="dashboard-popup-content">{contentText}</p></DialogContentText>
      </DialogContent>
      <DialogActions style={{ alignSelf: "center", cursor: "pointer" }}>
        <span onClick={() => ModalHandlerClose()} className="cta">
          {btnText}
        </span>
      </DialogActions>
      </div>
    </Dialog>
    
  );
}
