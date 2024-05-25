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
            --background-light: #fff;
            --text-light: #000;
            --card-light: #f8f8f8;
            --primary-light: #0070f3;
            --primary-hover-light: #005bb5;
            --toggle-light: #0070f3;

            --background-dark: #363537;
            --text-dark: #fafafa;
            --card-dark: #424242;
            --primary-dark: #bb86fc;
            --primary-hover-dark: #3700b3;
            --toggle-dark: #bb86fc;
          }

          [data-theme="light"] {
            --background: var(--background-light);
            --text: var(--text-light);
            --card: var(--card-light);
            --primary: var(--primary-light);
            --primary-hover: var(--primary-hover-light);
            --toggle: var(--toggle-light);
          }

          [data-theme="dark"] {
            --background: var(--background-dark);
            --text: var(--text-dark);
            --card: var(--card-dark);
            --primary: var(--primary-dark);
            --primary-hover: var(--primary-hover-dark);
            --toggle: var(--toggle-dark);
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
            position: relative;
          }

          .card {
            background: var(--card);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 24px;
            width: 400px;
            text-align: center;
            transition: background 0.5s ease;
            position: relative;
          }

          .title {
            font-size: 2rem;
            margin-bottom: 1rem;
          }

          .label {
            font-size: 1rem;
            margin-bottom: 0.5rem;
            display: block;
            text-align: left;
          }

          .input {
            width: 100%;
            padding: 8px;
            margin-bottom: 1rem;
            border-radius: 4px;
            border: 1px solid #ccc;
            outline: none;
            transition: border-color 0.3s ease;
          }

          .input:focus {
            border-color: var(--primary);
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
            box-shadow: 0 0 20px var(--primary);
          }

          .button:hover {
            background: var(--primary-hover);
            box-shadow: 0 0 40px var(--primary-hover), 0 0 80px var(--primary-hover);
          }

          .toggle-button {
            padding: 10px;
            background: transparent;
            color: transparent;
            border: none;
            cursor: pointer;
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
          }

          .toggle-button::before {
            content: '🌞';
            font-size: 24px;
            display: block;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            text-align: center;
            line-height: 24px;
            background: var(--toggle);
            box-shadow: 0 0 10px var(--toggle), 0 0 20px var(--toggle), 0 0 30px var(--toggle);
            transition: box-shadow 0.3s ease;
          }

          .toggle-button:hover::before {
            box-shadow: 0 0 20px var(--toggle), 0 0 40px var(--toggle), 0 0 60px var(--toggle);
          }
        `}</style>
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
