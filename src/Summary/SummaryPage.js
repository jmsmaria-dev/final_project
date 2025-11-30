import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useAuth } from '../auth/AuthContext';
import { apiClient } from '../api/client';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SummaryPage() {
  const { token } = useAuth();
  const [dataset, setDataset] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const api = apiClient(token);
        const res = await api.get('/api/charts/summary');
        setDataset(res.data);
      } catch (err) {
        setError(err?.response?.data?.error || err.message);
      }
    }
    load();
  }, [token]);

  const data = dataset ? {
    labels: dataset.data.map(d => d.label),
    datasets: [{
      label: dataset.datasetLabel,
      data: dataset.data.map(d => d.value),
      backgroundColor: ['#2563eb','#10b981','#f59e0b','#ef4444','#8b5cf6','#14b8a6'],
      borderColor: '#ffffff',
      borderWidth: 2
    }]
  } : null;

  return (
    <main className="center" id="summary" aria-labelledby="summary-heading">
      <div className="page-area">
        <h1 id="summary-heading">Summary: Recent Innovations in Generative AI</h1>
        
        <article className="article-summary" aria-labelledby="article1-heading">
          <h3 id="article1-heading">
            <Link to="/reports" aria-label="Go to full report for Open-Source AI Models Surpass Closed Systems">
              1. Open-Source AI Models Surpass Closed Systems
            </Link>
          </h3>
          <p>
            Moonshot AI's Kimi K2 Thinking model marks a breakthrough moment for open-source AI, outperforming 
            OpenAI's ChatGPT and xAI's Grok on key benchmarks including Humanity's Last Exam and BrowseComp. 
            This open-source agent uses a mixture-of-experts architecture with up to trillion parameters and can 
            execute 200-300 sequential tool calls without human intervention. IBM researchers describe this as 
            "a big open source milestone and a challenge to the entire closed AI economy," signaling that the 
            center of gravity in AI is shifting from secret models to shared ecosystems. The development means 
            enterprises can now bring top-tier reasoning capabilities in-house at much lower costs.
          </p>
          <p>
            <strong>Source:</strong> IBM Think, "The open-source breakthrough shifting AI's center of gravity," 
            November 17, 2025.{' '}
            <a href="https://www.ibm.com/think/news/open-source-models-surpass-closed-models" target="_blank" rel="noopener noreferrer">
              https://www.ibm.com/think/news/open-source-models-surpass-closed-models
            </a>
          </p>
        </article>

        <article className="article-summary" aria-labelledby="article2-heading">
          <h3 id="article2-heading">
            <Link to="/reports" aria-label="Go to full report for Gemini 3 Boosts Google's Standing in High-Stakes AI Tests">
              2. New Gemini Model Boosts Google's Standing in High-Stakes AI Tests
            </Link>
          </h3>
          <p>
            Google's Gemini 3 launched this week with impressive gains on some of the field's hardest reasoning 
            evaluations, a shift IBM researchers say reflects a real advance in Google's frontier-model capabilities. 
            The model introduces feature upgrades including handling text, images, audio and video in a single context 
            window, plus new agentic-coding tools that let developers generate working applications from prompts. 
            Google highlighted benchmark jumps on ARC-AGI, stronger performance in terminal-based code execution, and 
            better results on developer-oriented tasks requiring planning steps and running tools. Central to Gemini 3's 
            ecosystem is Antigravity, an integrated development environment designed to let the model plan tasks, call 
            tools, operate across terminals and browsers, and distribute work among multiple agents. The model now 
            reaches across Google Search, the Gemini app, and enterprise platforms such as Vertex AI.
          </p>
          <p>
            <strong>Source:</strong> IBM Think, "New Gemini model boosts Google's standing in high-stakes AI tests," 
            by Sascha Brodsky, November 20, 2025.{' '}
            <a href="https://www.ibm.com/think/news/gemini-3-boosts-googles-standing-in-ai-tests" target="_blank" rel="noopener noreferrer">
              https://www.ibm.com/think/news/gemini-3-boosts-googles-standing-in-ai-tests
            </a>
          </p>
        </article>

        <section aria-labelledby="tech-heading" style={{marginBottom:'2rem', padding:'1.5rem', backgroundColor:'rgba(97, 218, 251, 0.1)', borderRadius:'8px'}}>
          <h2 id="tech-heading">Technical Architecture</h2>
          <p style={{lineHeight:'1.6', textAlign:'left'}}>
            This application is architected as a fully decoupled Single Page Application (SPA) with a React frontend (v19.x) 
            communicating asynchronously with a Node.js/Express backend via RESTful HTTP endpoints. Authentication is implemented 
            using JSON Web Tokens (JWT) with a 2-hour expiration policy, securing protected chart data endpoints that serve 
            dynamic visualizations for Summary and Reports pages. The backend operates independently on port 3000, connecting 
            to a MongoDB database (Mongoose ODM) to persist and retrieve chart datasets keyed by page context. Chart rendering 
            leverages Chart.js (react-chartjs-2) for standard visualizations and D3.js (v7.x) for custom SVG-based evolution 
            timelines. The frontend is served via NGINX on port 80 (production) or Create React App dev server on port 3001 
            (development), with CORS configured to enable cross-origin API requests. Accessibility compliance follows WCAG 
            principles through semantic HTML5 elements, ARIA labels, role attributes, keyboard navigation support, and sufficient 
            color contrast ratios. The entire codebase is version-controlled in a single GitHub repository with appropriate 
            .gitignore rules to exclude node_modules and sensitive environment variables (.env files).
          </p>
        </section>

        <section>
          <h2>AI Analytics Adoption Chart</h2>
        {error && <p role="alert">{error}</p>}
        {!dataset && !error && <p>Loading chart data…</p>}
        {dataset && (
          <>
            <h2>{dataset.title}</h2>
            <Pie aria-label={dataset.title} role="img" data={data} />
            <p>
              {dataset.description} This data reflects current organizational adoption patterns where descriptive analytics
              dominates (45%), followed by diagnostic (25%), predictive (20%), and prescriptive (10%) approaches. The trend shows
              organizations building from basic descriptive capabilities toward more advanced predictive and prescriptive implementations.
              Source: IBM "What is AI analytics?" (2025). Data stored in MongoDB and delivered via JWT-protected backend API.
            </p>
          </>
        )}
        </section>
      </div>
    </main>
  );
}
