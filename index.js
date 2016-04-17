/**
 * Transliterator app to convert Latin script phonetic Sinhala to Unicode Sinhala
 * https://github.com/janithl/sinhetic
 * 17/04/2016
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 Janith Leanage
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */

'use strict';

var ESCAPE_KEY  = 27;
var ENTER_KEY   = 13;
var SPACE_BAR   = 32;

var React       = require('react');
var ReactDOM    = require('react-dom');
var _           = require('lodash');

var SinhalaDict = require('./js/sinhaladict');
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
      autosug   : [],
    };
  },

  handleSubmit: function (event) {
    var val = this.state.curlatext.trim();
    if (val) {
      this.setState({
        wordlist: this.state.wordlist.concat({ 'la': this.state.curlatext.trim(), 'si': this.state.cursitext.trim() }),
        curlatext : '',
        cursitext : '',
        autosug   : []
      });
    }
  },

  handleKeyDown: function (event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({ curlatext: '', cursitext: '', autosug: [] });
    } else if (event.which === ENTER_KEY || event.which === SPACE_BAR) {
      this.handleSubmit(event);
    }
  },

  handleChange: function (event) {
    var sitext = sinhala.fromLatin(event.target.value).trim();
    this.setState({
      cursitext : sitext,
      curlatext : event.target.value,
    });

    if (sitext) {
      var regexp = new RegExp(sitext, 'i'); 
      this.setState({
        autosug   : _.filter(SinhalaDict, function(elem) { return regexp.test(elem); }).slice(0,5)
      });
    }
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
          {
            this.state.autosug.map(function(w) {
              return <li>{w}</li>;
            })
          }
        </ul>
        <input
            ref="entertext"
            value={this.state.curlatext}
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
