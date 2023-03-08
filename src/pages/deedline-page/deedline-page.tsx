import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { MiniDrawer } from "../../components/sidebar/sidebar";
import { IDeedline } from "../../interfaces/deedline.interface";
import { getDeedlines } from "../../services/api";
import { DeedlineTable } from "./deedline-table/deedline-table";

export const DeedlinePage: React.FC = () => {
  const [deedlines, setDeedlines] = useState<IDeedline[]>([]);

  useEffect(() => {
    getDeedlines().then((data) => {
      setDeedlines(data);
    });
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, px: 3, py: 12 }}>
          <Typography variant="h4" component="h2">
            Срок действия
          </Typography>

          <DeedlineTable deedlines={deedlines} />
        </Box>
      </Box>
    </>
  );
};
