import React, { useEffect, useState } from "react";
import { MiniDrawer } from "../../components/sidebar/sidebar";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { OrdersTable } from "./orders-table/orders-table";
import { getOrders } from "../../services/api";
import { IOrder } from "../../interfaces/orders.interfaces";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
`;

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([])

  useEffect(() => {
    getOrders().then(data => setOrders(data))
  }, [])

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, px: 3, py: 12 }}>
          <FlexWrapper>
            <Typography variant="h4" component="h2">
              Заказы
            </Typography>
          </FlexWrapper>
          <OrdersTable orders={orders} />
        </Box>
      </Box>
    </>
  );
};
