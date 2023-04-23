import React from "react";

class DropdownOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
    };
    this.selected = this.selected.bind(this);
  }
  selected() {
    return this.props.value === this.props.content;
  }
  render() {
    const style = {
      option: {
        transition: "all 0.25s",
        direction: "rtl",
        marginInline: "10px",
        paddingBlock: "12px",
        paddingInline: "12px",
        marginTop: "8px",
        position: "relative",
        zIndex: "3",
        cursor: this.selected() ? "default" : "pointer",
        paddingRight: this.state.hovered && !this.selected() ? "20px" : "16px",
        color:
          this.selected() || this.state.hovered
            ? "var(--color-blue-light)"
            : "black",
        background: this.selected() ? "#004DF625" : "",
        borderRadius: "12.5px",
        opacity: this.props.isDropdownOpened ? "1" : "0",
      },
    };
    return (
      <React.Fragment>
        <div
          onMouseEnter={() => this.setState({ hovered: true })}
          onMouseLeave={() => this.setState({ hovered: false })}
          onClick={(e) =>
            this.props.inputHandler(e, "dropdown", this.props.stateTarget)
          }
          style={style.option}
        >
          {this.props.content}
        </div>
      </React.Fragment>
    );
  }
}

export default DropdownOption;
