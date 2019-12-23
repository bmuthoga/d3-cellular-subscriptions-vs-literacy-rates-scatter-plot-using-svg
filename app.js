window.addEventListener('DOMContentLoaded', () => {
  let width = 500
  let height = 500
  let padding = 50
  let data = regionData.filter(filterData)

  /* For scaling horizontally */
  let xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.adultLiteracyRate))
    .range([padding, width - padding])

  /* For scaling vertically */
  let yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.subscribersPer100))
    .range([height - padding, padding])

  /* x-axis with gridlines */
  let xAxis = d3.axisBottom(xScale)
    .tickSize(-height + 2 * padding)
    .tickSizeOuter(0)

  /* y-axis with gridlines */
  let yAxis = d3.axisLeft(yScale)
    .tickSize(-width + 2 * padding)
    .tickSizeOuter(0)

  /* 
    Color scale to determine each plot circle's color 
    based on it's urbanPopulationRate value 
  */
  let colorScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.urbanPopulationRate))
    .range(['green', 'blue'])

  /* 
  Radius scale to determine each plot circle's radius 
  based on it's medianAge value 
  */
  let radiusScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.medianAge))
    .range([3, 30])

  /* Tooltip div */
  let tooltip = d3.select('body')
                  .append('div')
                    .classed('tooltip', true)

  /* Display x-axis */
  d3.select('svg')
    .append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${height - padding})`)

  /* Display y-axis */
  d3.select('svg')
    .append('g')
    .call(yAxis)
    .attr('transform', `translate(${padding}, 0)`)

  /* Display scatter plots */
  d3.select('svg')
    .attr('height', height)
    .attr('width', width)
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
    .attr('cx', d => xScale(d.adultLiteracyRate))
    .attr('cy', d => yScale(d.subscribersPer100))
    .attr('r', d => radiusScale(d.medianAge))
    .attr('fill', d => colorScale(d.urbanPopulationRate))
    .attr('stroke', '#fff')
    .on('mousemove', displayTooltip)
    .on('mouseout', hideTooltip)
    .on('touchstart', displayTooltip)
    .on('touchend', hideTooltip)

  function displayTooltip(d) {
    tooltip
      .style('opacity', 1)
      .style('top', `${d3.event.y + 25}px`)
      .style('left', `${d3.event.x - tooltip.node().offsetWidth / 2}px`)
      .html(`
        <p>Region: ${d.region}</p>
        <p>Subscribers per 100: ${d.subscribersPer100}</p>
        <p>Adult Literacy Rate: ${d.adultLiteracyRate}</p>
        <p>Growth Rate: ${d.growthRate}</p>
        <p>Urban Population Rate: ${d.urbanPopulationRate}</p>
        <p>Extreme Poverty Rate: ${d.extremePovertyRate}</p>
        <p>Median Age: ${d.medianAge}</p>
      `)
  }

  function hideTooltip() {
    tooltip
      .style('opacity', 0)
  }

  /* Display x-axis label */
  d3.select('svg')
    .append('text')
      .attr('x', width / 2)
      .attr('y', height - padding)
      .attr('dy', padding / 2)
      .text('Literacy Rate, Aged 15 and Up')
      .style('text-anchor', 'middle')

  /* Display y-axis label */
  d3.select('svg')
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('dy', padding / 2)
      .text('Cellular Subscribers per 100 People')
      .style('text-anchor', 'middle')

  /* Display chart title */
  d3.select('svg')
    .append('text')
      .attr('x', width / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '1.5em')
      .text('Cellular Subscriptions vs. Literacy Rate')
})
