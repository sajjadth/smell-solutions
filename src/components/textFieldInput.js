import React from "react";

class TextFieldInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }
  render() {
    const style = {
      input: {
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
          : "1px solid var(--color-gray-light)",
        direction: "rtl",
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
        opacity: this.state.focused || !!this.props.value ? "1" : "0.5",
        transform:
          this.state.focused || !!this.props.value
            ? "translate(-3%, -150%)"
            : "translate(0, 0)",
      },
    };
    return (
      <React.Fragment>
        <div className="input-item">
          <input
            style={style.input}
            placeholder={this.state.focused ? this.props.placeholder : ""}
            type="text"
            onFocus={() => this.setState({ focused: true })}
            onBlur={() => this.setState({ focused: false })}
            onChange={(e) =>
              this.props.inputHandler(e, this.props.type, this.props.inputType)
            }
            value={this.props.value}
            disabled={this.props.disabled}
          />
          <label style={style.label} htmlFor={`${this.props.type}-input`}>
            {this.props.label}
          </label>
        </div>
      </React.Fragment>
    );
  }
}

export default TextFieldInput;
