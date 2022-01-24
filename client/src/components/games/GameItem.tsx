import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "../../mui";

var formatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
});

formatter.format(2500);

const GameItem = ({ game }: { game: any }) => {
  return (
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
            БЕСПЛАТНО
          </Typography>
        )}
      </Link>
    </Box>
  );
};

export default GameItem;
