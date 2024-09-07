import './App.css';
import './assets/bootstrap.css';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello, world!</h1>
      <Button onClick={() => setCount(count + 1)}>Count {count}</Button>
    </>
  );
}

export default App;
