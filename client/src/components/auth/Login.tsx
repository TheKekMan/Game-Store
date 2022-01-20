import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

interface Props {
  login: Function;
  isAuthenticated: boolean;
}

export const Login = ({ login, isAuthenticated }: Props) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("validation.email"))
        .required(t("validation.required")),
      password: Yup.string()
        .min(8, t("validation.min8"))
        .max(20, t("validation.max20"))
        .required(t("validation.required")),
    }),
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });

  // Redirect if logged in:
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">{t("login.title")}</h1>
      <p className="lead">
        <i className="fas fa-user"></i> {t("login.desc")}
      </p>
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder={t("login.email")}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="invalid-feedback">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder={t("login.password")}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="invalid-feedback">{formik.errors.password}</div>
          ) : null}
        </div>
        <input type="submit" className="btn btn-primary" value="Вход" />
      </form>
      <p className="my-1 login-redirect">
        {t("login.noAccount")} <Link to="/register">{t("register.title")}</Link>
      </p>
    </Fragment>
  );
};

const mapStateToProps = (state: { auth: { isAuthenticated: boolean } }) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
