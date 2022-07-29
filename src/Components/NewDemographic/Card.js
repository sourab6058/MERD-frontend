import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import axios from "axios";

const API_URL = "https://data.merd.online:8000/demographic/";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: "20vw",
    margin: "20px",
  },
});

function downloadBlob(blob, name) {
  // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
  const blobUrl = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");

  // Set link's href to point to the Blob URL
  console.log(blobUrl);
  link.href = blobUrl;
  link.download = name;

  // Append link to the body
  document.body.appendChild(link);

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );

  // Remove link from body
  document.body.removeChild(link);
}

function handleDownload(table_id, filename) {
  axios
    .get(`${API_URL}?id=${table_id}`, {
      responseType: "blob",
    })
    .then((res) => {
      // const blob = new Blob([res.data], { type: "application/pdf" });
      // this.downloadBlob(blob, "test.pdf");
      console.log(res);
      downloadBlob(res.data, filename);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleSubscribe() {
  window.location.href = "/subscribe-more/";
}

export default function MediaCard({ data }) {
  const classes = useStyles();
  console.log(data);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.city}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            City:{data.city}
            <br />
            Type:{data.type}
            <br />
            Mode:{data.mode}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {data.subscribedCity && data.registeredUser ? (
          <Button
            size="medium"
            color="primary"
            onClick={() =>
              handleDownload(
                data.table_id,
                `${data.city}_by_${data.mode}_by_${data.type}`
              )
            }
          >
            Download
          </Button>
        ) : (
          <>
            <Button
              size="medium"
              color="primary"
              onClick={data.showOneTimeSubPopUp}
            >
              Buy One Time
            </Button>
            <Button size="medium" color="primary" onClick={handleSubscribe}>
              Subscribe
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}
