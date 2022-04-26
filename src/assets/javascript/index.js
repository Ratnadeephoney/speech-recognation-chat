function testdeepu(a,b,c)
{
    
    alert("javascript: "+a+b+c)
    return a+b+c;
}


function runSpeechRecognition(sr) {
    let srOutput;
               
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    
    // This runs when the speech recognition service starts
    recognition.onstart = function() {
    //action.innerHTML = "<small>listening</small>";
            //document.getElementById("recmic").style.visibility = "visible";
        };
    
        recognition.onspeechend = function() {
            //action.innerHTML = "<small>stopped listening</small>";
            //document.getElementById("recmic").style.visibility = "hidden";
            recognition.stop();
        }
    
        // This runs when the speech recognition service returns result
        recognition.onresult = function(event) {
            var transcript = event.results[0][0].transcript;
            var confidence = event.results[0][0].confidence;
            //output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence*100+"%";
            //output.classList.remove("hide");
            //op = output.innerHTML=transcript;
            //output.innerHTML = transcript
            console.log(transcript)
            alert(transcript)
            sr = transcript
            return sr
        };
    
         // start recognition
         recognition.start();
    
         //return op
         //textToAudio();

         return srOutput
    }
// $(function(){
//     alert('hell')
// })