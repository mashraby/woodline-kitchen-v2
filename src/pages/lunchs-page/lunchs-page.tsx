import React from "react";

// MUI components
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

// My Components
import { MiniDrawer } from "../../components/sidebar/sidebar";

export const LunchsPage: React.FC = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />

        <Box component="main" sx={{ flexGrow: 1, px: 3, py: 12 }}>
          <Typography variant="h4" component="h2">
            Обеды
          </Typography>
        </Box>
      </Box>
    </>
  );
};