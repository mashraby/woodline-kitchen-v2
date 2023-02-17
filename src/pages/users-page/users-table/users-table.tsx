import { useState } from "react";
import {
  IPerson,
  IRow,
  UsersTableProps,
} from "../../../interfaces/users.interfaces";
import { BasicModal } from "../change-balance-modal/change-balance-modal";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import accounting from "accounting";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const UsersTable: React.FC<UsersTableProps> = (props) => {
  const rows: IRow[] = [];
  const users: IPerson[] = props.users as any;
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [balance, setBalance] = useState<number>();

  users &&
    users.forEach((e, i) => {
      rows.push({
        id: i + 1,
        user_id: e._id,
        fullname: e.fullname,
        phone_number: e.phone_number,
        telegram_id: e.telegram_id,
        balance: e.balance,
      });
    });

  const handleRowClick = (user: IPerson): void => {
    setOpen(true);
    setText(user.fullname);
    setUserId(user._id);
    setBalance(user.balance);
  };

  return (
    <>
      <BasicModal
        open={open}
        setOpen={setOpen}
        text={text}
        userId={userId}
        balance={balance}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell>Telegram ID</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Balance</StyledTableCell>
              <StyledTableCell>Add Balance</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user, index) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>{user.fullname}</StyledTableCell>
                <StyledTableCell>{user.telegram_id}</StyledTableCell>
                <StyledTableCell>{user.phone_number}</StyledTableCell>
                <StyledTableCell>
                  {accounting.formatNumber(user.balance, 0, " ") + " so'm"}
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    onClick={() => handleRowClick(user)}
                    variant="outlined"
                  >
                    Добавить баланс
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
