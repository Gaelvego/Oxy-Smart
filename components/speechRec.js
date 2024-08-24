

// Function to start speech recognition
function startListening() {
    if ("webkitSpeechRecognition" in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log('You said:', transcript);

            // Check if the user asked for vital signs
            if (transcript.includes('vital signs')) {
                // Replace this with the logic to retrieve and read the user's vital signs
                const vitalSigns = "Your vital signs are normal. Heart rate: 75, Blood pressure: 120/80.";
                
                // Call the function to read out the vital signs
                readOutLoud(vitalSigns);
            }
        };

        recognition.start();
    }
}

// Function to read out loud
function readOutLoud(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}
