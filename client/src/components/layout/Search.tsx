import React from "react";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import { Button } from "../../mui";

let query = "";

const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  query = e.target.value;
};

const Search = (props: any) => {
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        // dispatch(getGames(query));
        if (query.length > 2) props.history.push(`/games/search/${query}`);
      }}
    >
      <input
        type="search"
        name="search"
        placeholder={t("search")}
        onChange={(e) => onChange(e)}
      />
      <Button type="submit">
        <i className="fas fa-search"></i>
      </Button>
    </form>
  );
};

export default withRouter(Search);
