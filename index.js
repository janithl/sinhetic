'use strict';

var ESCAPE_KEY  = 27;
var ENTER_KEY   = 13;
var SPACE_BAR   = 32;

var React       = require('react');
var ReactDOM    = require('react-dom');

var Sinhetic = React.createClass({
  getInitialState: function () {
    return { 
      wordlist  : [], 
      customdict: [], 
      editing   : null,
      curtext   : '',
    };
  },

  handleSubmit: function (event) {
    var val = this.state.curtext.trim();
    if (val) {
      this.setState({
        wordlist: this.state.wordlist.concat(val),
        curtext: ''
      });
    }
  },

  handleKeyDown: function (event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({ curtext: '' });
    } else if (event.which === ENTER_KEY || event.which === SPACE_BAR) {
      this.handleSubmit(event);
    }
  },

  handleChange: function (event) {
    this.setState({ curtext: event.target.value });
  },

  render: function () {
    return (
      <div>
        <ul>
        {
          this.state.wordlist.map(function(w) {
            return <li>{w}</li>;
          })
        }
        </ul>
        <input
            ref="entertext"
            value={this.state.curtext}
            onBlur={this.handleSubmit}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}/>
      </div>
    );
  }
});

ReactDOM.render(
  <Sinhetic />,
  document.getElementById('container')
);
