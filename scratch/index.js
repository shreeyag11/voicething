import { data, grammar } from './probs.js';

var recognition = new webkitSpeechRecognition();
var speechRecognitionList = new webkitSpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');

document.body.onclick = function () {
    recognition.start();
    console.log('Ready to receive a color command.');
}
console.log(recognition)

recognition.onspeechstart = () => console.log("speech started");
recognition.onspeechend = () => console.log("speech started");
recognition.onaudiostart = () => console.log("audio started");
recognition.onaudioend = () => console.log("audio started");
recognition.onsoundstart = () => console.log("sound started");
recognition.onsoundend = () => console.log("sound started");
recognition.onnomatch = () => console.log("no match");
recognition.onstart = () => console.log("start");
recognition.onend = () => console.log("end");

document.querySelector(".stop").onclick = function () {
    recognition.stop();
    console.log('Ready to receive a color command.');
}

function predict(data, word) {
    labels = Object.keys(data['13'])
    console.log(labels);
}

recognition.onresult = function (event) {
    var word = event.results[0][0].transcript;
    diagnostic.textContent = 'Result received: ' + predict(data, word);
    // bg.style.backgroundColor = color;
    recognition.abort();
    recognition.start();
}