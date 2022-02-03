import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../../actions/cart";
import { Box, Button, Typography, Fade } from "../../mui";

const CartItem = ({ item }: { item: any }) => {
  const dispatch = useDispatch();
  var formatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
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
