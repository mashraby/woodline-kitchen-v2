import React, { useContext, useState, useEffect } from "react";
import { TextField, Typography, Button, Modal, Box } from "@mui/material";
import { IOpenModalUserProps } from "../../../interfaces/users.interfaces";
import { getRoles } from "../../../services/api"
import { IRole } from "../../../interfaces/roles.interfaces";
import { ReloadContext } from "../../../context/reload.context";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

import { toast } from "react-toastify";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

export const BasicModalUser: React.FC<IOpenModalUserProps> = (props) => {
  const { setOpenUser, openUser, text, userId, userRole } = props;
  const handleClose = () => setOpenUser(false);
  const [empty, setEmpty] = useState<boolean>(false);
  const [changeUserName, setChangeUserName] = useState<string>(text);
  const { reload, setReload } = useContext(ReloadContext);
  const [newRole, setNewRole] = useState<string>('');
  const [roles, setRoles] = useState<IRole[]>([]);


  useEffect((): void => {
    getRoles().then((data) => {
      setRoles(data)
    });
  }, [reload]);

  const handleChange = (event: SelectChangeEvent):void => {
    setNewRole(event.target.value as string);
  };

  const handleChangeUser = (): void => {
    if(newRole == "" || changeUserName == "") {
      setEmpty(true);
    }else {
      console.log(newRole, changeUserName);
    }
  };

  return (
    <div>
      <Modal
        open={openUser}
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
          {/* <TextField
            error={empty ? true : false}
            required={true}
            type="text"
            defaultValue={text}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ): void => {
              setEmpty(false);
              setChangeUserName(e.target.value);
            }}
            sx={{ width: 1, mb: 1.5 }}
            id={empty ? "outlined-error" : "outlined-basic"}
            label={empty ? "Введите новое имя пользователя" : "Новое имя пользователя"}
            variant="outlined"
          /> */}

          <FormControl sx={{ mb: 1.5 }} fullWidth>
            <InputLabel id="demo-simple-select-label">{!newRole ? roles?.find(e => e._id === userRole)?.title : "Роль"}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newRole}
              label="Роль"
              defaultValue={roles?.find(e => e._id === userRole)?._id}
              required={true}
              onChange={handleChange}
            >
              {
                roles && roles.map(value => {
                  return <MenuItem key={value._id} value={value._id}>
                    {value.title}
                  </MenuItem>
                })
              }

              {/* <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
          <Button
            onClick={handleChangeUser}
            sx={{ width: 1 }}
            variant="contained"
            endIcon={<ChangeCircleIcon />}
          >
            Изменить пользователя
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
