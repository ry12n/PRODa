import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useVoiceStore } from '../store/voiceStore';
import { useAudioRecording } from '../hooks/useAudioRecording';

const RecordButton = () => {
  const { isListening } = useVoiceStore();
  const { toggleRecording } = useAudioRecording();

  return (
    <button
      onClick={toggleRecording}
      className={`p-6 rounded-full transition-all duration-300 ${
        isListening 
          ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
          : 'bg-blue-500 hover:bg-blue-600'
      }`}
      aria-label={isListening ? 'Stop recording' : 'Start recording'}
    >
      {isListening ? (
        <MicOff className="w-8 h-8 text-white" />
      ) : (
        <Mic className="w-8 h-8 text-white" />
      )}
    </button>
  );
};

export default RecordButton;