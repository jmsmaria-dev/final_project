import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import D3EvolutionChart from './D3EvolutionChart';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useAuth } from '../auth/AuthContext';
import { apiClient } from '../api/client';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ReportsPage() {
  const { token } = useAuth();
  const [dataset, setDataset] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const api = apiClient(token);
        const res = await api.get('/api/charts/reports');
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
      backgroundColor: '#2563eb'
    }]
  } : null;

  const options = {
    responsive: true,
    plugins: { legend: { position: 'bottom' }, title: { display: true, text: dataset?.title } },
    scales: { y: { beginAtZero: true } }
  };

  return (
    <main className="center" id="reports" aria-labelledby="reports-heading">
      <div className="page-area">
        <h1 id="reports-heading">Generative AI Report: Recent Breakthroughs in Open-Source and Frontier Models</h1>
        <section aria-labelledby="full-report-heading" className="full-report">
          <h2 id="full-report-heading">Article 1: The Open-Source Breakthrough Shifting AI's Center of Gravity</h2>
          <p>
            <strong>Published:</strong> November 17, 2025 | <strong>Author:</strong> Aili McConnon, IBM Think
          </p>
          <p>
            The question of whether open-source AI systems can outperform closed ones has been hotly debated, but the answer may 
            finally be yes. Chinese AI research lab Moonshot AI's newest model, Kimi K2 Thinking, is an open-source agent that 
            outperforms OpenAI's ChatGPT and xAI's Grok on key benchmarks like Humanity's Last Exam and BrowseComp, according to 
            Moonshot AI. IBM Principal Research Scientist Kaoutar El Maghraoui called this "a big open source milestone and a 
            challenge to the entire closed AI economy," noting that if the best model in the world is open weight, "the center 
            of gravity in AI shifts from secret models to shared ecosystems."
          </p>
          <h3>Understanding Kimi K2 Thinking</h3>
          <p>
            A core feature of the Kimi K2 Thinking model is its ability to reason step by step while using tools. Specifically, 
            it can execute up to 200-300 sequential tool calls without human intervention, meaning the model can call external 
            tools one after another, in a specific order, using one tool's output as the next tool's input. This is especially 
            useful for multi-step research and reasoning tasks, where a model must gather new information, update its reasoning 
            and explore different tools, in a process called "interleaved thinking." Kimi K2 Thinking's mixture-of-experts 
            architecture, which activates only relevant parts of its massive trillion parameters, further boosts its efficiency.
          </p>
          <h3>Enterprise Implications</h3>
          <p>
            That combination of performance and efficiency is particularly interesting for companies, El Maghraoui explained: 
            "For enterprises, this open-way dominance really means that you can finally bring top-tier reasoning in-house, with 
            much lower costs." IBM Fellow Aaron Baughman cautioned that while it's exciting to see open-source models performing 
            so well, additional verification is needed: "I think a third-party independent assessment needs to be made around this 
            model, too."
          </p>
          <h3>From Model IQ to Model EQ</h3>
          <p>
            Capability and efficiency may no longer be enough to distinguish a model. OpenAI's newest closed frontier model 
            GPT-5.1, which arrived just six days after Kimi K2 Thinking, focused on user experience rather than raw power alone. 
            OpenAI stated: "We heard clearly from users that great AI should not only be smart, but also enjoyable to talk to." 
            The result is a warmer, more conversational agent. Baughman explained this develops "a sense of empathy with the user 
            and trust," noting that ChatGPT 5.1's router can provide instant responses cost-effectively when desired, "but if I 
            need it to go into a deeper chain of thought, it can do that too."
          </p>
          <h3>Market Segmentation: Intelligence as Commodity</h3>
          <p>
            According to El Maghraoui, differentiating models through user experience may signal a world "where raw intelligence 
            is becoming a commodity." She noted: "We're starting to see a segmentation of markets between models that are focused 
            on pure efficiency, and models that are trying to win with user experience and personality. It's a battle between model 
            IQ versus model EQ."
          </p>
          <p>
            <strong>Source:</strong> IBM Think, "The open-source breakthrough shifting AI's center of gravity," by Aili McConnon, November 17, 2025.{' '}
            <a href="https://www.ibm.com/think/news/open-source-models-surpass-closed-models" target="_blank" rel="noopener noreferrer">
              https://www.ibm.com/think/news/open-source-models-surpass-closed-models
            </a>
          </p>
          <hr style={{margin: '2rem 0'}} />
          <h2 id="gemini-heading">Article 2: New Gemini Model Boosts Google's Standing in High-Stakes AI Tests</h2>
          <p>
            <strong>Published:</strong> November 20, 2025 | <strong>Author:</strong> Sascha Brodsky, IBM Think
          </p>
          <p>
            Google's Gemini 3 launched this week with impressive gains on some of the field's hardest reasoning evaluations, 
            a shift IBM researchers say reflects a real advance in Google's frontier-model capabilities. Gemini 3 introduces 
            a set of feature upgrades that Google describes as a step up in practical capability. According to the company's 
            announcement, the model now handles text, images, audio and video in a single context window; adds new agentic-coding 
            tools that let developers generate working applications from prompts; and expands its reach across Google Search, 
            the Gemini app and enterprise platforms such as Vertex AI.
          </p>
          <h3>Benchmark Performance</h3>
          <p>
            Google highlighted benchmark jumps that it says reflect improvements in reasoning and tool use. The company boasted 
            gains on ARC-AGI, stronger performance in terminal-based code execution, and better results on developer-oriented 
            tasks that require planning steps and running tools. These improvements demonstrate Gemini 3's enhanced ability to 
            handle complex, multi-step reasoning challenges.
          </p>
          <h3>The Antigravity Development Environment</h3>
          <p>
            Google is positioning Gemini 3 as the centerpiece of a broader ecosystem built around agentic tooling and 
            cross-application coordination. Central to that effort is Antigravity, an integrated development environment designed 
            to let the model plan tasks, call tools, operate across terminals and browsers, and distribute work among multiple 
            agents. This represents a fundamental shift from single-response AI interactions to persistent, stateful execution 
            workflows that can handle enterprise automation and long-horizon tasks.
          </p>
          <h3>Strategic Positioning</h3>
          <p>
            The launch positions Gemini 3 as a multimodal reasoning platform rather than just a language model. By integrating 
            diverse input types into a unified context and providing sophisticated tooling for agentic workflows, Google is betting 
            that competitive advantage will come from ecosystem capabilities and cross-application coordination rather than raw 
            parameter counts alone. This aligns with broader industry trends toward AI systems that can autonomously plan, execute, 
            and coordinate complex tasks across multiple domains.
          </p>
          <p>
            <strong>Source:</strong> IBM Think, "New Gemini model boosts Google's standing in high-stakes AI tests," by Sascha Brodsky, November 20, 2025.{' '}
            <a href="https://www.ibm.com/think/news/gemini-3-boosts-googles-standing-in-ai-tests" target="_blank" rel="noopener noreferrer">
              https://www.ibm.com/think/news/gemini-3-boosts-googles-standing-in-ai-tests
            </a>
          </p>
        </section>

        <section>
          <h2>AI Evolution Visualization</h2>
        {error && <p role="alert">{error}</p>}
        {!dataset && !error && <p>Loading chart data…</p>}
        {dataset && (
          <>
            <Bar aria-label={dataset.title} role="img" data={data} options={options} />
            <div style={{marginTop:'2rem'}}>
              <D3EvolutionChart data={dataset.data} title={dataset.title} />
            </div>
            <p>
              {dataset.description} The capability index (0-100) represents the relative sophistication of AI analytics techniques available during each period. From basic rule-based systems scoring 15 in the 1950s-60s, we've progressed to today's deep learning systems scoring 95, showcasing exponential growth in our ability to extract insights from data. This evolution reflects not only technological advancement but also the convergence of improved algorithms, increased computing power, and vast data availability. Source: IBM "What is AI analytics?" (2025). Data stored in MongoDB and retrieved via JWT-protected API endpoints.
            </p>
          </>
        )}
        </section>
      </div>
    </main>
  );
}
