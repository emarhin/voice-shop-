import React ,{useEffect,useState}from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit'


const Dictaphone = () => {
    const [message, setMessage] = useState('')
 
  const { speak } = useSpeechSynthesis();

  const commands = [
    {
      command: 'I would like to order *',
      callback: (food) => setMessage(`Your order is for: ${food}`)
    },
    {
      command: 'The weather is :condition today',
      callback: (condition) => setMessage(`Today, the weather is ${condition}`)
    },
    {
      command: 'My top sports are * and *',
      callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
    },
    {
      command: 'Pass the salt (please)',
      callback: () => setMessage('My pleasure')
    },
    {
      command: ['Hello', 'Hi'],
      callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
      matchInterim: true
    },
    {
      command: 'Beijing',
      callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2
    },
    {
      command: ['eat', 'sleep', 'leave'],
      callback: (command) => setMessage(`Best matching command: ${command}`),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true
    },
    {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript()
    }
  ]

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
        } = useSpeechRecognition({ commands })



        useEffect(()=>{
           speak({text:message})
           
            
            setTimeout(function(){
                SpeechRecognition.startListening()  
            }, 3000); 
          
        
        

          },[message])
        

    useEffect(()=>{
       
    if(listening == false){
        console.log(transcript)   
    }
  },[listening])

  const start=()=>{
    setTimeout(function(){
        SpeechRecognition.startListening()  
    }, 3000); 
  }





  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
     
      <hr/>
      <button onClick={SpeechRecognition.startListening }>Start</button>
      <hr/>


      <button onClick={()=>{speak({ text: "Welcome" }) ,start()}}>speak</button>
      <hr/>

      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;







// // using the react hook

// import React ,{useEffect}from 'react';
// import useSpeechToText from 'react-hook-speech-to-text';

// export default function AnyComponent() {
//   const {
//     error,
//     interimResult,
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//   } = useSpeechToText({
//     continuous: true,
//     useLegacyResults: false
//   });

//   if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

//   useEffect(()=>{
//     if(isRecording == isRecording){
//         console.log(results)
//     }
//   },[isRecording])

//   return (
//     <div>
//       <h1>Recording: {isRecording.toString()}</h1>
//       <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
//         {isRecording ? 'Stop Recording' : 'Start Recording'}
//       </button>
//       <ul>
//         {results.map((result) => (
//           <li key={result.timestamp}>{result.transcript}</li>
//         ))}
//         {interimResult && <li>{interimResult}</li>}
//       </ul>
//     </div>
//   );
// }