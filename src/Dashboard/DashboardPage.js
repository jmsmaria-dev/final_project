import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <main className="center" id="dashboard" aria-labelledby="dashboard-heading">
      <div className="page-area">
        <h1 id="dashboard-heading">M80 Dashboard</h1>
        
        <section aria-labelledby="summary-section-heading" style={{marginBottom:'2rem'}}>
          <h2 id="summary-section-heading">Recent Innovations in Generative AI</h2>
          <p style={{lineHeight:'1.8', textAlign:'left', marginBottom:'1rem'}}>
            Can open-source AI systems outperform closed ones? Thanks to the newest model from Chinese AI research lab 
            Moonshot AI, the answer may finally be yes. Kimi K2 Thinking is an open-source agent that uses a mixture-of-experts 
            architecture and outperforms OpenAI's ChatGPT and xAI's Grok on key benchmarks like Humanity's Last Exam and 
            BrowseComp. IBM Principal Research Scientist Kaoutar El Maghraoui noted this represents "a big open source milestone 
            and a challenge to the entire closed AI economy," explaining that "if the best model in the world is open weight, 
            the center of gravity in AI shifts from secret models to shared ecosystems." A core feature of Kimi K2 Thinking 
            is its ability to reason step by step while using tools, executing up to 200-300 sequential tool calls without 
            human intervention through a process called "interleaved thinking." For enterprises, this open-weight dominance 
            means organizations can finally bring top-tier reasoning in-house with much lower costs. Meanwhile, OpenAI's 
            newest frontier model GPT-5.1 shifted focus beyond raw power to user experience, becoming warmer and more 
            conversational based on user feedback. This signals a broader market segmentation between models focused on 
            pure efficiency versus those competing on personality—"a battle between model IQ versus model EQ," as El Maghraoui 
            described it, suggesting raw intelligence is becoming commoditized while differentiation moves toward user experience.
          </p>
          <p style={{textAlign:'left', fontSize:'0.9rem', color:'#888'}}>
            <strong>Source:</strong> IBM Think, "The open-source breakthrough shifting AI's center of gravity," by Aili McConnon, November 17, 2025.{' '}
            <a href="https://www.ibm.com/think/news/open-source-models-surpass-closed-models" target="_blank" rel="noopener noreferrer" style={{color:'#61dafb'}}>
              https://www.ibm.com/think/news/open-source-models-surpass-closed-models
            </a>
          </p>
        </section>

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

        <section aria-labelledby="articles-heading">
          <h2 id="articles-heading" style={{marginBottom:'1rem'}}>Articles</h2>
          <ul style={{listStyle:'none', padding:0, margin:0}} aria-label="Article list">
            <li style={{marginBottom:'0.75rem'}}>
              <h3 style={{margin:0}}>
                <Link to="/summary" aria-label="Open-Source AI Models Surpass Closed Systems (go to Summary page)">
                  1. The Open-Source Breakthrough Shifting AI's Center of Gravity
                </Link>
              </h3>
            </li>
            <li>
              <h3 style={{margin:0}}>
                <Link to="/summary" aria-label="Gemini 3 Boosts Google's Standing in High-Stakes AI Tests (go to Summary page)">
                  2. New Gemini Model Boosts Google's Standing in High-Stakes AI Tests
                </Link>
              </h3>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
