import React from "react";
import { connect } from "react-redux";

const Alert = (props) =>
  props.alerts !== null &&
  props.alerts.length > 0 &&
  props.alerts.map((a) => (
    <div key={a.id} className={`alert alert-${a.alertType}`}>
      {a.msg}
      sss
    </div>
  ));
const mapStateToProps = (state) => ({
  alerts: state.alert,
});
export default connect(mapStateToProps)(Alert);
