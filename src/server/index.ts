import express from 'express';
import cors from 'cors';
import { AccessToken } from 'livekit-server-sdk';
import { LIVEKIT_CONFIG } from '../config/constants.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'LiveKit token server is running' });
});

app.post('/token', (req, res) => {
  try {
    const { identity, roomName } = req.body;
    
    if (!identity || !roomName) {
      return res.status(400).json({ error: 'Missing identity or roomName' });
    }

    const at = new AccessToken(
      LIVEKIT_CONFIG.apiKey,
      LIVEKIT_CONFIG.apiSecret,
      { identity }
    );

    at.addGrant({ 
      roomJoin: true, 
      room: roomName,
      canPublish: true,
      canSubscribe: true
    });

    const token = at.toJwt();
    res.json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Token server running on http://localhost:${PORT}`);
});