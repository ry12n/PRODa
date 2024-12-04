import { exec } from 'child_process';

export const restartServer = () => {
  return new Promise<void>((resolve, reject) => {
    exec('node-kill 3001', (error) => {
      if (error) {
        console.warn('No previous server instance found:', error.message);
      }
      
      exec('npm run server', (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  });
};