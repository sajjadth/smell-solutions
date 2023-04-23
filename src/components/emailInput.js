import React from "react";

class EmailInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
    this.validateEmail = this.validateEmail.bind(this);
  }
  s;
  validateEmail() {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      this.props.email
    );
  }
  render() {
    const style = {
      input: {
        transition: "all 2s",
        margin: "0",
        fontSize: "16px",
        lineHeight: "19px",
        borderRadius: "12.5px",
        padding: "12px 16px",
        margin: "2.5px",
        background: this.props.disabled
          ? "var(--color-disable-light)"
          : "white",
        width: "100%",
        outline: "none",
        transition: "all 0.25s",
        border: this.state.focused
          ? "1px solid #004DF6"
          : !!this.props.email
          ? this.validateEmail()
            ? "1px solid var(--color-success-light)"
            : "1px solid var(--color-error-light)"
          : "1px solid var(--color-gray-light)",
      },
      label: {
        userSelect: "none",
        transition: "all 0.25s",
        position: "absolute",
        right: "16px",
        cursor: "text",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: this.state.focused || !!this.props.email ? "1" : "0.5",
        transform:
          this.state.focused || !!this.props.email
            ? "translate(-3%, -150%)"
            : "translate(0, 0)",
      },
    };
    return (
      <React.Fragment>
        <div className="input-item">
          <input
            style={style.input}
            id="email-input"
            placeholder={this.state.focused ? "example@domain.com" : ""}
            type="email"
            onFocus={() => this.setState({ focused: true })}
            onBlur={() => this.setState({ focused: false })}
            onChange={(e) => this.props.inputHandler(e, "email")}
            value={this.props.email}
            disabled={this.props.disabled}
          />
          <label style={style.label} htmlFor="email-input">
            آدرس ایمیل
          </label>
        </div>
      </React.Fragment>
    );
  }
}

export default EmailInput;
