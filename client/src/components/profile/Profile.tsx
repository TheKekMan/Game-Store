import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Paper,
} from "../../mui";
import { RootState } from "../../reducers";

const Profile = () => {
  const keys = useSelector((state: RootState) => state.cart.cart);

  return (
    <Box className="Profile" sx={{ textAlign: "left" }}>
      <Typography variant="h4">Приобретенные игры:</Typography>
      <hr />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Название</b>
              </TableCell>
              <TableCell align="right">
                <b>Код игры</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {keys.map((row: any) =>
              row.status ? (
                <TableRow
                  key={row.gkeyid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link to={`games/${row.gameid}`}>{row.title}</Link>
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ) : null
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Profile;
