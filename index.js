'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Sinhetic = React.createClass({
  getInitialState: function () {
    return { 
      wordlist  : [], 
      customdict: [], 
      editing   : null 
    };
  },
  handleClick: function () {
    this.setState({
      wordlist: this.state.wordlist.concat('word'),
    });
  },
  render: function () {
    return (
      <div>
        <ul>
        {
          this.state.wordlist.map(function(w) {
            return <li>{w}</li>;
          }
        )}
        </ul>
        <button onClick={this.handleClick}>
          Click me! Number of clicks: {this.state.wordlist.length}
        </button>
      </div>
    );
  }
});

ReactDOM.render(
  <Sinhetic />,
  document.getElementById('container')
);
