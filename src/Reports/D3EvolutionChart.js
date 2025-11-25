import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Accessible D3 line/area chart for evolution timeline
export default function D3EvolutionChart({ data, title }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const labels = data.map(d => d.label);
    const values = data.map(d => d.value);

    // Numeric x scale using index; we keep original labels for axis ticks.
    const width = 640;
    const height = 320;
    const margin = { top: 40, right: 30, bottom: 50, left: 60 };

    // Clear previous svg
    d3.select(ref.current).selectAll('*').remove();

    const svg = d3.select(ref.current)
      .append('svg')
      .attr('role', 'img')
      .attr('aria-label', title + ' D3 visualization')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('font-family', 'system-ui, sans-serif');

    const x = d3.scalePoint()
      .domain(labels)
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(values) || 100]).nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3.line()
      .x((_, i) => x(labels[i]))
      .y((_, i) => y(values[i]))
      .curve(d3.curveMonotoneX);

    const area = d3.area()
      .x((_, i) => x(labels[i]))
      .y0(y(0))
      .y1((_, i) => y(values[i]))
      .curve(d3.curveMonotoneX);

    // Area fill
    svg.append('path')
      .attr('d', area(values))
      .attr('fill', 'url(#grad)')
      .attr('aria-hidden', 'true');

    // Gradient definition
    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', 'grad')
      .attr('x1', '0%').attr('x2', '0%')
      .attr('y1', '0%').attr('y2', '100%');
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#2563eb').attr('stop-opacity', 0.6);
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#2563eb').attr('stop-opacity', 0.05);

    // Line stroke
    svg.append('path')
      .attr('d', line(values))
      .attr('fill', 'none')
      .attr('stroke', '#1d4ed8')
      .attr('stroke-width', 3)
      .attr('aria-hidden', 'true');

    // Points with focus interaction
    // Group for future focus interactions (currently unused) removed to eliminate lint warning.
    svg.selectAll('circle.point')
      .data(values)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', (_, i) => x(labels[i]))
      .attr('cy', (_, i) => y(values[i]))
      .attr('r', 5)
      .attr('fill', '#1e40af')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .append('title')
      .text((_, i) => `${labels[i]}: ${values[i]}`);

    // Axes
    const xAxis = g => g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .call(g => g.selectAll('text').style('font-size', '12px'));

    const yAxis = g => g
      .attr('transform', `translate(${margin.left},0)`) // y axis offset
      .call(d3.axisLeft(y))
      .call(g => g.selectAll('text').style('font-size', '12px'))
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line')
        .clone()
        .attr('x2', width - margin.left - margin.right)
        .attr('stroke-opacity', 0.1));

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', margin.top - 15)
      .attr('text-anchor', 'middle')
      .attr('font-size', 16)
      .attr('font-weight', '600')
      .text(title + ' (D3)');

  }, [data, title]);

  return (
    <div ref={ref} className="d3-evolution-chart" aria-live="polite" />
  );
}
