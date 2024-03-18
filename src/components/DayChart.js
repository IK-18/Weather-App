import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import DayToolTip from "./DayToolTip";

const AirPollutionChart = ({data, stroke}) => {
	return (
		<ResponsiveContainer width='200%' height={500}>
			<LineChart data={data}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='date' />
				<YAxis />
				<Line type='monotone' dataKey='Temp' stroke={stroke} />
				<Tooltip content={<DayToolTip />} />
				<Legend />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default AirPollutionChart;
