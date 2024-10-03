import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function Donut({ year }: { year: number }) {
	interface dataPoint {
		week: string;
		value: number;
		days: number;
		activeFile: boolean;
	}

	const data: dataPoint[] = [
		{ week: "Week 1", value: 1, days: 0, activeFile: false },
		{ week: "Week 2", value: 1, days: 0, activeFile: false },
		{ week: "Week 3", value: 1, days: 1, activeFile: false },
		{ week: "Week 4", value: 1, days: 3, activeFile: false },
		{ week: "Week 5", value: 1, days: 1, activeFile: false },
		{ week: "Week 6", value: 1, days: 7, activeFile: false },
		{ week: "Week 7", value: 1, days: 6, activeFile: false },
		{ week: "Week 8", value: 1, days: 4, activeFile: false },
		{ week: "Week 9", value: 1, days: 0, activeFile: false },
		{ week: "Week 10", value: 1, days: 2, activeFile: false },
		{ week: "Week 11", value: 1, days: 1, activeFile: false },
		{ week: "Week 12", value: 1, days: 4, activeFile: false },
		{ week: "Week 13", value: 1, days: 3, activeFile: false },
		{ week: "Week 14", value: 1, days: 1, activeFile: false },
		{ week: "Week 15", value: 1, days: 2, activeFile: false },
		{ week: "Week 16", value: 1, days: 3, activeFile: false },
		{ week: "Week 17", value: 1, days: 4, activeFile: false },
		{ week: "Week 18", value: 1, days: 1, activeFile: false },
		{ week: "Week 19", value: 1, days: 0, activeFile: false },
		{ week: "Week 20", value: 1, days: 0, activeFile: false },
		{ week: "Week 21", value: 1, days: 1, activeFile: false },
		{ week: "Week 22", value: 1, days: 2, activeFile: false },
		{ week: "Week 23", value: 1, days: 4, activeFile: false },
		{ week: "Week 24", value: 1, days: 3, activeFile: false },
		{ week: "Week 25", value: 1, days: 2, activeFile: false },
		{ week: "Week 26", value: 1, days: 1, activeFile: false },
		{ week: "Week 27", value: 1, days: 0, activeFile: false },
		{ week: "Week 28", value: 1, days: 2, activeFile: false },
		{ week: "Week 29", value: 1, days: 3, activeFile: false },
		{ week: "Week 30", value: 1, days: 2, activeFile: false },
		{ week: "Week 31", value: 1, days: 1, activeFile: false },
		{ week: "Week 32", value: 1, days: 3, activeFile: false },
		{ week: "Week 33", value: 1, days: 1, activeFile: false },
		{ week: "Week 34", value: 1, days: 1, activeFile: false },
		{ week: "Week 35", value: 1, days: 5, activeFile: false },
		{ week: "Week 36", value: 1, days: 1, activeFile: false },
		{ week: "Week 37", value: 1, days: 4, activeFile: false },
		{ week: "Week 38", value: 1, days: 3, activeFile: false },
		{ week: "Week 39", value: 1, days: 7, activeFile: false },
		{ week: "Week 40", value: 1, days: 2, activeFile: false },
		{ week: "Week 41", value: 1, days: 6, activeFile: false },
		{ week: "Week 42", value: 1, days: 5, activeFile: false },
		{ week: "Week 43", value: 1, days: 2, activeFile: false },
		{ week: "Week 44", value: 1, days: 4, activeFile: false },
		{ week: "Week 45", value: 1, days: 3, activeFile: false },
		{ week: "Week 46", value: 1, days: 7, activeFile: false },
		{ week: "Week 47", value: 1, days: 1, activeFile: false },
		{ week: "Week 48", value: 1, days: 3, activeFile: false },
		{ week: "Week 49", value: 1, days: 2, activeFile: false },
		{ week: "Week 50", value: 1, days: 1, activeFile: false },
		{ week: "Week 51", value: 1, days: 2, activeFile: true },
		{ week: "Week 52", value: 1, days: 0, activeFile: false },
	];

	const svgRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const size = 140;
		const width = size;
		const height = size;
		const margin = 10;

		// The radius of the donut chart
		const radius = Math.min(width, height) / 2 - margin;

		// Clean up previous SVG content before re-rendering
		d3.select(svgRef.current).selectAll("*").remove();

		// Append the SVG object to the div with id "chart"
		const svg = d3
			.select(svgRef.current)
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", `translate(${width / 2}, ${height / 2})`);

		// Set up the color scale
		const color = d3
			.scaleSequential()
			.domain([(d3.max(data, (d) => d.days) ?? 0) + 1, 0])
			.interpolator(d3.interpolateGreys);

		const colorActive = d3
			.scaleOrdinal()
			.domain(["active", "inactive"])
			.range(["#a13cc9", "#b0c4de"]); // Red for active, light blue for inactive

		// Compute the position of each group on the pie
		const pie = d3.pie<dataPoint>().value((d) => d.value);

		const data_ready = pie(data);

		// Create the arc generator
		const arcGenerator = d3
			.arc<d3.PieArcDatum<dataPoint>>()
			.innerRadius(radius * 0.8) // The size of the inner radius (to create a donut chart)
			.outerRadius(radius);

		// Build the donut chart
		svg.selectAll("arc")
			.data(data_ready)
			.join("path")
			.attr("d", arcGenerator)
			.attr("fill", "blue") // d => d.data.activeFile ? colorActive("active") : color(d.data.days))
			.attr("stroke", "white")
			.style("stroke-width", ".2px")
			.style("opacity", 0.7);

		svg.append("text")
			.attr("class", "title")
			.attr("x", -31)
			.attr("y", 9)
			.style("font-size", `${size / 5}px`)
			.style("fill", "#fff")
			.text(`${year}`);

	}, [data, year]);

	return <div ref={svgRef}></div>;
}
