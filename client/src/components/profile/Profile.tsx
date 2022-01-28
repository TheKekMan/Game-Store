import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Divider,
  EditIcon,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Paper,
} from "../../mui";
import { RootState } from "../../reducers";
import moment from "moment";
import { getUser } from "../../actions/user";

const Profile = () => {
  const keys = useSelector((state: RootState) => state.cart.cart);
  const user = useSelector((state: RootState) => state.auth.user);
  const userInfo = useSelector((state: RootState) => state.user.user);
  console.log(userInfo);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  let gamesOwned: number = keys.filter(
    (item: any) => item.status === true
  ).length;

  return (
    <Box className="profile" sx={{ textAlign: "left" }}>
      <Box className="profile-info" sx={{ display: "flex", columnGap: "1em" }}>
        <Avatar
          variant="rounded"
          sx={{ width: 200, height: 200 }}
          src={userInfo.avatar}
        ></Avatar>
        <Divider orientation="vertical" flexItem />
        <Stack spacing={2} className="profile-biography">
          <Typography>
            <b>Email:</b> {user.email}
          </Typography>
          <Typography>
            <b>{t("profile.name")}:</b> {userInfo.name}
          </Typography>
          <Typography>
            <b>{t("profile.secondName")}:</b> {userInfo.second_name}
          </Typography>
          <Typography>
            <b>{t("profile.dateOfBirth")}:</b>{" "}
            {moment(userInfo.birthday).format("ll")}
          </Typography>
          <Typography>
            <b>{t("profile.gamesOwned")}:</b> {gamesOwned}
          </Typography>
        </Stack>
        <Box
          sx={{
            justifySelf: "end",
            marginLeft: "auto",
            marginTop: "1em",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          <Button color="info" variant="contained" startIcon={<EditIcon />}>
            {t("profile.editProfile")}
          </Button>
        </Box>
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
