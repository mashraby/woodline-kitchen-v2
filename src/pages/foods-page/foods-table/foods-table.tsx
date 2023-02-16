import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IFood, IFoodProps } from "../../../interfaces/foods.interfaces";
import { useContext, useEffect, useState } from "react";
import { getCategory } from "../../../services/api";
import { ICategory } from "../../../interfaces/categorys.interfaces";
import { ReloadContext } from "../../../context/reload.context";

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

export const FoodsTable: React.FC<IFoodProps> = (props) => {
  const foods: IFood[] = props.foods as any;
  const [ctgs, setCtgs] = useState<ICategory[]>([]);
  const { reload } = useContext(ReloadContext);

  useEffect((): void => {
    getCategory().then((data) => setCtgs(data));
  }, [reload]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Food Name</StyledTableCell>
              <StyledTableCell>Food Cost</StyledTableCell>
              <StyledTableCell>Food Category</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foods &&
              foods.map((food, index) => {
                return (
                  <StyledTableRow key={food._id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell>{food.name}</StyledTableCell>
                    <StyledTableCell>{food.cost}</StyledTableCell>
                    <StyledTableCell>
                      {ctgs.find((c) => c._id === food.category)?.name}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
