var phrases = ['Good to see you again', 'Hello there', 'Hello, Comrade', 
'Hey, you', 'Looking good today', 'Hey, beautiful', 'Guten Tag', '你好', 
'Hallo', 'Nice day, isn\'t it', 'You look awesome', 'Hope you\'re having a great day'];

var punctuation = ['.', '!'];

function getPhrase()
{
	var rand_phrase = Math.floor((Math.random() * phrases.length));
	var rand_punctuation = Math.floor((Math.random() * punctuation.length));

	return phrases[rand_phrase] + punctuation[rand_punctuation];
}