import React, { useEffect, useState } from 'react';
import { handleCallback, getUser } from '../lib/keycloak';

const CallbackPage: React.FC = () => {
  const [status, setStatus] = useState<string>('Processing login...');

  useEffect(() => {
    const processCallback = async () => {
      try {
        console.log('Processing Keycloak callback with params:', window.location.search);
        await handleCallback();
        console.log('Callback successful, checking user');
        const user = await getUser();
        if (user) {
          console.log('User authenticated:', user.profile);
          setStatus('Login successful, redirecting...');
          // Delay 100ms để đảm bảo trạng thái cập nhật
          setTimeout(() => {
            console.log('Redirecting to /');
            window.location.replace('/');
          }, 100);
        } else {
          console.error('No user found after callback');
          setStatus('Error: No user found after login');
        }
      } catch (err: any) {
        console.error('Error handling callback:', err);
        setStatus(`Error: ${err.message || 'Callback failed'}`);
      }
    };
    processCallback();
  }, []);

  return <div>{status}</div>;
};

export default CallbackPage;