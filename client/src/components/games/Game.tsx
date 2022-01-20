import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGameById } from "../../actions/games";
import Spinner from "../layout/Spinner";
import AddToCart from "./AddToCart";
import moment from "moment";
import "moment/locale/ru";
import { Line } from "react-chartjs-2";
import { RootState } from "../../reducers";
import uuid from "uuid";
import { useTranslation } from "react-i18next";

const Game = (props: { match: { params: { id: uuid.V4Options } } }): any => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGameById(props.match.params.id));
  }, [dispatch, props.match.params.id]);
  const games = useSelector((state: RootState) => state.games);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userid = useSelector((state: RootState) => state.auth.userid);
  // const cartItems = useSelector((state: RootState) => state.cart.cart);

  const labels = () => {
    var lastmonths = [];
    for (let i = 11; i >= 0; i--) {
      lastmonths.push(moment().subtract(i, "month").format("MMMM"));
    }
    return lastmonths;
  };

  const data = {
    labels: labels(),
    datasets: [
      {
        label: t("game.price"),
        data:
          games.game === null || games.loading
            ? null
            : games.game.price_history,
        fill: false,
        borderColor: "red",
        backgroundColor: "blue",
        tension: 0.1,
      },
    ],
  };

  var formatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  });

  // let isAddedToCart = false;

  return (
    <Fragment>
      {games.game === null || games.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="game-details">
            {games.game.is_video ? (
              <div className="details-iframe">
                <iframe
                  className="details-video"
                  width="100%"
                  height="auto"
                  max-width="500px"
                  src={
                    games.game.video +
                    "?autoplay=1&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3"
                  }
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="details-poster">
                <img src={games.game.picture} alt="" />
              </div>
            )}

            <div className="details-info">
              <h1>{games.game.game_name}</h1>
              <div className="tags">
                <Link to={`/games/tag/${games.game.genre}`}>
                  {games.game.genre}
                </Link>
              </div>
              <p>
                <b>{t("game.desc")}:</b> {games.game.description}{" "}
              </p>
              <p className="date">
                <b>{t("game.date")}:</b>{" "}
                {(games.game.release_date = moment().format("ll"))}
              </p>
              <p>
                <b>{t("game.dev")}:</b> {games.game.developer}
              </p>
              {games.game.price > 0 ? (
                <div className="price-container-discount">
                  {games.game.discount > 0 ? (
                    <div className="price-container-discount">
                      <span className="discount-amount">
                        -{games.game.discount * 100}%
                      </span>
                      <span className="pricediscount">
                        {formatter.format(games.game.price)}
                      </span>
                      <span className="price">
                        {formatter.format(
                          games.game.price -
                            games.game.price * games.game.discount
                        )}
                      </span>
                    </div>
                  ) : (
                    <span className="price">
                      {formatter.format(games.game.price)}
                    </span>
                  )}
                </div>
              ) : (
                <p className="price free">{t("game.free")}</p>
              )}

              {isAuthenticated ? (
                <Fragment>
                  {/* {cartItems.map((item: { gameId: uuid.V4Options }) => {
                    if (games.game.game_id === item.gameId) {
                      // isAddedToCart = true;
                      return true;
                    }
                  })} */}
                  <AddToCart
                    gameid={games.game.game_id}
                    title={games.game.game_name}
                    price={games.game.price}
                    poster={games.game.picture}
                    discount={games.game.discount}
                    userid={userid}
                  />
                </Fragment>
              ) : (
                <Link to="/login" className="btn btn-primary">
                  {t("game.buttonReg")}
                </Link>
              )}
            </div>
            <h2>{t("game.history")}</h2>
            <Line data={data} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Game;
