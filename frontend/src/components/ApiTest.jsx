import { useState, useEffect } from 'react';

export function ApiTest() {
  const [apiResponse, setApiResponse] = useState('')

  useEffect(() => {
    testApi()
  }, []);

  const testApi = async () => {
    const response = await fetch('/api/test')
    const data = await response.json()
    console.log(data)
    setApiResponse(JSON.stringify(data))
  }

  return (
    <div>
      <button onClick={testApi}>test connection to backend</button>
      <p>{apiResponse}</p>
    </div>
  );
};
