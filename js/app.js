/**
 * Transliterator app to convert latin script phonetic Sinhala to Unicode Sinhala
 * https://github.com/janithl/sinhetic
 * 19/04/2014
 */

var tr = {
	content		: null,
	pinput		: null,
	dict		: null,
	editing		: null,
	wordlist	: [],
	
	create: function() {
		tr.trans	= document.getElementById("translation");
		tr.pinput	= document.getElementById("pinput");
		tr.dict		= document.getElementById("dictionary");
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
				var matches = _.filter(SinhalaDict, function(elem) {
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
			tr.wordlist[tr.editing] = { lat: lat, si: si };
			tr.editing				= null;
			
			tr.renderWordList();
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
		//window.plugins.copy(tr.wordlist.join(' '));
		alert('Text Copied to Clipboard: ' + _.pluck(tr.wordlist, 'si').join(' ')); // change to toast
	},
	
	clearWords: function() {
		/** clear all the words from the wordlist */
		if(window.confirm('Are you sure you want to clear all text?')) { 
			tr.wordlist			= [];
			tr.trans.innerHTML	= '';
		}
	},
	
	editWord: function(index) {
		tr.editing 			= index;
		tr.dict.innerHTML	= tr.wordlist[index].si;
		tr.pinput.value		= tr.wordlist[index].lat;
		tr.pinput.focus();
	}
}

document.addEventListener("deviceready", tr.create, false);
