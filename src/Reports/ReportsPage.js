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
        <h1 id="reports-heading">Generative AI Report: Open-Source Breakthrough</h1>
        <section aria-labelledby="full-report-heading" className="full-report">
          <h2 id="full-report-heading">Full Report: The Open-Source Shift in Advanced Reasoning Models</h2>
          <p>
            This report provides an in-depth, paraphrased analysis of the recent milestone in generative AI: the emergence of an
            open-source frontier model (Kimi K2 Thinking) that credibly challenges proprietary systems. Rather than reproducing the
            source article verbatim (to respect copyright), the following sections synthesize its core themes, technical attributes,
            enterprise implications, and strategic context. The development signals a redistribution of innovation leverage from closed
            model silos toward collaborative ecosystems.
          </p>
          <h3>1. Architectural Foundations</h3>
          <p>
            K2 adopts a mixture-of-experts (MoE) design that activates only relevant parameter subsets per task. This selective routing
            yields efficiency gains: complex reasoning chains engage deep expert pathways, while lightweight queries use minimal compute.
            The practical outcome is elasticity—enterprises can scale advanced reasoning without linear cost explosions typical of dense
            monolithic LLMs. Modular expert allocation also eases targeted fine-tuning and safety instrumentation.
          </p>
          <h3>2. High-Depth Tool Invocation</h3>
          <p>
            A distinguishing capability is sustained sequential tool calling (hundreds of chained invocations). This enables iterative
            research workflows: fetch data, transform, re-evaluate hypotheses, branch, consolidate, and synthesize—all without human
            midstream intervention. It operationalizes "interleaved thinking" where external retrieval augments reasoning context in
            real time, reducing hallucination risk and improving task decomposition fidelity.
          </p>
          <h3>3. Benchmark Performance Signals</h3>
          <p>
            Reported gains on multifaceted reasoning suites (e.g., long-form cognitive exams and browsing comprehension tests) indicate
            maturation in cross-modal logic coherence. Importantly, performance is paired with efficiency—competitive scores achieved
            while preserving economic viability for self-hosting scenarios. This dual vector (quality + cost control) lowers barriers
            for regulated industries requiring internal model governance.
          </p>
          <h3>4. Enterprise Impact Vector</h3>
          <p>
            Open-weight availability restructures procurement strategy: organizations shift from pure API consumption toward hybrid
            integration. Benefits include auditability (inspect weights), jurisdictional compliance (data residency with self-hosted
            inference), and bespoke guardrail layering (custom moderation or domain calibration). It also catalyzes internal AI
            enablement teams to evolve from prompt engineering toward pipeline orchestration and safety instrumentation functions.
          </p>
          <h3>5. Market Segmentation: IQ vs EQ</h3>
          <p>
            A strategic inflection is highlighted: as raw cognitive metrics converge, differentiation migrates to experiential qualities—
            conversational nuance, adaptive tone, and workflow embed-ability. Proprietary models emphasize user experience polish and
            integrated SaaS surfaces; open-source challengers emphasize transparency, extensibility, and cost governance. Procurement
            decisions increasingly map to these axes rather than sheer parameter counts.
          </p>
          <h3>6. Governance and Trust Considerations</h3>
          <p>
            Open-source status does not automatically confer safety. Enterprises must overlay policy layers: prompt injection defenses,
            tool invocation constraints, audit logging, and continuous evaluation against bias & leakage scenarios. Auxiliary guardian
            models (policy filters) form a defense-in-depth pattern. The shift elevates AI risk management from vendor dependency toward
            internal capability maturity.
          </p>
          <h3>7. Strategic Outlook</h3>
          <p>
            The open-source milestone signals acceleration toward composable AI stacks: lightweight specialized experts coordinated by
            orchestration agents, enriched by retrieval, planning, and verification loops. Future differentiators will likely center on
            reliability under autonomous multi-step workflows and verifiable traceability of reasoning paths.
          </p>
          <p>
            <strong>Source Reference:</strong> IBM Think (Aili McConnon), "The open-source breakthrough shifting AI's center of gravity," Nov 17, 2025.{' '}
            <a href="https://www.ibm.com/think/news/open-source-models-surpass-closed-models" target="_blank" rel="noopener noreferrer">Article Link</a>
          </p>
          <hr />
          <h2 id="gemini-heading">Supplement: Gemini 3 Multimodal & Agentic Advancements</h2>
          <p>
            This supplemental section analyzes Google's Gemini 3 release (Nov 20, 2025) and its positioning in high-stakes reasoning and
            multimodal orchestration. The model integrates text, images, audio, and video into a unified context window, reducing friction
            in cross-media tasks (e.g., synthesizing visual evidence and narrative explanation). Benchmarks show jumps in complex reasoning
            suites (ARC-AGI variants, GPQA Diamond), suggesting stronger internal abstraction layering and tool reasoning alignment.
          </p>
          <h3>1. Unified Multimodal Context Window</h3>
          <p>
            Gemini 3 treats heterogeneous inputs as first-class tokens inside a single attention space. This design streamlines workflows
            like code + diagram + natural language reviews without external stitching layers. It also improves temporal and spatial referencing
            for video frame analysis, enabling more coherent event extraction pipelines.
          </p>
          <h3>2. Agentic Tooling Ecosystem (Antigravity)</h3>
          <p>
            The Antigravity environment extends the model beyond passive generation into active task planning: launching terminal sessions,
            invoking tools across browser-like contexts, and distributing subtasks to delegate worker agents. This indicates a shift from
            single-response paradigms toward persistent, stateful execution graphs—critical for enterprise automation and long-horizon tasks.
          </p>
          <h3>3. Reasoning + Planning Gains</h3>
          <p>
            Improvements on reasoning benchmarks reflect enhanced multi-step planning fidelity and reduced derailment in extended chains.
            Where earlier models opportunistically approximated steps, Gemini 3 exhibits tighter adherence to structured planning traces,
            useful for reproducible analytic audits and regulated reporting workflows.
          </p>
          <h3>4. Ecosystem Differentiation</h3>
          <p>
            Competitive edge shifts from raw parameter bragging rights to surrounding orchestration tools. Gemini 3 leverages integrated
            developer assets to produce working prototypes (e.g., dashboard scaffolds) with fewer clarifying prompts. This reduces iteration
            latency and accelerates concept-to-utility cycles.
          </p>
          <h3>5. Human Factors & Limitations</h3>
          <p>
            Despite gains, hallucination risk persists—testers note confident but incorrect elaborations under sparse constraints. Sustainable
            deployment still requires layered verification (retrieval grounding, policy filters, and post-generation validation). The trajectory
            suggests future focus on dynamic self-critique and transparent reasoning artifact emission.
          </p>
          <p>
            <strong>Source Reference:</strong> IBM Think (Sascha Brodsky), "New Gemini model boosts Google's standing in high-stakes AI tests," Nov 20, 2025.{' '}
            <a href="https://www.ibm.com/think/news/gemini-3-boosts-googles-standing-in-ai-tests" target="_blank" rel="noopener noreferrer">Article Link</a>
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
