import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const recaptchaRef = useRef()
  const [token, setToken] = useState("");
  const [text, setText] = useState("");

  const onChangeRecapthca = (recaptchaToken) => setToken(recaptchaToken);

  const submitDemo = async () => {
    try {
      if (token && text) {
        console.log('Send post request');
        await axios.post(import.meta.env.VITE_BACKEND_API, { text, token })
        setToken("")
        recaptchaRef.current.reset()
      } else {
        alert("Required fields")
      }
      
    } catch (error) {
      console.log('submitDemo error: ', error);
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p>Backend API: {import.meta.env.VITE_BACKEND_API}</p>
      <p>Window Global Config API: {window.globalConfig.testAPI}</p>
      <div className="card">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <hr />
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_SITE_KEY}
          onChange={onChangeRecapthca}
          ref={recaptchaRef}
        />
        <button onClick={submitDemo}>Send</button>
      </div>
      <p className="read-the-docs">Google ReCaptcha Integration</p>
    </>
  );
}

export default App;
