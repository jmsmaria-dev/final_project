const Chart = require('./Chart');

async function seedCharts() {
  const count = await Chart.countDocuments();
  if (count > 0) return; // already seeded

  const now = new Date();
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 6);

  // Datasets: AI Analytics adoption and implementation statistics
  // Summary dataset: Types of AI Analytics adoption (Pie chart)
  const summary = new Chart({
    key: 'summary',
    title: 'AI Analytics Types - Organizational Adoption',
    datasetLabel: 'Adoption Rate (%)',
    description: 'Distribution of AI analytics types being used by organizations: Descriptive analytics for understanding what happened, Diagnostic for why it happened, Predictive for forecasting future trends, and Prescriptive for recommending actions.',
    data: [
      { label: 'Descriptive Analytics', value: 45 },
      { label: 'Diagnostic Analytics', value: 25 },
      { label: 'Predictive Analytics', value: 20 },
      { label: 'Prescriptive Analytics', value: 10 }
    ]
  });

  // Reports dataset: AI Analytics Implementation Timeline (Bar chart)
  const reports = new Chart({
    key: 'reports',
    title: 'AI Analytics Evolution - Decade by Decade',
    datasetLabel: 'Capability Index (0-100)',
    description: 'The evolution of AI analytics capabilities over time, from early foundations in the 1950s through machine learning growth, data explosion era, big data advancements, to current deep learning and modern AI analytics.',
    data: [
      { label: '1950s-60s: Foundations', value: 15 },
      { label: '1970s-80s: ML Growth', value: 30 },
      { label: '1990s: Data Explosion', value: 45 },
      { label: '2000s: Big Data Era', value: 65 },
      { label: '2010s-Now: Deep Learning', value: 95 }
    ]
  });

  await Chart.insertMany([summary, reports]);
}

module.exports = { seedCharts };
