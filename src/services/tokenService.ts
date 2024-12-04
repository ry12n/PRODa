const TOKEN_SERVER_URL = '/token';

export const getToken = async (identity: string, roomName: string): Promise<string> => {
  try {
    const response = await fetch(TOKEN_SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identity,
        roomName,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Error getting token:', error);
    throw error;
  }
};