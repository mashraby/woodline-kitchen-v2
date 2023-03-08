import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { MiniDrawer } from "../../components/sidebar/sidebar";

export const DeedlinePage: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />
      <Box component="main" sx={{ flexGrow: 1, px: 3, py: 12 }}>
        <Typography variant="h4" component="h2">
          Срок действия
        </Typography>
      </Box>
    </Box>
  );
};
