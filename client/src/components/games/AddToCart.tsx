import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/cart";
import uuid from "uuid";
import { useTranslation } from "react-i18next";

interface Props {
  gameid: uuid.V4Options;
  title: string;
  price: any;
  poster: any;
  userid: uuid.V4Options;
  discount: any;
}

const AddToCart = ({
  gameid,
  title,
  price,
  poster,
  userid,
  discount,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <button
      className="btn btn-success"
      onClick={() =>
        dispatch(addToCart(gameid, title, price, poster, userid, discount))
      }
    >
      {t("game.button")}
    </button>
  );
};

export default AddToCart;
