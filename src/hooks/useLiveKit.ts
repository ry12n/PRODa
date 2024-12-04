import { useCallback, useRef, useEffect } from 'react';
import { 
  Room, 
  LocalParticipant, 
  createLocalAudioTrack, 
  LocalTrack
} from 'livekit-client';
import { ROOM_NAME, generateParticipantIdentity } from '../config/constants';
import { createRoom } from '../services/roomService';

export const useLiveKit = () => {
  const roomRef = useRef<Room | null>(null);
  const participantRef = useRef<LocalParticipant | null>(null);
  const trackRef = useRef<LocalTrack | null>(null);

  useEffect(() => {
    return () => {
      if (roomRef.current) {
        roomRef.current.disconnect();
      }
    };
  }, []);

  const connectToRoom = useCallback(async () => {
    try {
      // Create audio track first
      const audioTrack = await createLocalAudioTrack();
      
      const identity = generateParticipantIdentity();
      const room = await createRoom(identity, ROOM_NAME);
      
      roomRef.current = room;
      participantRef.current = room.localParticipant;
      trackRef.current = audioTrack;
      
      await participantRef.current.publishTrack(audioTrack);
      
      return room;
    } catch (error) {
      console.error('Failed to connect to LiveKit:', error);
      throw error;
    }
  }, []);

  const disconnectFromRoom = useCallback(() => {
    try {
      if (participantRef.current && trackRef.current) {
        participantRef.current.unpublishTrack(trackRef.current);
        trackRef.current.stop();
        trackRef.current = null;
      }
      if (roomRef.current) {
        roomRef.current.disconnect();
        roomRef.current = null;
        participantRef.current = null;
      }
    } catch (error) {
      console.error('Error disconnecting from room:', error);
    }
  }, []);

  return { connectToRoom, disconnectFromRoom };
};