import React from 'react';
import { useVoiceStore } from '../store/voiceStore';

interface TranscriptionDisplayProps {
  transcript: string;
}

const TranscriptionDisplay = ({ transcript }: TranscriptionDisplayProps) => {
  const { isListening } = useVoiceStore();

  return (
    <div className="w-full">
      <p className="text-sm font-medium text-gray-600 mb-2">Transcription:</p>
      <div className="w-full min-h-[150px] p-4 bg-gray-50 rounded-lg border border-gray-200">
        {transcript || (
          <p className="text-gray-400 italic">
            {isListening ? 'Listening...' : 'Tap the microphone to start speaking'}
          </p>
        )}
      </div>
    </div>
  );
};

export default TranscriptionDisplay;