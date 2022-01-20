import React from "react";
import { Link } from "react-router-dom";

var formatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
});

formatter.format(2500);

const GameItem = ({ game }: { game: any }) => {
  return (
    <div className="game-item">
      <Link to={`/games/${game.game_id}`}>
        <img src={game.picture} alt="" />
        <h3>{game.game_name}</h3>
        {game.price > 0 ? (
          <div className="price-container">
            {game.discount > 0 ? (
              <div className="price-container">
                <span className="discount-amount">-{game.discount * 100}%</span>
                <span className="list-price-discount">
                  {formatter.format(game.price)}
                </span>
                <span className="price-discount">
                  {formatter.format(game.price - game.price * game.discount)}
                </span>
              </div>
            ) : (
              <span className="list-price">{formatter.format(game.price)}</span>
            )}
          </div>
        ) : (
          <span className="free-price">БЕСПЛАТНО</span>
        )}
      </Link>
    </div>
  );
};

export default GameItem;
