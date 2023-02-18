
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseData, setResponseData] = useState()
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username) {
      setErrorMessage('Please enter a username.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter a password.');
      return;
    }
    
    const headers = {
      'Xtag1': '11223344',
      'Auth': `${username}:${password}`
    };
    try {
      const response = await fetch('https://2mc.us/saad.php', { headers, mode: 'no-cors' });
      const data = await response.json();
      if (data.status === 'ok') {
        setResponseData(data)
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.log('error', error)
      setErrorMessage('Something went wrong!');
    }
  };

  if (responseData) {
    return <LoggedInPage username={username} session={responseData.session} />;
  }
  
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

const LoggedInPage = ({ username, session }) =>  {
  return (
    <div>
      <h1>Logged In</h1>
      <p>Hello {username}, your session is {session}.</p>
    </div>
  );
}

export default App;
