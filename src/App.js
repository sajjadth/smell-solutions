import "./App.sass";
import React from "react";
import Button from "./components/button";
import EmailInput from "./components/emailInput";
import Notification from "./components/notification";
import DropdownMenu from "./components/dropdownMenu";
import TextFieldInput from "./components/textFieldInput";
import DropdownOption from "./components/dropdownOption";
import { ReactComponent as SendIcon } from "./assets/svgs/send.svg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      reason: "",
      name: "",
      nickName: "",
      tone: "",
      loading: false,
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.formHandler = this.formHandler.bind(this);
  }
  inputHandler(e, type, stateTarget) {
    let target = e.target.value;
    switch (type) {
      case "email":
        if (!target.includes(" ")) this.setState({ email: target });
        break;
      case "dropdown":
        target = e.target.innerText;
        if (stateTarget === "reason") this.setState({ reason: target });
        else if (stateTarget === "tone") this.setState({ tone: target });
        break;
      case "text":
        this.setState({ name: target });
        break;
      case "tone":
        this.setState({ tone: target });
        break
      default:
    }
  }
  formHandler() {
    if (!this.state.email) {
      Notification.open(
        "ایمیل",
        `لطفا فیلد ایمیل را خالی نگزارید.`,
        null,
        null,
        "danger"
      );
      return;
    }
    this.setState({ loading: true });
    fetch(
      "https://smell-solutions.sajjadth.workers.dev/?email=" +
        this.state.email
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ loading: false });
        if (data.success) {
          Notification.open("موفقیت آمیز", data.message, null, null, "success");
          this.setState({ name: "" });
          this.setState({ email: "" });
          this.setState({ reason: "" });
          this.setState({ tone: "" });
        } else {
          Notification.open(
            "مشکلی پیش آمده!",
            data.message,
            null,
            null,
            "success"
          );
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
        const errorMessage = err.message || "مشکلی پیش آمده!";
        Notification.open("مشکلی پیش آمده!", errorMessage, null, null, "danger");
      });
  }
  render() {
    return (
      <React.Fragment>
        <main>
          <div id="form">
            <h3>اطلاعات</h3>
            <div id="windows">
              <div className="windows-item">
                <div className="input-card">
                  <EmailInput
                    inputHandler={this.inputHandler}
                    email={this.state.email}
                    disabled={this.state.loading}
                  />
                  <TextFieldInput
                    label="اسم مخاطب"
                    value={this.state.name}
                    type="text"
                    inputType="name"
                    placeholder="محمد"
                    inputHandler={this.inputHandler}
                    disabled={this.state.loading}
                  />
                  <DropdownMenu
                    disabled={this.state.loading}
                    label="محتوا"
                    value={this.state.reason}
                  >
                    {["بوی کلی بدن", "بوی دهان", "بوی پا", "بوی زیر بغل"].map(
                      (content, index) => {
                        return (
                          <DropdownOption
                            key={index}
                            content={content}
                            inputHandler={this.inputHandler}
                            value={this.state.reason}
                            stateTarget="reason"
                          />
                        );
                      }
                    )}
                  </DropdownMenu>
                  <DropdownMenu
                    disabled={this.state.loading}
                    label="لحن"
                    value={this.state.tone}
                  >
                    {["خنثی", "دوستانه", "حرفه ای", "شوخ", "متقاعد کننده"].map(
                      (content, index) => {
                        return (
                          <DropdownOption
                            key={index}
                            content={content}
                            inputHandler={this.inputHandler}
                            value={this.state.tone}
                            stateTarget="tone"
                          />
                        );
                      }
                    )}
                  </DropdownMenu>
                </div>
                <div className="info">
                  <p id="info-text">
                    رایحه ناشناس به شما این امکان را می دهد که ایمیل های دوستانه
                    و ناشناس را در مورد مسائل بهداشت شخصی به روشی کاملاً محرمانه
                    ارسال کنید.
                  </p>
                </div>
              </div>
            </div>
            <div id="card">
              <Button
                formHandler={this.formHandler}
                type="submit"
                disabled={this.state.loading}
                iconAfter
                content={"ارسال"}
                loading={this.state.loading}
              >
                <SendIcon />
              </Button>
            </div>
          </div>
          <Notification />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
