import React, { useContext, useEffect, useState } from "react";
import { MiniDrawer } from "../../components/sidebar/sidebar";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { getPayments } from "../../services/api";
import { IPayment } from "../../interfaces/payments.interfacess";
import { PaymentsTable } from "./payments-table/payments-table";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
`;

export const PaymentsPage: React.FC = () => {

    const [payments, setPayments] = useState<IPayment[]>([])

    useEffect(() => {
        getPayments().then(data => {
            setPayments(data)
        })
    }, [])

    console.log(payments);
    

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, px: 3, py: 12 }}>
          <FlexWrapper>
            <Typography variant="h4" component="h2">
              Платежи
            </Typography>
          </FlexWrapper>
          <PaymentsTable payments={payments} />
        </Box>
      </Box>
    </>
  );
};
