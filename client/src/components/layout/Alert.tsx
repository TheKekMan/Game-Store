import React from "react";
import { connect } from "react-redux";
import { AlertMUI } from "../../mui";

const Alert = ({ alerts }: { alerts: any }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(
    (alert: {
      id: React.Key;
      alertType: any;
      msg: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal;
    }) => (
      <AlertMUI
        key={alert.id}
        variant="filled"
        severity={alert.alertType}
        className="alert"
      >
        {alert.msg}
      </AlertMUI>
    )
  );

const mapStateToProps = (state: { alert: any }) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
