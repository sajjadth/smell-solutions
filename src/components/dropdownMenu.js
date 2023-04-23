import React from "react";
import { ReactComponent as DownArrow } from "../assets/svgs/down-arrow.svg";

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpened: false,
    };
    this.dropdownRef = React.createRef();
    this.dropdownHandler = this.dropdownHandler.bind(this);
  }
  dropdownHandler(e) {
    if (e.target === this.dropdownRef.current) {
      this.setState({ isDropdownOpened: !this.state.isDropdownOpened });
    } else {
      this.setState({ isDropdownOpened: false });
    }
  }
  render() {
    const style = {
      button: {
        width: this.state.isDropdownOpened ? "92.5%" : "100%",
        height: "45px",
        padding: "12px 16px",
        cursor: this.props.disabled ? "default" : "pointer",
        zIndex: this.state.isDropdownOpened ? "6" : "2",
        transition: "all 0.25s",
        textAlign: "right",
        background: this.state.isDropdownOpened
          ? "white"
          : "transparent",
        border: this.state.isDropdownOpened ? "12.5px" : "none",
      },
      icon: {
        position: "absolute",
        left: "16px",
        cursor: this.props.disabled ? "default" : "pointer",
        transition: "all 0.25s",
        zIndex: this.state.isDropdownOpened ? "8" : "3",
        pointerEvents: "none",
        transform: this.state.isDropdownOpened
          ? "rotate(180deg)"
          : "rotate(0deg)",
      },
      label: {
        userSelect: "none",
        transition: "all 0.25s",
        position: "absolute",
        opacity:
          this.state.isDropdownOpened || !!this.props.value ? "1" : "0.5",
        cursor: this.props.disabled ? "default" : "pointer",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: this.state.isDropdownOpened ? "8" : "3",
        right: "16px",
        transform:
          this.state.isDropdownOpened || !!this.props.value
            ? "translate(-3%, -150%)"
            : "translate(0, 0)",
      },
      menu: {
        padding: this.state.isDropdownOpened ? "36px 0 12px 0" : "0",
        background: this.props.disabled
          ? "var(--color-disable-light)"
          : "white",
        outline: this.state.isDropdownOpened
          ? "1px solid var(--color-blue-light)"
          : "1px solid var(--color-gray-light)",
        border: "5px solid transparent",
        position: "absolute",
        top: "0",
        zIndex: this.state.isDropdownOpened ? "4" : "1",
        borderRadius: "12.5px",
        transition: "all 0.25s",
        width: "100%",
        overflow: this.state.isDropdownOpened ? "scroll" : "hidden",
        height: this.state.isDropdownOpened ? "13.838125em" : "45px",
        display: "block",
        scrollBehavior: "smooth",
        whiteSpace: "nowrap",
      },
    };
    return (
      <React.Fragment>
        <div className="input-item">
          <input
            value={this.props.value}
            type="button"
            id="about-input"
            style={style.button}
            ref={this.dropdownRef}
            disabled={this.props.disabled}
          />
          <DownArrow style={style.icon} />
          <label style={style.label} htmlFor="about-input">
            {this.props.label}
          </label>
          <div className="scrollbar" style={style.menu}>
            {React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, {
                isDropdownOpened: this.state.isDropdownOpened,
              });
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
  componentDidMount() {
    document.addEventListener("click", this.dropdownHandler);
  }
}

export default DropdownMenu;
