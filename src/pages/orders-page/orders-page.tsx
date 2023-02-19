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
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    getOrders().then((data) => setOrders(data));
  }, []);

  let myArr = [
    {
      _id: "1",
      user: "63e7a688cec37b154b904172",
      comment: "",
      food: [{
        _id: "63ee0f00cc530add13e99bcf",
        count: 1,
      }],
      total_cost: 10000,
      is_given: false,
      is_canceled: true,
    },
    {
      _id: "2",
      user: "63e7a6afcec37b154b904175",
      comment: "",
      food: [{
        _id: "63ee5e54acd8ff3e8aa31636",
        count: 2,
      }],
      total_cost: 30000,
      is_given: true,
      is_canceled: false,
    },
    {
      _id: "3",
      user: "63e9377d0b431ec9d547cd90",
      comment: "",
      food: [{
        _id: "63ee3df4157b78de04120ce6",
        count: 1,
      },
      {
        _id: "63ee5f07acd8ff3e8aa31659",
        count: 1
      }
    ],
      total_cost: 20000,
      is_given: false,
      is_canceled: false,
    },
  ];

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
          <OrdersTable orders={myArr} />
        </Box>
      </Box>
    </>
  );
};
