import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GameItem from "./GameItem";
import Spinner from "../layout/Spinner";
import { getGamesByDev } from "../../actions/games";
import { RootState } from "../../reducers";
import { useTranslation } from "react-i18next";
import { Pagination, Stack, Typography } from "../../mui";
import uuid from "uuid";

const GamesByDev = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGamesByDev(props.devId));
  }, [dispatch, props.devId]);
  console.log(props);

  const games = useSelector((state: RootState) => state.games);
  const [width, setWidth] = useState(window.innerWidth);
  const [page, setPage] = useState(1);
  const [PageGames, setPageGames] = useState([]);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (games.results.length !== 0)
      if (page === 1) {
        setPageGames(games.results.rows.slice(0, page * 8));
      } else setPageGames(games.results.rows.slice((page - 1) * 8, page * 8));
  }, [games, page]);

  return games.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {games.results.rows && games.results.rows.length > 0 ? (
        <>
          <div className="games-list">
            {PageGames.map((game: { game_id: React.Key }, index) => (
              <GameItem
                key={game.game_id}
                game={game}
                animationDelay={(index + 1) * 250}
              />
            ))}
          </div>
          <div className="pagination">
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(games.results.rows.length / 8)}
                size={width > 768 ? "large" : width < 420 ? "small" : "medium"}
                siblingCount={0}
                boundaryCount={1}
                page={page}
                onChange={(event, value) => setPage(value)}
              />
            </Stack>
          </div>
        </>
      ) : (
        <Typography variant="h4">{t("noGames")}</Typography>
      )}
    </Fragment>
  );
};

export default GamesByDev;
