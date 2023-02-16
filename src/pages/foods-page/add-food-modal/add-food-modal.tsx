import React, { useContext, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ReloadContext } from "../../../context/reload.context";
import { IAddFoodProps } from "../../../interfaces/foods.interfaces";
import { ICategory } from "../../../interfaces/categorys.interfaces";
import { getCategory, postFood } from "../../../services/api";
import { SelectChangeEvent } from "@mui/material/Select";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse } from "axios";

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

export const AddFoodModal: React.FC<IAddFoodProps> = (props) => {
  const { open, setOpen } = props;
  const [ctgs, setCtgs] = useState<ICategory[]>([]);
  const handleClose = () => setOpen(false);
  const [nameEmpty, setNameEmty] = useState<boolean>(false);
  const [costEmpty, setCostEmty] = useState<boolean>(false);
  const [ctgEmpty, setCtgEmty] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<number>();
  const [selectedCtg, setSelectedCtg] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCtgEmty(false);
    setSelectedCtg(event.target.value as string);
  };
  const { reload, setReload } = useContext(ReloadContext);

  useEffect((): void => {
    getCategory().then((data) => {
      setCtgs(data);
    });
  }, [reload]);

  const handlePostFood = (): void => {
    if (name !== "" && cost !== ("" || undefined) && selectedCtg !== "") {
      setReload(!reload);
      postFood(name, cost, selectedCtg)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            toast.success("Food yaratildi!");
          }
        })
        .finally(() => {
          setOpen(false);
          setReload(!reload);
          setName("");
          setCost(undefined);
          setSelectedCtg("");
        })
        .catch((err: AxiosError) => {
          if (err) {
            toast.error("Food yaratilmadi qayta urinib ko'ring!");
          }
        });
    } else {
      setNameEmty(true);
      setCostEmty(true);
      setCtgEmty(true);
    }
  };

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
              Добавить еду
            </Typography>
            <TextField
              error={nameEmpty ? true : false}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setNameEmty(false);
                setName(e.target.value);
              }}
              sx={{ mt: 2, width: "100%" }}
              id={nameEmpty ? "outlined-error" : "outlined-basic"}
              label={nameEmpty ? "Введите значение" : "Напишите название еды"}
              variant="outlined"
            />
            <TextField
              error={costEmpty ? true : false}
              type="number"
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setCostEmty(false);
                setCost(+e.target.value);
              }}
              sx={{ my: 2, width: "100%" }}
              id={costEmpty ? "outlined-error" : "outlined-basic"}
              label={costEmpty ? "Введите значение" : "Напишите стоимость еды"}
              variant="outlined"
            />
            <FormControl sx={{ mb: 2 }} fullWidth>
              <InputLabel
                id={
                  ctgEmpty
                    ? "demo-simple-select-error-label"
                    : "demo-simple-select-label"
                }
              >
                {ctgEmpty ? "Введите значение" : "Выберите категорию еды"}
              </InputLabel>
              <Select
                error={ctgEmpty ? true : false}
                labelId={
                  ctgEmpty
                    ? "demo-simple-select-error-label"
                    : "demo-simple-select-label"
                }
                id={
                  ctgEmpty ? "demo-simple-select-error" : "demo-simple-select"
                }
                value={selectedCtg}
                label="Age"
                onChange={handleChange}
              >
                {ctgs &&
                  ctgs.map((c, i) => {
                    return (
                      <MenuItem key={i + 1} value={c._id}>
                        {c.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <Button
              onClick={handlePostFood}
              sx={{ width: "100%" }}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Добавить еду
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
