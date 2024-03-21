import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    //con query params ottengo il code
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // faccio una get request per ottenere l'access token
      fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.REDIRECT_URI}&code=${code}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setAccessToken(data.access_token);
          if (accessToken) {
        fetch('https://api.github.com/user', {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          }
        })
    }
  }, []);
  return (
      <>
          <a>
              <h1>OAuth2 with GitHub</h1>
              <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=repo`}>Signin with GitHub</a>

              {accessToken && <h1>Access Token: {accessToken}</h1>}
          </a>
      </>
  )
}

export default App;
