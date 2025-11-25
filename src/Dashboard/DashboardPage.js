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
            The past six months have witnessed transformative breakthroughs in generative AI, fundamentally reshaping 
            the competitive landscape between open-source and proprietary models. Most notably, Moonshot AI's Kimi K2 
            Thinking model has emerged as a watershed moment, demonstrating that open-source systems can now outperform 
            leading closed models like OpenAI's ChatGPT and xAI's Grok on rigorous benchmarks including Humanity's Last 
            Exam and BrowseComp. Leveraging a sophisticated mixture-of-experts architecture with up to a trillion parameters, 
            K2 executes 200-300 sequential tool calls autonomously, marking what IBM researchers call "a big open source 
            milestone and a challenge to the entire closed AI economy." Simultaneously, Google's Gemini 3 has advanced 
            multimodal capabilities by integrating text, images, audio, and video within unified context windows, achieving 
            significant gains on difficult evaluations like ARC-AGI and GPQA Diamond. The Antigravity development environment 
            enables Gemini 3 to orchestrate complex multi-agent workflows across terminals and browsers. These parallel 
            developments signal a strategic inflection: competitive advantage is migrating from raw parameter counts toward 
            ecosystem tooling, transparency, cost governance, and agentic orchestration capabilities. Enterprises can now 
            deploy top-tier reasoning models in-house while maintaining auditability and jurisdictional compliance, 
            fundamentally democratizing access to frontier AI capabilities.
          </p>
          <p style={{textAlign:'left', fontSize:'0.9rem', color:'#888'}}>
            <strong>Source:</strong> IBM Think, "The open-source breakthrough shifting AI's center of gravity," November 17, 2025.{' '}
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
                  1. Open-Source AI Models Surpass Closed Systems
                </Link>
              </h3>
            </li>
            <li>
              <h3 style={{margin:0}}>
                <Link to="/summary" aria-label="Google's Gemini 3 Advances Multimodal AI Capabilities (go to Summary page)">
                  2. Google's Gemini 3 Advances Multimodal AI Capabilities
                </Link>
              </h3>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
