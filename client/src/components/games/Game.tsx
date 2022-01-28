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
import { Box, Typography } from "../../mui";
import Carousel from "react-material-ui-carousel";
import { useTheme } from "@mui/material";

const Video = (props: any) => {
  return (
    <Box className="details-iframe">
      <iframe
        className="details-video"
        width="100%"
        height="auto"
        max-width="500px"
        src={
          props.url +
          "?autoplay=1&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3"
        }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Box>
  );
};

const Game = (props: { match: { params: { id: uuid.V4Options } } }): any => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const games = useSelector((state: RootState) => state.games);
  const userid = useSelector((state: RootState) => state.auth.userid);
  const theme = useTheme();
  const labelColor = theme.palette.mode === "light" ? "black" : "white";
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    dispatch(getGameById(props.match.params.id));
  }, [dispatch, props.match.params.id]);
  // const cartItems = useSelector((state: RootState) => state.cart.cart);

  const labels = () => {
    var lastmonths = [];
    for (let i = 11; i >= 0; i--) {
      lastmonths.push(moment().subtract(i, "month").format("MMMM"));
    }
    return lastmonths;
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: labelColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: labelColor,
        },
        grid: {
          color: "#093170",
        },
      },
      y: {
        ticks: {
          color: labelColor,
        },
        grid: {
          color: "#093170",
        },
      },
    },
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
        borderColor: "#c62828",
        backgroundColor: "#c62828",
        tension: 0.3,
        pointHoverRadius: 8,
        pointRadius: 4,
        pointStyle: "rectRot",
        pointBorderColor: "white",
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
          <Box className="game-details">
            {games.game.media ? (
              <Carousel
                autoPlay={false}
                navButtonsWrapperProps={{ style: { height: "80%" } }}
              >
                {games.game.media.map((item: any, index: React.Key) =>
                  item.includes("youtube") ? (
                    <Video key={index} url={item} />
                  ) : (
                    <Box key={index} className="details-poster">
                      <img src={item} alt="" />
                    </Box>
                  )
                )}
              </Carousel>
            ) : (
              <Box className="details-poster">
                <img src={games.game.picture} alt="" />
              </Box>
            )}

            <Box className="details-info">
              <Typography variant="h3" component="h1">
                {games.game.game_name}
              </Typography>
              <Box className="tags">
                <Link to={`/games/tag/${games.game.genre}`}>
                  {games.game.genre}
                </Link>
              </Box>
              <Typography component="p">
                <b>{t("game.desc")}:</b> {games.game.description}{" "}
              </Typography>
              <Typography component="p" className="date">
                <b>{t("game.date")}:</b>{" "}
                {(games.game.release_date = moment().format("ll"))}
              </Typography>
              <Typography component="p">
                <b>{t("game.dev")}:</b> {games.game.developer}
              </Typography>
              {games.game.price > 0 ? (
                <Box className="price-container-discount">
                  {games.game.discount > 0 ? (
                    <Box className="price-container-discount">
                      <Box component="span" className="discount-amount">
                        -{games.game.discount * 100}%
                      </Box>
                      <Box component="span" className="pricediscount">
                        {formatter.format(games.game.price)}
                      </Box>
                      <Box component="span" className="price">
                        {formatter.format(
                          games.game.price -
                            games.game.price * games.game.discount
                        )}
                      </Box>
                    </Box>
                  ) : (
                    <Box component="span" className="price">
                      {formatter.format(games.game.price)}
                    </Box>
                  )}
                </Box>
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
            </Box>
            <Typography variant="h4" component="h2">
              {t("game.history")}
            </Typography>
            <Line data={data} options={options} />
          </Box>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Game;
