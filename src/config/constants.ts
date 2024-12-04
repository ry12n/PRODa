export const LIVEKIT_CONFIG = {
  url: 'wss://healthcare-u18u3z3k.livekit.cloud',
  apiKey: 'APIYq48pG2fn57y',
  apiSecret: 'z6E80KNgfBtFsr4YpjLoiZ39hHeqUykjBSMc1qAezN0A'
} as const;

export const ROOM_NAME = 'voice-assistant-room';
export const generateParticipantIdentity = () => `user-${Math.random().toString(36).slice(2, 9)}`;