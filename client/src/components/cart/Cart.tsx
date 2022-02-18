import GooglePayButton from "@google-pay/button-react";
import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import { buyFromCart } from "../../actions/cart";
import { Box, TextField, Typography } from "../../mui";
import { RootState } from "../../reducers";
import CartItem from "./CartItem";

const Cart = () => {
  const { t } = useTranslation();
  const carts = useSelector((state: RootState) => state.cart.cart);
  let foundIds: Array<string> = [];
  const [searchid, setSearchId] = useState(foundIds);
  const dispatch = useDispatch();
  let total = 0;

  useEffect(() => {
    setSearchId(carts.map((item: any) => item.gameid));
  }, [carts]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const search = e.target.value.toLowerCase();
    foundIds = carts.map((item: any) =>
      item.title.toLowerCase().includes(search) ? item.gameid : null
    );
    setSearchId(foundIds);
  };

  if (carts === undefined || carts === null || carts.length === 0) {
    return (
      <Fragment>
        <Box className="cart-container">
          <button
            className="btn btn-info close"
            onClick={() =>
              document
                .querySelector(".cart-container")!
                .classList.remove("is-open")
            }
          >
            <i className="fas fa-times"></i>
          </button>
          <h4>пусто</h4>

          <hr />
        </Box>
      </Fragment>
    );
  } else {
    const cart: any = [];
    carts.forEach((item: any) => {
      if (item.status === false) {
        return cart.push(item);
      }
    });
    cart.map((item: { status: boolean; price: number; discount: number }) =>
      !item.status
        ? (total += item.price - item.price * item.discount)
        : (total += 0)
    );
    const formatter = new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    });

    return (
      <>
        <Box
          className="cart-container"
          sx={{ backgroundColor: "secondary.main" }}
        >
          <TextField
            id="standard-basic"
            label={t("search")}
            variant="standard"
            onChange={handleChange}
            sx={{ marginBottom: "1em" }}
            color="info"
          />
          <Box className="content">
            {cart.length !== 0 && !searchid.every((elem) => elem === null) ? (
              cart.map((item: any) =>
                searchid.includes(item.gameid) ? (
                  <CartItem key={item.gkeyid} item={item} />
                ) : null
              )
            ) : (
              <Typography variant="h5">{t("cart.empty")}</Typography>
            )}
          </Box>
          <hr />

          {total ? (
            <>
              <Box className="cart-total">
                <Typography variant="h6">{t("cart.total")}:</Typography>
                <Typography component="strong" className="price">
                  {formatter.format(total)}
                </Typography>
              </Box>
              <Box className="cart-gpay">
                <GooglePayButton
                  environment="TEST"
                  buttonColor="white"
                  buttonType="checkout"
                  buttonSizeMode="fill"
                  paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                      {
                        type: "CARD",
                        parameters: {
                          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                          allowedCardNetworks: ["MASTERCARD", "VISA"],
                        },
                        tokenizationSpecification: {
                          type: "PAYMENT_GATEWAY",
                          parameters: {
                            gateway: "example",
                            gatewayMerchantId: "exampleGatewayMerchantId",
                          },
                        },
                      },
                    ],
                    merchantInfo: {
                      merchantId: "12345678901234567890",
                      merchantName: `покупку ключей`,
                    },
                    transactionInfo: {
                      totalPriceStatus: "FINAL",
                      totalPriceLabel: "Total",
                      totalPrice: `${total.toFixed(2)}`,
                      currencyCode: "RUB",
                      countryCode: "RU",
                    },
                    shippingAddressRequired: true,
                    callbackIntents: [
                      "SHIPPING_ADDRESS",
                      "PAYMENT_AUTHORIZATION",
                    ],
                  }}
                  onLoadPaymentData={(paymentRequest) => {
                    console.log("On Load Payment Data", paymentRequest);
                    cart.forEach((item: any) =>
                      !item.status ? dispatch(buyFromCart(item.gkeyid)) : null
                    );
                    dispatch(setAlert("Payment Success", "success"));
                  }}
                  onPaymentAuthorized={(paymentData) => {
                    console.log("Payment Authorised Success", paymentData);
                    return { transactionState: "SUCCESS" };
                  }}
                  onPaymentDataChanged={(paymentData) => {
                    console.log("On Payment Data Changed", paymentData);
                    return {};
                  }}
                  onError={(e: any) => {
                    if (e.message) {
                      dispatch(setAlert(e.message, "error"));
                      console.log("Payment Error", e.message);
                    } else {
                      dispatch(setAlert("Unknown Error", "error"));
                      console.log("Payment Error", "Unknown Error");
                    }
                  }}
                />
              </Box>
            </>
          ) : null}
        </Box>
      </>
    );
  }
};

export default Cart;
