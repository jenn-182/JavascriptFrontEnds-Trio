import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BandsList() {
  const [bands, setBands] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/api/bands')
      .then(res => setBands(res.data));
  }, []);

  return (
    <ul>
      {bands.map(band => <li key={band.id}>{band.name}</li>)}
    </ul>
  );
}