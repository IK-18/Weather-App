import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import CustomToolTip from "./CustomToolTip";

const AirPollutionChart = ({data, stroke}) => {
	return (
		<ResponsiveContainer width='200%' height={500}>
			<LineChart data={data}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='date' />
				<YAxis />
				<Line type='monotone' dataKey='value' stroke={stroke} />
				<Tooltip content={<CustomToolTip />} />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default AirPollutionChart;
