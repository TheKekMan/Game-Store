import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import { getFromCart } from "../../actions/cart";
import Search from "./Search";
import { CART_ITEM } from "../../actions/types";
import { RootState } from "../../reducers";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Box, Button, Menu, MenuItem } from "../../mui";

interface Props {
  auth: {
    isAuthenticated: boolean;
    loading: boolean;
    user: any;
  };
  logout: any;
}

const Navbar = ({
  auth: { isAuthenticated, loading, user },
  logout,
}: Props) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const userid = useSelector((state: RootState) => state.auth.userid);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [anchorEl, setAnchorEl] = useState(null);
  const [language, setLanguage] = useState(
    localStorage.getItem("i18nextLng") || "ru"
  );

  const switchLanguage = (language: string) => {
    if (language === "RU") {
      i18n.changeLanguage("ru");
      moment.locale("ru");
      setLanguage("ru");
      handleClose();
    } else {
      i18n.changeLanguage("en");
      moment.locale("en");
      setLanguage("en");
      handleClose();
    }
  };

  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(getFromCart(userid));
  }, [dispatch, userid]);

  useEffect(() => {
    if (cart.length !== 0) {
      const ccart = cart;
      let count = ccart.length;
      dispatch({
        type: CART_ITEM,
        len: count,
      });
    }
  }, [cart.length, cart, dispatch]);
  const authLinks = (
    <ul>
      <li>
        <Link to={`/profile/${userid}`}>
          {user !== null ? (
            <i className="fas fa-user">({user.email})</i>
          ) : (
            // ? user.email + "(" + formatter.format(user.balance) + ")"
            ""
          )}
        </Link>
      </li>

      {cart.length > 0 ? (
        <li>
          <a
            className="cart-toggle"
            onClick={() =>
              document
                .querySelector(".cart-container")!
                .classList.toggle("is-open")
            }
            href="#!"
          >
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-items-no">{cart.length}</span>
          </a>
        </li>
      ) : null}

      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>
        </a>
      </li>
      <li>
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          size="medium"
          style={{ minWidth: "40px" }}
          sx={{ color: "text.primary" }}
        >
          {language?.toUpperCase()}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          disableScrollLock={true}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => switchLanguage("EN")}>English</MenuItem>
          <MenuItem onClick={() => switchLanguage("RU")}>Русский</MenuItem>
        </Menu>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">{t("buttons.register")}</Link>
      </li>
      <li>
        <Link to="/login">{t("buttons.login")}</Link>
      </li>
      <li>
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          size="medium"
          style={{ minWidth: "40px" }}
          sx={{ color: "text.primary" }}
        >
          {language?.toUpperCase()}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          disableScrollLock={true}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => switchLanguage("EN")}>English</MenuItem>
          <MenuItem onClick={() => switchLanguage("RU")}>Русский</MenuItem>
        </Menu>
      </li>
    </ul>
  );
  return (
    <Box
      component="nav"
      className="navbar"
      sx={{ backgroundColor: "primary.main", color: "text.primary" }}
    >
      <div className="home-link">
        <Link to="/">
          <i className="fas fa-home"></i>
        </Link>
      </div>
      <Search />
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </Box>
  );
};

const mapStateToProps = (state: { auth: any }) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
