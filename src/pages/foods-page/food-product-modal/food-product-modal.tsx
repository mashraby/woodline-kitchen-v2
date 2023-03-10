import React, { useContext, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { TextField, Typography } from "@mui/material";
import { ReloadContext } from "../../../context/reload.context";
import { IAddFoodProductProps } from "../../../interfaces/foods.interfaces";

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

export const AddFoodProductModal: React.FC<IAddFoodProductProps> = (props) => {
  const { prodOpen, setProdOpen } = props;
  const handleClose = () => setProdOpen(false);

  const { reload, setReload } = useContext(ReloadContext);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={prodOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={prodOpen}>
          <Box sx={style}>
            <Typography
              sx={{ textAlign: "center" }}
              variant="h4"
              component="div"
            >
              Добавить продукт
            </Typography>

            <TextField
              sx={{ my: 3 }}
              fullWidth
              variant="outlined"
              id="outlined-basic"
              label="Введите название продукта"
              type="text"
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              variant="outlined"
              id="outlined-basic"
              label="Введите стоимость продукта"
              type="number"
            />

            <Button
              sx={{ width: "100%" }}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Добавить продукт
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
