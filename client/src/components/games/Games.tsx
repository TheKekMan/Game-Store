import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GameItem from "./GameItem";
import Spinner from "../layout/Spinner";
import { getGames } from "../../actions/games";
import { RootState } from "../../reducers";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";

// custom search Hook
const useSearch = (query: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGames(query));
  }, [dispatch, query]);
};

const Games = (props: any) => {
  const { t } = useTranslation();
  const query = props.match.params.query || "";
  useSearch(query);
  const games = useSelector((state: RootState) => state.games);
  const [width, setWidth] = useState(window.innerWidth);
  const [page, setPage] = useState(1);
  const [PageGames, setPageGames] = useState([]);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    // games.results.rows = games.results.rows.slice(page-1 * 8, page * 8)
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (games.results.length !== 0)
      if (page === 1) {
        //games.results.rows = games.results.rows.slice(page - 1 * 8, page * 8);
        setPageGames(games.results.rows.slice(0, page * 8))
      } else setPageGames(games.results.rows.slice((page - 1) * 8, page * 8))
  }, [games, page]);

  return games.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {games.results.rows && games.results.rows.length > 0 ? (
        <>
          <div className="games-list">
            {PageGames.map((game: { game_id: React.Key }) => (
              <GameItem key={game.game_id} game={game} />
            ))}
          </div>
          <div className="pagination">
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(games.results.rows.length / 8)}
                color="primary"
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
        // <h4>{games.error.msg}</h4>
        <h4>{t("noGames")}</h4>
      )}
    </Fragment>
  );
};

export default Games;
