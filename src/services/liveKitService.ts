import { Room } from 'livekit-client';
import { LIVEKIT_CONFIG, ROOM_NAME, generateParticipantIdentity } from '../config/constants';
import { getToken } from './tokenService';

export const createLiveKitRoom = async () => {
  try {
    const identity = generateParticipantIdentity();
    const token = await getToken(identity, ROOM_NAME);
    
    if (!token) {
      throw new Error('No token received');
    }

    const room = new Room({
      adaptiveStream: true,
      dynacast: true,
      publishDefaults: {
        simulcast: true,
        audioPreset: { name: 'speech' },
      },
    });

    await room.connect(LIVEKIT_CONFIG.url, token, {
      autoSubscribe: true,
    });

    console.log('Connected to LiveKit room successfully');
    return { room, identity };
  } catch (error) {
    console.error('Failed to connect to LiveKit room:', error);
    throw error;
  }
};