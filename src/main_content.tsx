import * as React from "react";
import { Slider } from "@blueprintjs/core";
declare var fetch: Function;

interface BotState {
  ccw?: boolean;
  hiLo?: boolean;
  pwmLeft?: number;
  pwmRight?: number;
}

export class MainContent extends React.Component<any, BotState> {
  constructor() {
    super();
    this.state = {
      ccw: true,
      hiLo: false,
      pwmLeft: 0,
      pwmRight: 0
    };
  }

  moveLeft(value: number) {
    this.setState({
      pwmLeft: value
    });
    this.sendState();
  }

  moveRight(value: number) {
    this.setState({
      pwmRight: value
    });
    this.sendState();
  }

  sendState() {
    let { pwmLeft, pwmRight } = this.state;
    let url = `/?slide1Val=${pwmLeft}&slide2Val=${pwmRight}&H=submit`;
    console.log(url);
    fetch(url);
  }

  render() {
    return <div>
      <p>Left: {this.state.pwmLeft}</p>
      <Slider min={0}
        max={100}
        onChange={this.moveLeft.bind(this)}
        value={this.state.pwmLeft} />

      <p>Right: {this.state.pwmRight}</p>
      <Slider min={0}
        max={100}
        onChange={this.moveRight.bind(this)}
        value={this.state.pwmRight} />
    </div>;

  }
}
