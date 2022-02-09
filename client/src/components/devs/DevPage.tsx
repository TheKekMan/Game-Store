import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Fade, Stack, Typography } from "../../mui";
import GamesByDev from "../games/GamesByDev";
import uuid from "uuid";
import { getDev } from "../../actions/dev";
import { RootState } from "../../reducers";

const DevPage = (props: { match: { params: { id: uuid.V4Options } } }) => {
  const dev = useSelector((state: RootState) => state.devs.dev);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDev(props.match.params.id));
  }, []);
  const { t } = useTranslation();
  return (
    <Box className="dev-profile" sx={{ textAlign: "left" }}>
      <Fade in={true} timeout={1000}>
        <Box
          className="dev-profile-info"
          sx={{ display: "flex", columnGap: "1em" }}
        >
          <Avatar
            variant="rounded"
            sx={{ width: 200, height: 200 }}
            src={dev.devUrl}
          />
          <Stack spacing={2} className="dev-profile-biography">
            <Typography variant="h3">{dev.devName}</Typography>
            <Typography>{dev.devDescription}</Typography>
          </Stack>
        </Box>
      </Fade>
      <hr />
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        {t("dev.gamesByDev")}:
      </Typography>
      <GamesByDev devId={props.match.params.id}></GamesByDev>
    </Box>
  );
};

export default DevPage;
