import GooglePayButton from "@google-pay/button-react";
import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import { buyFromCart } from "../../actions/cart";
import { TextField } from "../../mui";
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
        <div className="cart-container">
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
        </div>
      </Fragment>
    );
  } else {
    const cart = carts;
    cart.map((item: { status: boolean; price: number; discount: number }) =>
      item.status === false
        ? (total += item.price - item.price * item.discount)
        : (total += 0)
    );
    var formatter = new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    });

    return (
      <Fragment>
        <div className="cart-container">
          <TextField
            id="standard-basic"
            label={t("search")}
            variant="standard"
            color="primary"
            onChange={handleChange}
            sx={{ marginBottom: "1em" }}
          />
          <div className="content">
            {cart.length !== 0 ? (
              cart.map((item: any, index: React.Key) =>
                searchid.includes(item.gameid) ? (
                  <CartItem key={index} item={item} />
                ) : null
              )
            ) : (
              <h4>пусто</h4>
            )}
          </div>
          <hr />

          {total ? (
            <>
              <div className="cart-total">
                <span></span>
                <h4>{t("cart.total")}</h4>
                <strong className="price">{formatter.format(total)}</strong>
                <span></span>
              </div>
              <div className="cart-gpay">
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
                      totalPrice: `${total}`,
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
              </div>
            </>
          ) : null}
        </div>
      </Fragment>
    );
  }
};

export default Cart;
