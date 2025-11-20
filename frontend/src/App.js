import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then(res => res.json())
      .then(data => setMsg(data.message));
  }, []);

  return (
    <div>
      <h1>React Frontend (Yarn)</h1>
      <p>Message from backend: {msg}</p>
    </div>
  );
}

export default App;
