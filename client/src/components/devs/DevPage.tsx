import React from "react";
import { useTranslation } from "react-i18next";

import { Avatar, Box, Fade, Stack, Typography } from "../../mui";
import GamesByDev from "../games/GamesByDev";

const DevPage = () => {
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
            src="https://avatars.mds.yandex.net/get-entity_search/372208/295256967/S122x122Fit_2x"
          ></Avatar>
          <Stack spacing={2} className="dev-profile-biography">
            <Typography variant="h3">Название</Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
            </Typography>
          </Stack>
        </Box>
      </Fade>
      <hr />
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        {t("dev.gamesByDev")}:
      </Typography>
      <GamesByDev></GamesByDev>
    </Box>
  );
};

export default DevPage;
