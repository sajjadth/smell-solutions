import React from "react";
import Loading from "./loading";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      isActive: false,
    };
  }
  render() {
    const style = {
      button: {
        width: "100%",
        height: "45px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        outline: "none",
        borderRadius: "12.5px",
        background:
          this.state.hovered && !this.props.disabled ? "#0D0F18" : "#171827",
        color: "#F6F8FF",
        cursor: "pointer",
        transition: "all 0.25s",
        boxShadow:
          "0 1px 3px var(#{rgba(#00093D, .12)}), 0 3px 7px var(--shadow)",
        transform:
          this.state.isActive && !this.props.disabled
            ? "scale(0.97)"
            : "scale(1)",
      },
      disable: {
        background: "var(--color-disable-light)",
        cursor: "default",
      },
      icon: {
        after: {
          transition: "all 0.25s",
          transform:
            this.state.hovered || this.state.isActive
              ? "translateX(7.5px)"
              : "translateX(5px)",
        },
        before: {
          transition: "all 0.25s",
          transform:
            this.state.hovered || this.state.isActive
              ? "translateX(-7.5px)"
              : "translateX(-5px)",
        },
      },
    };
    return (
      <React.Fragment>
        <button
          type={!!this.props.type ? "button" : this.props.type}
          style={{
            ...style.button,
            ...(this.props.disabled ? style.disable : null),
          }}
          onMouseEnter={() => this.setState({ hovered: true })}
          onMouseLeave={() => this.setState({ hovered: false })}
          onClick={() => {
            this.setState({ isActive: false });
            this.props.formHandler();
          }}
          onMouseDown={() => this.setState({ isActive: true })}
          disabled={this.props.disabled}
        >
          {this.props.iconAfter
            ? [
                this.props.content,
                React.Children.map(this.props.children, (child) =>
                  React.cloneElement(child, { style: style.icon.after })
                ),
              ]
            : [
                React.Children.map(this.props.children, (child) =>
                  React.cloneElement(child, { style: style.icon.before })
                ),
                this.props.content,
              ]}
          {this.props.loading ? <Loading width="30px" height="30px" /> : null}
        </button>
      </React.Fragment>
    );
  }
}

export default Button;
