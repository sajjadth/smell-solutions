import React from "react";
import { ReactComponent as LoadingSvg } from "../assets/svgs/loading.svg";

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const style = {
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: "100",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "12.5px",
      top: "0",
      icon: {
        width: this.props.width,
        height: this.props.height,
      },
    };
    return (
      <React.Fragment>
        <div style={style} id="loading-background">
          <LoadingSvg style={style.icon} />
        </div>
      </React.Fragment>
    );
  }
}

export default Loading;
