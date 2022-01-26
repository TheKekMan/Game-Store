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

function createData(
  name: string,
  calories: any,
  fat: any,
  carbs: any,
  protein: any
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

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
