import { useFormik } from "formik";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  Typography,
} from "../../mui";

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
      <Typography variant="h3" component="h1" className="large text-primary">
        {t("register.title")}
      </Typography>
      <Typography component="p" className="lead">
        <i className="fas fa-user"></i> {t("register.desc")}
      </Typography>
      <form className="form" onSubmit={formik.handleSubmit}>
        <FormControl className="form-group">
          <Input
            type="email"
            placeholder={t("register.email")}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <FormHelperText className="invalid-feedback">
              {formik.errors.email}
            </FormHelperText>
          ) : null}
        </FormControl>
        <FormControl className="form-group">
          <Input
            type="password"
            placeholder={t("register.password")}
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <FormHelperText className="invalid-feedback">
              {formik.errors.password}
            </FormHelperText>
          ) : null}
        </FormControl>
        <FormControl className="form-group">
          <Input
            type="password"
            placeholder={t("register.confirmPassword")}
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <FormHelperText className="invalid-feedback">
              {formik.errors.confirmPassword}
            </FormHelperText>
          ) : null}
        </FormControl>
        <Button variant="contained" type="submit" className="btn btn-primary">
          {t("register.button")}
        </Button>
      </form>
      <Typography component="p" className="my-1 login-redirect">
        {t("register.haveAnAccount")}{" "}
        <Link to="/login">{t("register.button")}</Link>
      </Typography>
    </Fragment>
  );
};

const mapStateToProps = (state: { auth: { isAuthenticated: boolean } }) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
