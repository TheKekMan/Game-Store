import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle" /> {t("notFound.title")}
      </h1>
      <p className="large">{t("notFound.description")}</p>
    </Fragment>
  );
};

export default NotFound;
