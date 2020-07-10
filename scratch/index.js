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

function predict(data, query) {
    let labels = Object.keys(data['13'])
    let prediction = {};

    labels.forEach(label => prediction[label] = 1);

    labels.forEach(label => {
        let allZero = true;
        query.split(" ").forEach(word => {
            if (data[word]) {
                if (data[word][label] != 0) {
                    prediction[label] *= data[word][label];
                    allZero = false;
                }
            } else {
                console.log(word)
            }
        })
        if (allZero)
            prediction[label] = 0;
    })

    let max = 0;
    let result = "";
    console.log(prediction);
    Object.keys(prediction).forEach(label => {
        let prob = prediction[label];
        if (prob > max) {
            max = prob;
            result = label;
        }
    })

    return result;

}

recognition.onresult = function (event) {
    var word = event.results[0][0].transcript;
    console.log(word);
    diagnostic.textContent = 'Result received: ' + predict(data, word);
    // bg.style.backgroundColor = color;
    recognition.abort();
    recognition.start();
}