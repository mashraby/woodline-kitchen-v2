import React, { useContext, useEffect, useState } from "react";
import { MiniDrawer } from "../../components/sidebar/sidebar";
import { ReloadContext } from "../../context/reload.context";
import { IPerson } from "../../interfaces/users.interfaces";
import { getUsers } from "../../services/api";
import { UsersTable } from "./users-table/users-table";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { AddUserModal } from "./add-user-modal/add-user-modal";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
`;

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<IPerson[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { reload } = useContext(ReloadContext);

  useEffect((): void => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, [reload]);

  return (
    <>
      <AddUserModal open={open} setOpen={setOpen} />
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, px: 3, py: 12 }}>
          <FlexWrapper>
            <Typography variant="h4" component="h2">
              Пользователи
            </Typography>
          </FlexWrapper>
          <UsersTable users={users} />
        </Box>
      </Box>
    </>
  );
};
