import { useContext, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { TextField, Typography } from "@mui/material";
import { IDeedlineModalProps } from "../../../interfaces/deedline.interface";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ChangeDeedModal: React.FC<IDeedlineModalProps> = (props) => {
  const { open, setOpen } = props;
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              sx={{ textAlign: "center" }}
              variant="h4"
              component="div"
            >
              Редактировать
            </Typography>
            <TextField
              required={true}
              
              sx={{ my: 2, width: "100%" }}
              id={"outlined-basic"}
              label={"Редактировать"}
              variant="outlined"
            />
            <Button
              sx={{ width: "100%" }}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Редактировать
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
