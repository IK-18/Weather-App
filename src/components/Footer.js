import React from "react";
import {ReactComponent as Github} from "../assets/svg/github.svg";
import {ReactComponent as LinkedIn} from "../assets/svg/linkedin.svg";
import {ReactComponent as Gmail} from "../assets/svg/gmail.svg";
import {ReactComponent as WhatsApp} from "../assets/svg/whatsapp.svg";

function Footer() {
	return (
		<footer className='flex h-[15vh] w-[screen] max-w-[100vw] box-border px-[5%] items-center justify-between bg-[#374d53]'>
			<p className="whitespace-nowrap text-[14px] font-medium leading-[20px] tracking-[0] text-[#ffffff] [font-family:'General_Sans-Medium',Helvetica]">
				© 2023 Weather4U - All Rights Reserved
			</p>
			<div>
				<a className='svgLink' href='https://github.com/IK-18'>
					<Github />
				</a>
				<a
					className='svgLink'
					href='https://www.linkedin.com/in/osaite-arigbe-osula-6386a6170/'
				>
					<LinkedIn />
				</a>
				<a className='svgLink' href='mailto:ik.arigbe.osula@gmail.com'>
					<Gmail />
				</a>
				<a className='svgLink' href='https://wa.link/uvtsh2'>
					<WhatsApp />
				</a>
			</div>
		</footer>
	);
}

export default Footer;
