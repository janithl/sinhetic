var Sinhala	= {
	vowels: 	[	{ si: 'ඌ',	lat: 'oo',		mod: 'ූ'	}, 
					{ si: 'ඕ',	lat: 'o\\)',	mod: 'ෝ'	}, 
					{ si: 'ඕ',	lat: 'oe',		mod: 'ෝ'	}, 
					{ si: 'ආ',	lat: 'aa',		mod: 'ා'	}, 
					{ si: 'ආ',	lat: 'a\\)',	mod: 'ා'	}, 
					{ si: 'ඈ',	lat: 'Aa',		mod: 'ෑ'	}, 
					{ si: 'ඈ',	lat: 'A\\)',	mod: 'ෑ'	}, 
					{ si: 'ඈ',	lat: 'ae',		mod: 'ෑ'	}, 
					{ si: 'ඊ',	lat: 'ii',		mod: 'ී'	}, 
					{ si: 'ඊ',	lat: 'i\\)',	mod: 'ී'	}, 
					{ si: 'ඊ',	lat: 'ie',		mod: 'ී'	}, 
					{ si: 'ඊ',	lat: 'ee',		mod: 'ී'	}, 
					{ si: 'ඒ',	lat: 'ea',		mod: 'ේ'	}, 
					{ si: 'ඒ',	lat: 'e\\)',	mod: 'ේ'	}, 
					{ si: 'ඒ',	lat: 'ei',		mod: 'ේ'	}, 
					{ si: 'ඌ',	lat: 'uu',		mod: 'ූ'	}, 
					{ si: 'ඌ',	lat: 'u\\)',	mod: 'ූ'	}, 
					{ si: 'ඖ',	lat: 'au',		mod: 'ෞ'	}, 
					{ si: 'ඇ',	lat: '/\a',		mod: 'ැ'	},
					{ si: 'අ',	lat: 'a', 		mod: ''		}, 
					{ si: 'ඇ',	lat: 'A', 		mod: 'ැ'	}, 
					{ si: 'ඉ',	lat: 'i', 		mod: 'ි'	}, 
					{ si: 'එ',	lat: 'e', 		mod: 'ෙ'	}, 
					{ si: 'උ',	lat: 'u', 		mod: 'ු'	}, 
					{ si: 'ඔ',	lat: 'o', 		mod: 'ො'	}, 
					{ si: 'ඓ',	lat: 'I', 		mod: 'ෛ'	}],
					
	special:	[   {	si: 'ෘ',			lat: 'ru' 	},
					{	si: 'ෲ',			lat: 'ruu'	}],
					
	specialCon:	[	{	si: 'ඍ',			lat: '\\R'	},
					{	si: 'ර්'+'\u200D',	lat: 'R'	},
					{	si: 'ර්'+'\u200D',	lat: '\\r'	},
					{	si: 'ං',			lat: '\\n'	},
					{	si: 'ඃ',			lat: '\\h'	},
					{	si: 'ඞ',			lat: '\\N'	}],
				
	consonants: [	{ si: 'ඬ',		lat: 'nnd'			}, 
					{ si: 'ඳ',		lat: 'nndh'			}, 
					{ si: 'ඟ',		lat: 'nng'			}, 
					{ si: 'ථ',		lat: 'Th'			}, 
					{ si: 'ධ',		lat: 'Dh'			}, 
					{ si: 'ඝ',		lat: 'gh'			}, 
					{ si: 'ඡ',		lat: 'Ch'			}, 
					{ si: 'ඵ',		lat: 'ph'			}, 
					{ si: 'භ',		lat: 'bh'			}, 
					{ si: 'ශ',		lat: 'sh'			}, 
					{ si: 'ෂ',		lat: 'Sh'			}, 
					{ si: 'ඥ',		lat: 'GN'			}, 
					{ si: 'ඤ',		lat: 'KN'			}, 
					{ si: 'ළු',		lat: 'Lu'			}, 
					{ si: 'ද',		lat: 'dh'			}, 
					{ si: 'ච',		lat: 'ch'			}, 
					{ si: 'ඛ',		lat: 'kh'			}, 
					{ si: 'ත',		lat: 'th'			}, 
					{ si: 'ට',		lat: 't'			}, 
					{ si: 'ක',		lat: 'k'			},     
					{ si: 'ඩ',		lat: 'd'			}, 
					{ si: 'න',		lat: 'n'			}, 
					{ si: 'ප',		lat: 'p'			}, 
					{ si: 'බ',		lat: 'b'			}, 
					{ si: 'ම',		lat: 'm'			},    
					{ si: '‍ය',	lat: '\\u005C' + 'y'}, 
					{ si: '‍ය',	lat: 'Y'			}, 
					{ si: 'ය',		lat: 'y'			}, 
					{ si: 'ජ',		lat: 'j'			}, 
					{ si: 'ල',		lat: 'l'			}, 
					{ si: 'ව',		lat: 'v'			}, 
					{ si: 'ව',		lat: 'w'			}, 
					{ si: 'ස',		lat: 's'			}, 
					{ si: 'හ',		lat: 'h'			}, 
					{ si: 'ණ',		lat: 'N'			}, 
					{ si: 'ළ',		lat: 'L'			}, 
					{ si: 'ඛ',		lat: 'K'			}, 
					{ si: 'ඝ',		lat: 'G'			}, 
					{ si: 'ඨ',		lat: 'T'			}, 
					{ si: 'ඪ',		lat: 'D'			}, 
					{ si: 'ඵ',		lat: 'P'			}, 
					{ si: 'ඹ',		lat: 'B'			}, 
					{ si: 'ෆ',		lat: 'f'			}, 
					{ si: 'ඣ',		lat: 'q'			}, 
					{ si: 'ග',		lat: 'g'			}, 
					{ si: 'ර',		lat: 'r'			}],
					
	fromLatin: function(word) {
		
		// special consonants
		_.each(Sinhala.specialCon, function(ch) { word = word.replace(ch.lat, ch.si); });
		
		// consonants + special chars
		_.each(Sinhala.special, function(ch1) { 
			_.each(Sinhala.consonants, function(ch2) { 
				word = word.replace(new RegExp(ch1.lat + ch2.lat, 'g'), ch1.si + ch2.si);
			});
		});
		
		// consonants + rakaransha + vowel modifiers
		_.each(Sinhala.consonants, function(ch1) { 
			_.each(Sinhala.vowels, function(ch2) { 
				word = word.replace(new RegExp(ch1.lat + 'r' + ch2.lat, 'g'), ch1.si + '්‍ර' + ch2.si);
			});
		});
		
		// consonents + vowel modifiers
		_.each(Sinhala.consonants, function(ch1) { 
			_.each(Sinhala.vowels, function(ch2) { 
				word = word.replace(new RegExp(ch1.lat + ch2.lat, 'g'), ch1.si + ch2.mod);
			}); 
		});
		
		// consonents + HAL
		_.each(Sinhala.consonants, function(ch) { 
			word = word.replace(new RegExp(ch.lat, 'g'), ch.si + '්');
		});
		
		// vowels
		_.each(Sinhala.vowels, function(ch) { 
			word = word.replace(new RegExp(ch.lat, 'g'), ch.si);
		});
		
		return word;
	},
	
	toLatin: function(word) {

		// special consonants
		_.each(Sinhala.specialCon, function(ch) { word = word.replace(new RegExp(ch.si, 'g'), ch.lat); });
		
		// consonants + special chars
		_.each(Sinhala.special, function(ch1) { 
			_.each(Sinhala.consonants, function(ch2) { 
				word = word.replace(new RegExp(ch1.si + ch2.si, 'g'), ch1.lat + ch2.lat);
			});
		});
		
		// consonants + rakaransha + vowel modifiers
		_.each(Sinhala.consonants, function(ch1) { 
			_.each(Sinhala.vowels, function(ch2) { 
				word = word.replace(new RegExp(ch1.si + '්‍ර' + ch2.si, 'g'), ch1.lat + 'r' + ch2.lat);
			});
		}); 
		
		word = word.split('');
		
		// consonents + vowel modifiers + HAL
		_.each(Sinhala.consonants, function(ch1) { 
			for(var i = 0; i < word.length; i++) {
				if(ch1.si == word[i]) { 
					/** if next letter is nonexistant, this is a 'a' sound */
					/** if next letter is HAL, this is a HAL */
					if(i == word.length - 1) {
						word[i] = ch1.lat + 'a';
					}
					else if(word[i + 1] == '්') {
						word[i]		= ch1.lat;
						word[i + 1] = '';
					}
					else {
						var modifier = false;
						/* if next letter is a vowel modifier, give it the vowel name */
						_.each(Sinhala.vowels, function(ch2) { 
							if(ch2.mod == word[i + 1]) { 
								word[i] 	= ch1.lat;
								word[i + 1] = ch2.lat;
								modifier	= true;
							}
						});
						
						/* else it's a consonent with 'a' sound */
						if(!modifier) {
							word[i] = ch1.lat + 'a';
						}
					}
						
					
				}
			}
		});
		
		word = word.join('');
		
		// vowels
		_.each(Sinhala.vowels, function(ch) { 
			word = word.replace(new RegExp(ch.si, 'g'), ch.lat);
		});
		
		// strip out any stragglers	
		return word.replace(/[\u0D80-\u0DFF]/ig, '');
	}		
};
