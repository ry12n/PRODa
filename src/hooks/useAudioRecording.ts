import { useCallback } from 'react';
import { useVoiceStore } from '../store/voiceStore';
import { useSpeechRecognition } from './useSpeechRecognition';
import { useLiveKit } from './useLiveKit';

export const useAudioRecording = () => {
  const { isListening, setIsListening, setTranscript } = useVoiceStore();
  const { startRecognition, stopRecognition } = useSpeechRecognition();
  const { connectToRoom, disconnectFromRoom } = useLiveKit();

  const startRecording = useCallback(async () => {
    try {
      setTranscript('');
      setIsListening(true);
      
      // First connect to LiveKit
      await connectToRoom();
      console.log('Successfully connected to LiveKit room');
      
      // Then start speech recognition
      await startRecognition();
      console.log('Successfully started speech recognition');
      
    } catch (error) {
      console.error('Failed to start recording:', error);
      setIsListening(false);
      setTranscript('Error: Failed to start recording. Please try again.');
      // Cleanup in case of error
      disconnectFromRoom();
      stopRecognition();
    }
  }, [connectToRoom, startRecognition, setIsListening, setTranscript, disconnectFromRoom, stopRecognition]);

  const stopRecording = useCallback(() => {
    try {
      stopRecognition();
      disconnectFromRoom();
      setIsListening(false);
    } catch (error) {
      console.error('Error stopping recording:', error);
      setTranscript('Error: Failed to stop recording properly.');
    }
  }, [stopRecognition, disconnectFromRoom, setIsListening, setTranscript]);

  const toggleRecording = useCallback(() => {
    if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isListening, startRecording, stopRecording]);

  return { startRecording, stopRecording, toggleRecording };
};