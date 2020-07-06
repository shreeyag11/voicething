var grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
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

recognition.onresult = function (event) {
    var color = event.results[0][0].transcript;
    diagnostic.textContent = 'Result received: ' + color;
    bg.style.backgroundColor = color;
    recognition.abort();
    recognition.start();
}