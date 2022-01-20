import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkout } from "../../actions/auth";
import { RootState } from "../../reducers";
import uuid from "uuid";

const Checkout = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  let cartItems = cart.map((item: { gameId: uuid.V4Options }) => item.gameId);
  console.log(cartItems);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkout(cartItems));
  }, [cartItems, dispatch]);

  return (
    <Fragment>
      <h1>Thank you for your purchase</h1>
      <p>The games will be linked to your account shortly.</p>
    </Fragment>
  );
};

export default Checkout;
