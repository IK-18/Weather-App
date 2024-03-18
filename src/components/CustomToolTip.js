import React from "react";

const CustomToolTip = ({payload, label, active}) => {
	if (active) {
		return (
			<div className='custom-tooltip bg-[#eeeeee] margin-2 border-[#dddddd] border-2'>
				<p>
					<strong>{payload[0].payload.date}</strong>
				</p>
				<p>{`${payload[0].payload.name}: ${payload[0].value}`}</p>
				{payload[0].payload.name === "Air Quality" && (
					<p>
						{payload[0].value === 1
							? "Good"
							: payload[0].value === 2
							? "Fair"
							: payload[0].value === 3
							? "Moderate"
							: payload[0].value === 4
							? "Poor"
							: payload[0].value === 5
							? "Very Poor"
							: ""}
					</p>
				)}
			</div>
		);
	}
	return null;
};

export default CustomToolTip;
