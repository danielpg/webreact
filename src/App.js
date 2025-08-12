import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace this with your actual API endpoint
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setClientes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Error fetching data');
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Daniel Perales - SPA REACT - Deploy S3 - CF - Serverless</p>

        {loading && <p>Loading clientes...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {!loading && !error && (
          <table style={{ color: 'white', marginTop: 20, borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid white', padding: 8 }}>ID</th>
                <th style={{ border: '1px solid white', padding: 8 }}>Nombre</th>
                <th style={{ border: '1px solid white', padding: 8 }}>Email</th>
                <th style={{ border: '1px solid white', padding: 8 }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(({ id, nombre, email, estado }) => (
                <tr key={id}>
                  <td style={{ border: '1px solid white', padding: 8 }}>{id}</td>
                  <td style={{ border: '1px solid white', padding: 8 }}>{nombre}</td>
                  <td style={{ border: '1px solid white', padding: 8 }}>{email}</td>
                  <td style={{ border: '1px solid white', padding: 8 }}>{estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </header>
    </div>
  );
}

export default App;
