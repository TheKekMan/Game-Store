import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../actions/cart";

const CartItem = ({ item }: { item: any }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  var formatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  });
  if (item.status === false) {
    return (
      <div className="cart-item">
        <img src={item.poster} alt="" />
        <h4>{item.title}</h4>
        <p className="price">
          {formatter.format(item.price - item.price * item.discount)}
        </p>
        {/* {item.status === true ? (
          <h3>{item.title}</h3>
        ) : (
          <button
            className="btn btn-success success"
            onClick={() => {
              dispatch(buyFromCart(item.gkeyid));
            }}
          >
            <i className="fa fa-shopping-basket"></i>
          </button>
        )} */}
        <button
          className="btn btn-danger remove"
          onClick={() => {
            dispatch(removeFromCart(item.gkeyid));
          }}
        >
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    );
  } else {
    return (
      <div className="cart-item key">
        <img src={item.poster} alt="" />
        <h4>{item.title}</h4>
        <h5>
          {" "}
          {t("cart.code")}: {item.value}{" "}
        </h5>
      </div>
    );
  }
};

export default CartItem;
