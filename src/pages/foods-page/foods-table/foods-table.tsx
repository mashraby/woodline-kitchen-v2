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
import { ICategory } from "../../../interfaces/categorys.interfaces";
import { ReloadContext } from "../../../context/reload.context";
import { Button } from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { ChangeFoodModal } from "../change-price-modal/change-price-modal";
import { getCategory } from "../../../services/api";

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
  const [changeOpen, setChangeOpen] = useState<boolean>(false);
  const [oldCost, setOldCost] = useState<number>();
  const { reload } = useContext(ReloadContext);

  useEffect((): void => {
    getCategory().then((data) => setCtgs(data));
  }, [reload]);

  const handleChangeClick = (food: IFood): void => {
    setChangeOpen(true);
    setOldCost(food.cost);
  };

  return (
    <>
      <ChangeFoodModal
        oldCost={oldCost}
        changeOpen={changeOpen}
        setChangeOpen={setChangeOpen}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Food Name</StyledTableCell>
              <StyledTableCell>Food Cost</StyledTableCell>
              <StyledTableCell>Food Category</StyledTableCell>
              <StyledTableCell>Change Cost</StyledTableCell>
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
                    <StyledTableCell>
                      <Button
                        onClick={() => handleChangeClick(food)}
                        variant="outlined" 
                      >
                        Изменить цену
                      </Button>
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
