import { Room, RoomOptions } from 'livekit-client';
import { LIVEKIT_CONFIG } from '../config/constants';
import { getToken } from './tokenService';

const roomOptions: RoomOptions = {
  adaptiveStream: true,
  dynacast: true,
  publishDefaults: {
    simulcast: true,
    audioPreset: { name: 'speech' },
  },
};

export const createRoom = async (identity: string, roomName: string): Promise<Room> => {
  try {
    const token = await getToken(identity, roomName);
    
    if (!token) {
      throw new Error('Failed to obtain token');
    }

    const room = new Room(roomOptions);
    await room.connect(LIVEKIT_CONFIG.url, token);
    
    return room;
  } catch (error) {
    console.error('Failed to create room:', error);
    throw error;
  }
};