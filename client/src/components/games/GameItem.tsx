import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Box, Grow, Typography } from "../../mui";

const formatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
});

formatter.format(2500);

const GameItem = ({
  game,
  animationDelay,
}: {
  game: any;
  animationDelay: number;
}) => {
  const { t } = useTranslation();
  return (
    <Grow in={true} {...{ timeout: animationDelay }}>
      <Box className="game-item">
        <Link to={`/games/${game.game_id}`}>
          <img src={game.picture} alt="" />
          <Typography variant="h6">{game.game_name}</Typography>
          {game.price > 0 ? (
            <Box className="price-container">
              {game.discount > 0 ? (
                <Box className="price-container">
                  <Typography component="span" className="discount-amount">
                    -{game.discount * 100}%
                  </Typography>
                  <Typography component="span" className="list-price-discount">
                    {formatter.format(game.price)}
                  </Typography>
                  <Typography component="span" className="price-discount">
                    {formatter.format(game.price - game.price * game.discount)}
                  </Typography>
                </Box>
              ) : (
                <Typography component="span" className="list-price">
                  {formatter.format(game.price)}
                </Typography>
              )}
            </Box>
          ) : (
            <Typography component="span" className="free-price">
              {t("game.free")}
            </Typography>
          )}
        </Link>
      </Box>
    </Grow>
  );
};

export default GameItem;
