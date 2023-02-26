import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IOrder, IOrdersProps } from "../../../interfaces/orders.interfaces";
import { IPerson } from "../../../interfaces/users.interfaces";
import { useContext, useEffect, useState } from "react";
import { ReloadContext } from "../../../context/reload.context";
import { getFoods, getUsers } from "../../../services/api";
import { IFood } from "../../../interfaces/foods.interfaces";

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

export const OrdersTable: React.FC<IOrdersProps> = (props) => {
  const orders: IOrder[] = props.orders as any;
  const [users, setUsers] = useState<IPerson[]>([]);
  const [myFoods, setMyFoods] = useState<IFood[]>([]);
  const { reload } = useContext(ReloadContext);

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, [reload]);

  useEffect(() => {
    getFoods().then((data) => setMyFoods(data));
  }, []);


  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell>Order</StyledTableCell>
              <StyledTableCell>Total Cost</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order, index) => (
              <StyledTableRow key={order._id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>
                  {
                    order.user?.fullname
                  }
                </StyledTableCell>
                <StyledTableCell>
                  {
                    <details>
                      <summary>Order foods</summary>
                      <ul>
                        {
                          order.foods.map((f) => myFoods.filter(mf => mf._id===f._id).map(fff => {
                            return (
                              <li>
                                { fff.name + " " + f.count + " ta" }
                              </li>
                            )
                          }))
                        }
                      </ul>
                    </details>
                  }
                </StyledTableCell>
                <StyledTableCell>
                  {order.total_cost}
                </StyledTableCell>
                <StyledTableCell>
                  <span style={{ 
                    background: order.is_given === true ? "green" : order.is_canceled === true ? "red" : "cyan",
                    color: order.is_given === true ? "white" : order.is_canceled === true ? "white" : "black",
                    padding: "3px 4px",
                    borderRadius: "4px"
                    }}>
                    { 
                      order.is_given === true ? "Сделанный" : order.is_canceled === true ? "Отменено" : "В ожидании"
                    }
                  </span>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};