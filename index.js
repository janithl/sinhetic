'use strict';

var ESCAPE_KEY  = 27;
var ENTER_KEY   = 13;
var SPACE_BAR   = 32;

var React       = require('react');
var ReactDOM    = require('react-dom');
var Sinhala     = require('./js/sinhala');

var sinhala     = new Sinhala();

var Sinhetic = React.createClass({
  getInitialState: function () {
    return { 
      wordlist  : [], 
      customdict: [], 
      editing   : null,
      curlatext : '',
      cursitext : '',
    };
  },

  handleSubmit: function (event) {
    var val = this.state.curlatext.trim();
    if (val) {
      this.setState({
        wordlist: this.state.wordlist.concat({ 'la': this.state.curlatext.trim(), 'si': this.state.cursitext.trim() }),
        curlatext: '',
        cursitext: '',
      });
    }
  },

  handleKeyDown: function (event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({ curlatext: '', cursitext: '' });
    } else if (event.which === ENTER_KEY || event.which === SPACE_BAR) {
      this.handleSubmit(event);
    }
  },

  handleChange: function (event) {
    this.setState({
      cursitext: sinhala.fromLatin(event.target.value),
      curlatext: event.target.value,
    });
  },

  render: function () {
    return (
      <div>
        <ul>
        {
          this.state.wordlist.map(function(w) {
            return <li>{w.si}</li>;
          })
        }
        </ul>
        <ul>
          <li>{ this.state.cursitext }</li>
        </ul>
        <input
            ref="entertext"
            value={this.state.curlatext}
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
