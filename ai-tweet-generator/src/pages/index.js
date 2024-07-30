import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [topic, setTopic] = useState("");
  const [mood, setMood] = useState("");
  const [tweet, setTweet] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const generateTweet = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/tweet-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, mood }),
      });

      const { tweet } = await response.json();
      setTweet(tweet);
    } catch (error) {
      console.error("Failed to generate tweet:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="container">
      <Head>
   <style>{`
  :root {
    --background: #ffffff;
    --text: #000000;
    --card: #f8f8f8;
    --primary: #0070f3;
    --primary-hover: #005bb5;
    --toggle: #0070f3;
    --input-border: #ccc;
    --input-border-focus: #0070f3;
    --result-background: #f8f8f8;
    --result-border: #ddd;
    --result-text: #000000; /* Ensure result text color is visible */
  }

  body {
    background: var(--background);
    color: var(--text);
    transition: background 0.5s ease, color 0.5s ease;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    margin: 0;
    padding: 0;
  }

  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
  }

  .card {
    background: var(--card);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 24px;
    width: 100%;
    max-width: 400px;
    text-align: center;
    transition: background 0.5s ease;
    position: relative;
  }

  .title {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--text);
  }

  .label {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    display: block;
    text-align: left;
    color: var(--text);
  }

  .input {
    width: 100%;
    padding: 8px;
    margin-bottom: 1rem;
    border-radius: 4px;
    border: 1px solid var(--input-border);
    outline: none;
    color: var(--text); /* Ensures text is visible in input fields */
    background: var(--background); /* Ensures background is consistent */
    transition: border-color 0.3s ease;
  }

  .input:focus {
    border-color: var(--input-border-focus);
  }

  .button {
    width: 100%;
    padding: 10px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
    font-weight: bold;
    box-shadow: 0 0 10px var(--primary);
  }

  .button:hover {
    background: var(--primary-hover);
    box-shadow: 0 0 20px var(--primary-hover);
  }

  .result-box {
    background: var(--result-background);
    border: 1px solid var(--result-border);
    border-radius: 8px;
    padding: 16px;
    margin-top: 20px;
    width: 100%;
    max-width: 400px;
    text-align: center;
    color: var(--result-text); /* Ensures result text color is visible */
    font-size: 1rem; /* Ensures readable text size */
  }

  .toggle-button {
    padding: 10px;
    background: transparent;
    color: var(--text);
    border: none;
    cursor: pointer;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }



  
</style>




      </Head>
      <button onClick={toggleTheme} className="toggle-button"></button>
      <div className="card">
        <h1 className="title">AI Tweet Generator</h1>
        <label htmlFor="topic" className="label">Topic:</label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="input"
        />
        <label htmlFor="mood" className="label">Mood:</label>
        <input
          type="text"
          id="mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="input"
        />
        <button onClick={generateTweet} className="button" disabled={loading}>
          {loading ? "Generating..." : "Generate Tweet"}
        </button>
        {tweet && <p>{tweet}</p>}
      </div>
    </div>
  );
}
