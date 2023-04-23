import React from "react";

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: "top-right",
      isOpened: false,
      fullScreen: false,
      text: "",
      title: "",
      isHovereOnIcon: false,
      isHovere: false,
      color: "default",
    };
  }
  static instance = null;
  static open(title, text, position, time, color) {
    if (window.screen.width <= 540)
      Notification.instance.setState({ fullScreen: true });
    if (!!position) Notification.instance.setState({ position: position });
    if (!!title && !!text) Notification.instance.setState({ isOpened: true });
    Notification.instance.setState({ text: text });
    Notification.instance.setState({ title: title });
    if (!!color) Notification.instance.setState({ color: color });
    setTimeout(
      () => {
        Notification.close();
      },
      time ? time : 7500
    );
  }
  static close() {
    Notification.instance.setState({ isOpened: false });
  }
  selectBackgroundColor() {
    switch (this.state.color) {
      case "success":
        return "#66bb6a";
      case "danger":
        return "#f44336";
      case "warning":
        return "#FEE715FF";
      case "primary":
        return "#4fc3f7";
      default:
        return "#e9eef2";
    }
  }
  selectColor() {
    switch (this.state.color) {
      case "success":
        return "#F7F7F7";
      case "danger":
        return "#F7F7F7";
      case "warning":
        return "#1A1A1A";
      case "primary":
        return "#1A1A1A";
      default:
        return "#1A1A1A";
    }
  }
  render() {
    const style = {
      main: {
        color: this.selectColor(),
        position: "absolute",
        background: this.selectBackgroundColor(),
        paddingBlock: "14px",
        borderRadius: this.state.isOpened
          ? this.state.fullScreen
            ? ""
            : "25px"
          : this.state.position === "top-right" ||
            this.state.position === "bottom-right"
          ? "50% 0 0 50%"
          : "0 50% 50% 0",
        margin: this.state.fullScreen ? "" : "20px",
        width: this.state.isOpened
          ? this.state.fullScreen
            ? "100%"
            : "400px"
          : "0",
        transform:
          !this.state.fullScreen && this.state.isHovere
            ? "translateY(3px)"
            : "translateY(0)",
        translate: !this.state.isOpened
          ? this.state.position === "top-right" ||
            this.state.position === "bottom-right"
            ? "20px 0"
            : "-20px 0"
          : "0 0",
        transition: "all 0.3s",
        direction: "rtl",
        zIndex: "101",
        whiteSpace: "nowrap",
        paddingInline: !this.state.isOpened ? "0" : "16px",
        overflow: "hidden",
      },
      topLeft: {
        top: "0",
        left: "0",
      },
      topRight: {
        top: "0",
        right: "0",
      },
      bottomLeft: {
        bottom: "0",
        left: "0",
      },
      bottomRight: {
        bottom: "0",
        right: "0",
      },
      icon: {
        transition: "all 0.15s",
        transform: this.state.isHovereOnIcon ? "rotate(135deg)" : "rotate(0)",
        opacity: this.state.isOpened ? "1" : "0",
        cursor: "pointer",
        position: "absolute",
        line2: {
          opacity: this.state.isHovereOnIcon ? "0" : "1",
          transition: "all 0.3s",
        },
        topLeft: {
          top: "15px",
          left: "15px",
        },
        topRight: {
          top: "15px",
          left: "15px",
        },
        bottomLeft: {
          top: "15px",
          left: "15px",
        },
        bottomRight: {
          top: "15px",
          left: "15px",
        },
      },
    };
    return (
      <React.Fragment>
        <div
          style={{
            ...style.main,
            ...(this.state.position === "bottom-right"
              ? style.bottomRight
              : this.state.position === "top-left"
              ? style.topLeft
              : this.state.position === "bottom-left"
              ? style.bottomLeft
              : style.topRight),
          }}
          onMouseEnter={() => this.setState({ isHovere: true })}
          onMouseLeave={() => this.setState({ isHovere: false })}
        >
          <svg
            id="delete"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              ...style.icon,
              ...(this.state.position === "bottom-right"
                ? style.icon.bottomRight
                : this.state.position === "top-left"
                ? style.icon.topLeft
                : this.state.position === "bottom-left"
                ? style.icon.bottomLeft
                : style.icon.topRight),
            }}
            onMouseEnter={() => this.setState({ isHovereOnIcon: true })}
            onMouseLeave={() => this.setState({ isHovereOnIcon: false })}
            onClick={() => Notification.close()}
          >
            <line
              id="delete-line-2"
              x1="11"
              y1="18.4853"
              x2="19.4853"
              y2="10"
              stroke={
                this.state.color === "danger" || this.state.color === "success"
                  ? "#F7F7F7"
                  : "#1a1a1a"
              }
              strokeWidth="3"
              strokeLinecap="round"
              style={style.icon.line2}
            />
            <line
              id="delete-line1"
              x1="11.1213"
              y1="10"
              x2="19.6066"
              y2="18.4853"
              stroke={
                this.state.color === "danger" || this.state.color === "success"
                  ? "#F7F7F7"
                  : "#1a1a1a"
              }
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <h3 style={{ margin: "5px" }}>{this.state.title}</h3>
          <p style={{ margin: "5px" }}>{this.state.text}</p>
        </div>
      </React.Fragment>
    );
  }
  componentDidMount() {
    Notification.instance = this;
  }
}

export default Notification;
