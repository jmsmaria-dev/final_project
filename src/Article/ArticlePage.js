import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { useAuth } from '../auth/AuthContext';
import { apiClient } from '../api/client';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function ArticlePage() {
  const { token } = useAuth();
  const [summaryDs, setSummaryDs] = useState(null);
  const [reportsDs, setReportsDs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const api = apiClient(token);
        const [s, r] = await Promise.all([
          api.get('/api/charts/summary'),
          api.get('/api/charts/reports')
        ]);
        setSummaryDs(s.data);
        setReportsDs(r.data);
      } catch (err) {
        setError(err?.response?.data?.error || err.message);
      }
    }
    load();
  }, [token]);

  const pieData = summaryDs ? {
    labels: summaryDs.data.map(d => d.label),
    datasets: [{
      label: summaryDs.datasetLabel,
      data: summaryDs.data.map(d => d.value),
      backgroundColor: ['#2563eb','#10b981','#f59e0b','#ef4444','#8b5cf6','#14b8a6'],
      borderColor: '#ffffff',
      borderWidth: 2
    }]
  } : null;

  const barData = reportsDs ? {
    labels: reportsDs.data.map(d => d.label),
    datasets: [{
      label: reportsDs.datasetLabel,
      data: reportsDs.data.map(d => d.value),
      backgroundColor: '#2563eb'
    }]
  } : null;

  const barOptions = {
    responsive: true,
    plugins: { legend: { position: 'bottom' }, title: { display: true, text: reportsDs?.title } },
    scales: { y: { beginAtZero: true } }
  };

  return (
    <main className="center" id="article" aria-labelledby="article-heading">
      <div className="page-area">
        <h1 id="article-heading">M80 Article: Generative AI in the last 6 months</h1>

        <section aria-labelledby="summary-heading">
          <h2 id="summary-heading">Article summary</h2>
          <p>
            The past six months have witnessed remarkable advances in AI model capabilities, as evidenced by performance on challenging benchmarks like "Humanity's Last Exam." This assessment evaluates frontier AI systems across diverse reasoning tasks that push the boundaries of current artificial intelligence. Leading models from OpenAI, Anthropic, Google, and xAI demonstrate varying degrees of proficiency, with GPT-5 (high) achieving the highest score at 26.5%, followed closely by GPT-5 Codex at 25.6% and Grok 4 at 23.9%. These scores reflect substantial progress in complex reasoning, multi-step problem solving, and knowledge synthesis compared to earlier generations. The distribution of performancewith top models clustering between 13-27%reveals both the impressive strides made in AI capabilities and the significant room for improvement before approaching human-level reasoning on the most challenging tasks. Notably, different architectural approaches (transformer-based, mixture-of-experts, and specialized coding models) each contribute unique strengths. As organizations evaluate which models to deploy, these benchmarks provide critical insights into real-world task performance beyond standard evaluations. The competitive landscape continues to evolve rapidly, with implications for enterprise AI adoption, research priorities, and the trajectory toward more general artificial intelligence systems.
          </p>
          <p>
            Source: McKinsey & Company, â€œThe state of AI in 2025: Agents, innovation, and transformation,â€
            Nov 5, 2025.{' '} 
            <a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" target="_blank" rel="noopener noreferrer">
              https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai
            </a>
          </p>
        </section>

        {error && <p role="alert">{error}</p>}
        {!summaryDs && !reportsDs && !error && <p>Loadingâ€¦</p>}

        {(summaryDs || reportsDs) && (
          <section aria-labelledby="charts-heading">
            <h2 id="charts-heading">Charts</h2>
            <div style={{display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'}}>
              <div>
                <h3>{summaryDs?.title || 'Summary Dataset'}</h3>
                {pieData && <Pie aria-label={summaryDs?.title} role="img" data={pieData} />}
                <p>
                  This chart shows the relative performance distribution of top AI models on the Humanity's Last Exam 
                  benchmark, highlighting the leading systems and their scores.
                </p>
              </div>
              <div>
                <h3>{reportsDs?.title || 'Reports Dataset'}</h3>
                {barData && <Bar aria-label={reportsDs?.title} role="img" data={barData} options={barOptions} />}
                <p>
                  This chart provides a comprehensive comparison of all evaluated AI models, from GPT-5 at the top 
                  (26.5%) to DeepSeek V3.2 Exp (13.8%), illustrating the current state of frontier model capabilities.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
