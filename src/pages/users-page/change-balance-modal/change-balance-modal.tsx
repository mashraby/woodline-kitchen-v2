import React, { useContext, useState } from "react";
import { TextField, Typography, Button, Modal, Box } from "@mui/material";
import { IOpenModalProps } from "../../../interfaces/users.interfaces";
import { postBalance } from "../../../services/api";
import { ReloadContext } from "../../../context/reload.context";
import { toast } from "react-toastify";

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

export const BasicModal: React.FC<IOpenModalProps> = (props) => {
  const { setOpen, open, text, userId, balance } = props;
  const handleClose = () => setOpen(false);
  const [changeBalance, setChangeBalance] = useState<number>();
  const { reload, setReload } = useContext(ReloadContext);

  const handleChangeBalance = (): void => {
    setReload(!reload);
    postBalance(userId, changeBalance, true)
      .then((res) => console.log(res))
      .finally((): void => {
        setOpen(false);
        setReload(!reload);
        toast.success("Balance qo'shildi");
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ mb: 1.5 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {"Fullname: " + text}
          </Typography>
          <Typography
            sx={{ mb: 1.5 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {"Balance: " + balance}
          </Typography>
          <TextField
            required={true}
            type="number"
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ): void => {
              setChangeBalance(+e.target.value);
            }}
            sx={{ width: 1, mb: 1.5 }}
            id="outlined-basic"
            label="Add balance"
            variant="outlined"
          />
          <Button
            onClick={handleChangeBalance}
            sx={{ width: 1 }}
            variant="outlined"
          >
            Add balance
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
