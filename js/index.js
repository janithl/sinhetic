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

var SinhalaDict = require('./sinhaladict');
var Sinhala     = require('./sinhala');
var sinhala     = new Sinhala();

var Word = React.createClass({
	select: function(event) {
		this.props.onSelect(this.props.nodeid);
	},
	render: function() {
		return <div className="word" onClick={this.select}>{this.props.text}</div>
	}
});

var Sinhetic = React.createClass({
	getInitialState: function () {
		return { 
			wordlist  : [], 
			customdict: [], // TODO: implement the custom dictionary
			autosug   : [],
			editing   : null,
			curlatext : '',
			cursitext : '',
		};
	},

	selectSuggestion: function(nodeid) {
		this.setState({
			curlatext 	: sinhala.toLatin(this.state.autosug[nodeid]),
			cursitext 	: this.state.autosug[nodeid]
		});

		setTimeout(this.handleSubmit, 50);
	},

	editWord: function(nodeid) {
		this.setState({
			editing		: nodeid,
			curlatext 	: this.state.wordlist[nodeid].la,
			cursitext 	: this.state.wordlist[nodeid].si,
		});

		this.autosuggest(this.state.wordlist[nodeid].si);
	},

	editWordlist: function(action, word) {
		var wordlist = this.state.wordlist;
		switch(action) {
			case 'append':
				wordlist = wordlist.concat(word);
				break;
			case 'edit':
				wordlist[this.state.editing] = word;
				break;
			case 'delete':
				wordlist.splice(this.state.editing, 1);
				break;
		}

		this.setState({ 
			wordlist 	: wordlist,
			curlatext	: '',
			cursitext	: '',
			autosug 	: [],
			editing 	: null
		});
	},

	handleDelete: function (event) {
		this.editWordlist('delete');
	},

	handleClear: function (event) {
		this.setState(this.getInitialState);
	},

	handleSubmit: function (event) {
		var val = this.state.curlatext.trim();
		if (val) {
			var word = { 'la': this.state.curlatext.trim(), 'si': this.state.cursitext.trim() };
			if(this.state.editing !== null) {
				this.editWordlist('edit', word);
			}
			else {
				this.editWordlist('append', word);
			}
		}
	},

	handleKeyDown: function (event) {
		if (event.which === ESCAPE_KEY) {
			this.setState({ curlatext: '', cursitext: '', autosug: [], editing: null });
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

		if (sitext) { this.autosuggest(sitext); }
	},

	autosuggest: function(text) {
		var regexp = new RegExp(text, 'i'); 
		this.setState({
			autosug   : _.filter(SinhalaDict, function(elem) { return regexp.test(elem); }).slice(0,5)
		});
	},

	render: function () {
		var _self = this;
		var deleteButton = this.state.editing !== null ? <button className="btn btn-negative deletebtn" onClick={this.handleDelete}><span className="icon icon-trash"/></button> : null;
		var dictionary = this.state.cursitext.length ? <div className="word">{ this.state.cursitext }</div> : null;

		return (
			<div>
				<header className="bar bar-nav">
					<button className="btn btn-link btn-nav pull-left" onClick={this.handleClear}>
						<span className="icon icon-close"/>
						Clear All
					</button>
					<h1 className="title"></h1>
				</header>
				
				<div className="content">
					<div className="translation">
					{
						this.state.wordlist.map(function(w, index) {
							return <Word key={index} nodeid={index} text={w.si} onSelect={_self.editWord} />;
						})
					}
					</div>
				</div>
				
				<nav className="bar bar-tab bar-bottom">
					{deleteButton}
					<div className="dictionary">
						{dictionary}
						{
							this.state.autosug.map(function(w, index) {
								return <Word key={index} nodeid={index} text={w} onSelect={_self.selectSuggestion} />;
							})
						}
					</div>
					<input
							ref="entertext"
							type="text" 
							placeholder="Type Something..." 
							value={this.state.curlatext}
							onChange={this.handleChange}
							onKeyDown={this.handleKeyDown}
							autocorrect="off" 
							autocapitalize="off" 
							autofocus/>
				</nav>
			</div>
		);
	}
});

ReactDOM.render(
	<Sinhetic />,
	document.getElementById('container')
);
