import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Avatar,
  Divider,
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
  const { t } = useTranslation();

  return (
    <Box className="profile" sx={{ textAlign: "left" }}>
      <Box className="profile-info" sx={{ display: "flex", columnGap: "1em" }}>
        <Avatar
          variant="rounded"
          sx={{ width: 200, height: 200 }}
          src="https://i.pravatar.cc/150?img=6"
        ></Avatar>
        <Divider orientation="vertical" flexItem />
        <Stack spacing={2}>
          <Typography>Email: </Typography>
          <Typography>{t("profile.name")}: </Typography>
          <Typography>{t("profile.secondName")}: </Typography>
          <Typography>{t("profile.dateOfBirth")}: </Typography>
          <Typography>{t("profile.gamesOwned")}: </Typography>
        </Stack>
      </Box>
      <hr />
      <Box className="profile-keys">
        <Typography variant="h4" sx={{ marginBottom: "1em" }}>
          {t("profile.purchasedGames")}:
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>{t("profile.gameTitle")}</b>
                </TableCell>
                <TableCell align="right">
                  <b>{t("profile.gameKey")}</b>
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
    </Box>
  );
};

export default Profile;
