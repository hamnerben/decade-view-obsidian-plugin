import { useEffect, useRef } from "react";
import { TFile } from "obsidian";
import * as d3 from "d3";

export default function Donut({ year, data }: { year: number, data: any }) {
	const textColor = "var(--color-base-100)"
	const activeCellColor = "var(--text-accent)";
	const inactiveCellColor = "var(--color-base-60)";
	const emptyCellColor = "var(--background-secondary)";
	const strokeColor = "var(--color-base-100)";

	type NoteData = {
		uid: string;    // The unique identifier of the file
		file: TFile;    // The file object
		activeFile: boolean; // Whether the file is the active file
	  };
	
	interface dataPoint {
		week: number;
		notes: NoteData[];
		activeNote: boolean;
		value: 1; // Ensures that value is always 1
	}

	const svgRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const size = 120;  // 120
		const width = size;
		const height = size;
		const margin = 10;
		let isActive = false;

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


		const colorScale = d3
			.scaleOrdinal()
			.domain(["active", "inactive", "empty"])
      		.range([activeCellColor, inactiveCellColor, emptyCellColor]);

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
			.attr("fill", (d) => {
				const weekNotes = d.data.notes;
				if (weekNotes.length === 0) {
				  return colorScale("empty") as string; // Grey for empty weeks
				} else if (weekNotes.some(note => note.activeFile)) {
					isActive = true;
				  return colorScale("active") as string; // Color for active note
				} else {
				  return colorScale("inactive") as string; // Color for inactive notes
				}
			  }) 
			.attr("stroke", strokeColor)
			.style("stroke-width", ".2px")
			.style("opacity", 0.7);

		svg.append("text")
			.attr("class", "title")
			.attr("x", `${size / -4.7}`)
			.attr("y", `${size / 15}`)
			.style("font-size", `${size / 5}px`)
			.style("fill", isActive ? colorScale("active") as string : textColor)
			.text(`${year}`);

	}, [data, year]);

	return <div ref={svgRef}></div>;
}
