import { useCallback, useRef } from 'react';
import { useVoiceStore } from '../store/voiceStore';

export const useSpeechRecognition = () => {
  const { setTranscript } = useVoiceStore();
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startRecognition = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      try {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
          recognitionRef.current = null;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          throw new Error('Speech recognition is not supported in this browser');
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          console.log('Speech recognition started');
          resolve();
        };

        recognition.onresult = (event: Event) => {
          const speechEvent = event as SpeechRecognitionEvent;
          const current = speechEvent.resultIndex;
          const transcript = speechEvent.results[current][0].transcript;
          console.log('Transcript:', transcript);
          setTranscript(transcript);
        };

        recognition.onerror = (event: Event) => {
          const errorEvent = event as SpeechRecognitionErrorEvent;
          console.error('Speech recognition error:', errorEvent.error);
          setTranscript('Error: ' + errorEvent.error);
          reject(new Error(errorEvent.error));
        };

        recognition.start();
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        setTranscript('Error: Speech recognition failed to start');
        reject(error);
      }
    });
  }, [setTranscript]);

  const stopRecognition = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
  }, []);

  return { startRecognition, stopRecognition };
};