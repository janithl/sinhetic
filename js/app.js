/**
 * Transliterator app to convert Latin script phonetic Sinhala to Unicode Sinhala
 * https://github.com/janithl/sinhetic
 * 19/04/2014
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Janith Leanage
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

var tr = {
	content		: null,
	pinput		: null,
	dict		: null,
	deletebtn	: null,
	output		: null,

	editing		: null,
	wordlist	: [],
	customdict	: [],
	
	create: function() {
		tr.trans		= document.getElementById("translation");
		tr.pinput		= document.getElementById("pinput");
		tr.dict			= document.getElementById("dictionary");
		tr.deletebtn	= document.getElementById("deletebtn");
		tr.output		= document.getElementById("output");
		
		/** get user dictionary of words */
		if(window.localStorage.customdict != null) {
			tr.customdict = window.localStorage.customdict.split(',');
		}
	},
	
	engToSin: function(e) {
		/** 
			if an enter key or the space bar has been pressed, add word
			to wordlist. If multiple words have been entered, enter just the 
			first word into wordlist 
		*/
		if((e.keyCode == 13 || e.keyCode == 32 || _.last(tr.pinput.value) == ' ') && tr.pinput.value.replace(/\s/g, '') != '') {
			var words = tr.pinput.value.split(' ');
			tr.addWord(Sinhala.fromLatin(words[0]), words[0]);
			tr.pinput.value = (words.length > 1) ? words.slice(1).join(' ') : '';
		}
		
		/** translate latin input into sinhala unicode output */
		if(tr.pinput.value.replace(/\s/g, '') != '') {
			var s = Sinhala.fromLatin(tr.pinput.value);
			tr.dict.innerHTML	= '<div class="word activeword">' + s + '</div>';
			var regexp			= new RegExp(s, 'i'); 
			
			/** async dictionary lookup */
			setTimeout(function() {
				/** custom dictionary + standard dictionary */
				var matches = _.filter(tr.customdict.concat(SinhalaDict), function(elem) {
					return regexp.test(elem);
				});
				
				/** display matches. slice just 9 elements out of the array for speed */
				if(matches.length > 0) {
					tr.dict.innerHTML += '<div class="word" onclick="tr.addWord(this.innerHTML)">' + matches.slice(0,9).join('</div><div class="word" onclick="tr.addWord(this.innerHTML)">') + '</div>';
				}
			}, 0);
		}
		else {
			tr.dict.innerHTML = '';
		}
	},
	
	addWord: function(si, lat) {
		/** get latin reverse-translation if there is no latin text */
		if(lat == null) {
			lat = Sinhala.toLatin(si);
		}
		
		/** if we're not in editing mode... */
		if(tr.editing == null) {
			/** ...add word to wordlist, empty out input and dictionary lookup */
			tr.trans.innerHTML += '<div onclick="tr.editWord(' + tr.wordlist.length + ')" class="word">' + si + '</div>';
			tr.wordlist.push({ lat: lat, si: si });
		}
		else {
			/** if we are in editing mode, edit wordlist entry and render */
			tr.wordlist[tr.editing] 	= { lat: lat, si: si };
			tr.editing					= null;
			
			tr.renderWordList();
			tr.deletebtn.style.display	= 'none';
		}
		
		tr.dict.innerHTML	= '';
		tr.pinput.value		= '';
		tr.pinput.focus();
	},
	
	renderWordList: function() {
		/** when the whole wordlist needs to be re-rendered */
		var output = '';
		for(var i = 0; i < tr.wordlist.length; i++) {
			output += '<div onclick="tr.editWord(' + i + ')" class="word">' + tr.wordlist[i].si + '</div>';
		}
		tr.trans.innerHTML = output;
	},

	copyText: function() {
		/** copy output to text area, and select it for copy paste */
		tr.output.value			= _.pluck(tr.wordlist, 'si').join(' ');
		tr.output.style.display	= 'block';
		tr.trans.style.display	= 'none';
		tr.output.focus();
		tr.output.select();
		
		/** async save user dictionary */
		setTimeout(function() {
			tr.customdict = _.uniq(tr.customdict.concat(_.pluck(tr.wordlist, 'si')));
			window.localStorage.customdict = tr.customdict.join(',');
		}, 0);
	},
	
	hideOutput: function() {
		/** get rid of output text area after copy */
		tr.output.style.display	= 'none';
		tr.trans.style.display	= 'block';
	},
	
	clearWords: function() {
		/** clear all the words from the wordlist */
		if(window.confirm('Are you sure you want to clear all text?')) { 
			tr.wordlist			= [];
			tr.trans.innerHTML	= '';
		}
	},
	
	editWord: function(index) {
		/** edit a word already in the wordlist */
		tr.editing 					= index;
		tr.dict.innerHTML			= '<div class="word activeword">' + tr.wordlist[index].si + '</div>';;
		tr.pinput.value				= tr.wordlist[index].lat;
		tr.deletebtn.style.display	= 'block';
		tr.pinput.focus();
	},
	
	deleteWord: function() {
		/** delete a word in the wordlist */
		if(tr.editing != null) {
			tr.wordlist.splice(tr.editing, 1);
			tr.editing					= null;
			tr.renderWordList();
			tr.deletebtn.style.display	= 'none';

			tr.dict.innerHTML	= '';
			tr.pinput.value		= '';
			tr.pinput.focus();
		}
	}
}

document.addEventListener("deviceready", tr.create, false);
