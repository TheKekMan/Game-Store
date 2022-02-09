import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { buyFromCart, removeFromCart } from "../../actions/cart";
import { Box, Button, Typography, Fade } from "../../mui";

const CartItem = ({ item }: { item: any }) => {
  const dispatch = useDispatch();
  const formatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  });
  useEffect(() => {
    if (item.price === "0.00") {
      dispatch(buyFromCart(item.gkeyid));
    }
  });
  return (
    <Fade key={item} in={true} timeout={500}>
      <Box className="cart-item">
        <Link className="cart-link" to={`/games/${item.gameid}`}>
          <img src={item.poster} alt="" />
        </Link>
        <Typography>{item.title}</Typography>
        <Typography component="p" className="price">
          {formatter.format(item.price - item.price * item.discount)}
        </Typography>
        <Button
          className="btn btn-danger remove"
          onClick={() => {
            dispatch(removeFromCart(item.gkeyid));
          }}
          variant="contained"
        >
          <i className="far fa-trash-alt"></i>
        </Button>
      </Box>
    </Fade>
  );
};

export default CartItem;
