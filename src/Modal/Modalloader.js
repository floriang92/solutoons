import React from "react";

import Button from "@material-ui/core/Button";
import ControlPointRoundedIcon from "@material-ui/icons/ControlPointRounded";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { useCallback } from "react";

import VideoDetail from "../Components/Youtube/VideoDetails";
import WarningTokens from "../Components/Tests/WarningTokens";

function ModalLoader(props) {

  ////////////////////////////////////////////////////Variables/////////////////////////////////////////////////////////////////

  const [modalTitle, setModalTitle] = React.useState('');
  const [openModal, setOpenModal] = React.useState(props.onlyModal ? props.onlyModal : false);
  const form = props.form;
  const [formComponent, setFormComponent] = React.useState(null);

  ////////////////////////////////////////////////////Fonctions/////////////////////////////////////////////////////////////////

  function handleClick() {
    setOpenModal(true);
  }

  const handleClose = useCallback(() => {
    setOpenModal(false);
    if (props.setClicked) {
      props.setClicked(false);
    }


  }, [props]
  );

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: "none",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    card: {
      outline: "none",
      width: "60%",
      backgroundColor: "#FFB703"
    },
    button: {
      marginBottom: theme.spacing(2),
      display: props.onlyModal ? "none" : "inline-flex",
      backgroundColor: "#F8F9FC",
      color: "#3f51b5",
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: "#fff"
      }
    },
    title: {
      backgroundColor: "#023047",
      color: "#FFB703"

    }
  }));

  ////////////////////////////////////////////////////Hooks/////////////////////////////////////////////////////////////////

  React.useEffect(() => {
    const whichForm = (form) => {
      switch (form) {
        case "load-video":
          setModalTitle(props.video.snippet.title);
          setFormComponent(<VideoDetail video={props.video} />);
          break;
        case "warning-tokens":
          setModalTitle("Attention !");
          setFormComponent(<WarningTokens />);
          break;
        default:
          break;
      }
    }
    if (form !== null) {
      whichForm(form);
    }
  }, [form, props, handleClose]);



  const classes = useStyles();

  ////////////////////////////////////////////////////Render/////////////////////////////////////////////////////////////////

  return (
    <div>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<ControlPointRoundedIcon />}
        onClick={() => handleClick()}

      >
        {modalTitle}
      </Button>
      <Modal
        className={classes.modal}
        open={openModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Fade in={openModal}>
          <Card className={classes.card}>
            <CardHeader
              title={
                <Typography
                  className={classes.title}
                  variant="h6"
                >
                  {modalTitle}

                </Typography>
              }
              className={classes.title}
            />
            <Divider />
            <CardContent>{formComponent}</CardContent>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalLoader;
