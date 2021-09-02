import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

export default function Alert({
  title,
  contentText,
  btnText,
  ModalHandlerClose,
}) {
  return (
    <Dialog aria-labelledby="simple-dialog-title" open={true}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions style={{ alignSelf: "center", cursor: "pointer" }}>
        <span onClick={() => ModalHandlerClose()} className="cta">
          {btnText}
        </span>
      </DialogActions>
    </Dialog>
  );
}
