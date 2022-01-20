import { useFormik } from "formik";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

interface Props {
  setAlert: any;
  register: any;
  isAuthenticated: boolean;
}

const Register = ({ register, isAuthenticated }: Props) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("validation.email"))
        .required(t("validation.required")), 
      password: Yup.string()
        .min(8, t("validation.min8"))
        .max(20, t("validation.max20"))
        .required(t("validation.required")),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], t("validation.dblPassword"))
        .required(t("validation.required")),
    }),
    onSubmit: (values) => {
      register(values.email, values.password);
    },
  });

  // Redirect if authenticated:
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">{t("register.title")}</h1>
      <p className="lead">
        <i className="fas fa-user"></i> {t("register.desc")}
      </p>
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder={t("register.email")}
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
            placeholder={t("register.password")}
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="invalid-feedback">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder={t("register.confirmPassword")}
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
        <input type="submit" className="btn btn-primary" value="Зарегистрироваться" />
      </form>
      <p className="my-1 login-redirect">
      {t("register.haveAnAccount")} <Link to="/login">{t("register.button")}</Link>
      </p>
    </Fragment>
  );
};

const mapStateToProps = (state: { auth: { isAuthenticated: boolean } }) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
