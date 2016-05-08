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

/** custom word component to display words in both autosuggest and wordlist */
var Word = React.createClass({
	select: function(event) {
		this.props.onSelect(this.props.nodeid);
	},
	render: function() {
		return <div className="word" onClick={this.select}>{this.props.text}</div>
	}
});

/** main react component */
var Sinhetic = React.createClass({
	getInitialState: function () {
		return { 
			wordlist  : [], 
			customdict: [],
			autosug   : [],
			editing   : null,
			curlatext : '',
			cursitext : '',
		};
	},

	componentDidMount: function() {
		var customdict = [];

		/** load the user dictionary of words, if available */
		if(window.localStorage.customdict != null) {
			customdict = window.localStorage.customdict.split(',');
		}

		/** append user dictionary and standard dictionary into customdict, for autosuggest */
		this.setState({ customdict: _.uniq(SinhalaDict.concat(customdict)) });
	},

	/** when a user clicks on a suggestion from the autosuggest list, select it as 
	the submission by putting its values as app state */
	selectSuggestion: function(nodeid) {
		this.setState({
			curlatext 	: sinhala.toLatin(this.state.autosug[nodeid]),
			cursitext 	: this.state.autosug[nodeid]
		});

		setTimeout(this.handleSubmit, 50);
	},

	/** when a user clicks on a word in the wordlist to edit, set editing mode (with word index),
	and set word values as app state */
	editWord: function(nodeid) {
		this.setState({
			editing		: nodeid,
			curlatext 	: this.state.wordlist[nodeid].la,
			cursitext 	: this.state.wordlist[nodeid].si,
		});

		this.autosuggest(this.state.wordlist[nodeid].si);
	},

	/** handle various edit actions on the wordlist: append, edit and delete */
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

	/** on submitting a word, edit or append to wordlist depending on editing mode */
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

	/** if escape key, exit editing mode. if enter or space key, submit textbox value to append/edit */
	handleKeyDown: function (event) {
		if (event.which === ESCAPE_KEY) {
			this.setState({ curlatext: '', cursitext: '', autosug: [], editing: null });
		} else if (event.which === ENTER_KEY || event.which === SPACE_BAR) {
			this.handleSubmit(event);
		}
	},

	/** handler for changes to the input textbox, updates state vars that are tied to textbox */
	handleChange: function (event) {
		var sitext = sinhala.fromLatin(event.target.value).trim();
		this.setState({
			cursitext : sitext,
			curlatext : event.target.value,
		});

		if (sitext) { this.autosuggest(sitext); }
	},

	/** shows autosuggest list based on input */
	autosuggest: function(text) {
		var regexp = new RegExp(text, 'i'); 
		this.setState({
			autosug : _.filter(this.state.customdict, function(elem) { return regexp.test(elem); }).slice(0,5)
		});
	},

	/** render function. displays delete button if in editing mode, and displays current 
	word at the start of autosuggest if input isn't empty */
	render: function () {
		var _self = this;
		var deletebtn = this.state.editing !== null ? <button className="btn btn-negative deletebtn" onClick={this.handleDelete}><span className="icon icon-trash"/></button> : null;
		var curword = this.state.cursitext.length ? <div className="word">{ this.state.cursitext }</div> : null;

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
					{deletebtn}
					<div className="dictionary">
						{curword}
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
						autofocus />
				</nav>
			</div>
		);
	}
});

ReactDOM.render(
	<Sinhetic />,
	document.getElementById('container')
);