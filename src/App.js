import React from 'react';
import './App.css';
import * as math from 'mathjs';

class Output extends React.Component {
  render() {
    const output = this.props.data.join("");
    return (
      <div id="output" className="lead text-right text-light mr-1">
        {output}
      </div>
    );
  }
}

class Input extends React.Component {
  render() {
    const input = this.props.data.join("");
    return (
      <div id="display" className="text-right text-monospace text-warning mr-1">
        {input}
      </div>
    );
  }
}

class Buttons extends React.Component {
  render() {
    return (
      <div id="calc-pad" className="d-flex flex-wrap">
        <button id="clear" value="clear" onClick={this.props.onClick}>
          C
        </button>
        <button id="decimal" value="." onClick={this.props.onClick}>
          .
        </button>
        <button id="multiply" value="*" onClick={this.props.onClick}>
          x
        </button>
        <button id="seven" value="7" onClick={this.props.onClick}>
          7
        </button>
        <button id="eight" value="8" onClick={this.props.onClick}>
          8
        </button>
        <button id="nine" value="9" onClick={this.props.onClick}>
          9
        </button>
        <button id="subtract" value="-" onClick={this.props.onClick}>
          -
        </button>
        <button id="four" value="4" onClick={this.props.onClick}>
          4
        </button>
        <button id="five" value="5" onClick={this.props.onClick}>
          5
        </button>
        <button id="six" value="6" onClick={this.props.onClick}>
          6
        </button>
        <button id="add" value="+" onClick={this.props.onClick}>
          +
        </button>
        <button id="one" value="1" onClick={this.props.onClick}>
          1
        </button>
        <button id="two" value="2" onClick={this.props.onClick}>
          2
        </button>
        <button id="three" value="3" onClick={this.props.onClick}>
          3
        </button>
        <button id="divide" value="/" onClick={this.props.onClick}>
          /
        </button>
        <button id="zero" value="0" onClick={this.props.onClick}>
          0
        </button>
        <button id="equals" value="equal" onClick={this.props.onClick}>
          =
        </button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operations: [0],
      output: [],
      decimal: false,
      operator: false
    };
  }

  calculateOperations = () => {
    let result = this.state.operations.join("");
    if (result) {
      result = math.eval(result);
      result = math.format(result, { precision: 10 });
      result = String(result);
      this.setState({
        operations: [result],
        output: [result]
      });
    }
  };

  handleClick = e => {
    const value = e.target.getAttribute("value");
    const oper = /[/+*-]/;
    switch (value) {
      case "clear":
        this.setState({
          operations: [0],
          output: [],
          decimal: false,
          operator: false
        });
        break;
      case "equal":
        this.calculateOperations();
        break;
      case ".":
        if (
          this.state.operations.slice(-1) !== "." &&
          this.state.decimal === false
        ) {
          this.state.operations.push(value);
        }
        this.setState({
          operations: this.state.operations,
          decimal: true,
          operator: false
        });
        break;
      case "+":
      case "*":
      case "-":
      case "/":
        if (
          this.state.operator === false &&
          !oper.test(this.state.operations.slice(-1))
        ) {
          this.state.operations.push(value);
        } else if (oper.test(this.state.operations.slice(-1))) {
          this.state.operations.pop();
          this.state.operations.push(value);
        }
        this.setState({
          operations: this.state.operations,
          decimal: false,
          operator: true
        });
        break;

      default:
      // eslint-disable-next-line
        if (this.state.operations == 0) this.state.operations.pop();
        this.state.operations.push(value);
        this.setState({
          operations: this.state.operations,
          operator: false
        });
        break;
    }
  };

  render() {
    return (
      
      <div id="calculator" className="bg-dark">
        <Output data={this.state.output} />
        <Input data={this.state.operations} />
        <Buttons onClick={this.handleClick} />
      </div>
      
    );
  }
}

export default App;
