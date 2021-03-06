import { Box, Stack, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Divider,
  EditIcon,
  Fade,
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
import ProfileForm from "./ProfileForm";
import { setAlert } from "../../actions/alert";

const CustomRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Profile = () => {
  const keys = useSelector((state: RootState) => state.cart.cart);
  const user = useSelector((state: RootState) => state.auth.user);
  const userInfo = useSelector((state: RootState) => state.user.user);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  let gamesOwned: number = keys.filter(
    (item: any) => item.status === true
  ).length;

  return (
    <Box className="profile" sx={{ textAlign: "left" }}>
      <Fade in={true} timeout={1000}>
        <Box
          className="profile-info"
          sx={{ display: "flex", columnGap: "1em" }}
        >
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
              <b>{t("profile.secondName")}:</b> {userInfo.secondName}
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
            className="button"
            sx={{
              justifySelf: "end",
              marginLeft: "auto",
              marginTop: "1em",
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            <Button
              color="info"
              variant="contained"
              onClick={handleClickOpen}
              startIcon={<EditIcon />}
            >
              {t("profile.editProfile")}
            </Button>
          </Box>
        </Box>
      </Fade>

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
              {keys.map((row: any, index: number) =>
                row.status ? (
                  <Fade in={true} timeout={index * 200} key={row.gkeyid}>
                    <CustomRow
                      onClick={() => {
                        navigator.clipboard.writeText(row.value);
                        dispatch(setAlert(t("profile.copyCode"), "success"));
                      }}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Link to={`games/${row.gameid}`}>{row.title}</Link>
                      </TableCell>
                      <TableCell align="right">{row.value}</TableCell>
                    </CustomRow>
                  </Fade>
                ) : null
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ProfileForm open={open} onClose={handleClose} userInfo={userInfo} />
    </Box>
  );
};

export default Profile;
