import React, {useEffect} from "react";

const CustomToolTip = ({payload, label, active}) => {
	useEffect(() => {
		console.log(payload);
	});
	if (active) {
		return (
			<div className='custom-tooltip bg-[#eeeeee] margin-2 border-[#dddddd] border-2'>
				<p>
					<strong>{payload[0].payload.date}</strong>
				</p>
				<p>{payload[0].value}</p>
			</div>
		);
	}
	return null;
};

export default CustomToolTip;
