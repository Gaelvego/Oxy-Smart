import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data, maxHR, color }) => {
  const chartRef = useRef();
  useEffect(() => {
    // Chart dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // Create scales
    const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 200]).range([height, 0]);

    // Create line function
    const line = d3.line().x((d, i) => xScale(i)).y(d => yScale(d));

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Append grid lines with reduced opacity
    svg.append('g')
      .call(d3.axisLeft(yScale).ticks(10).tickSize(-width).tickFormat(''))
      .selectAll('line')
      .attr('stroke-opacity', 0.5);

      svg.append('line')
      .attr('x1', 0)
      .attr('y1', yScale(maxHR))
      .attr('x2', width)
      .attr('y2', yScale(maxHR))
      .attr('stroke', 'yellow')
      .attr('stroke-width', 4) // Adjust the stroke width for visibility
      .attr('stroke-dasharray', 'none'); // Use a solid line

    // Append path element and bind data
    svg.append('path')
      .data([data])
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('d', line);

    // Append X and Y axes
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));
    svg.append('g').call(d3.axisLeft(yScale).ticks(10).tickSize(-width));

    // Cleanup
    return () => {
      const svg = d3.select(chartRef.current);
      svg.selectAll('*').remove();
    };
  }, [data, maxHR, color]); // Include maxHR and color in the dependency array

  return <div ref={chartRef}></div>;
};

export default LineChart;