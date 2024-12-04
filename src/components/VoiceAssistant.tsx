import React from 'react';
import RecordButton from './RecordButton';
import TranscriptionDisplay from './TranscriptionDisplay';
import { useVoiceStore } from '../store/voiceStore';

const VoiceAssistant = () => {
  const { transcript } = useVoiceStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Voice Assistant</h1>
          <RecordButton />
          <TranscriptionDisplay transcript={transcript} />
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;