import React from "react";
import Logo from "../assets/images/4052984.png";
import {Link} from "react-router-dom";

const Navbar = () => {
	return (
		<nav className='flex w-full !box-border items-center justify-center px-[1%] pt-[1.5%]'>
			<Link
				to='/'
				className='inline-flex w-1/3 items-center gap-[15px] no-underline'
			>
				<img className='h-[15vh]' src={Logo} alt='Logo' />
				<h1 className='relative w-fit text-center font-bold leading-[normal] tracking-[0] text-[#384c51] text-[5vh]'>
					Weather4U
				</h1>
			</Link>
			<h1 className='w-1/3 text-center'>Weather Data On The Go!</h1>
			<div className='flex justify-end w-1/3'>
				<Link
					to='/weather'
					className='inline-flex text-white items-center justify-center gap-[10px] rounded-[70px] bg-[var(--primary-color-200)] px-[2.5rem] py-[1.25rem] no-underline transition-all hover:bg-[var(--primary-color-300)] hover:shadow'
				>
					<div className='font-buttontext-desktop relative w-fit whitespace-nowrap text-[length:var(--buttontext-desktop-font-size)] font-[number:var(--buttontext-desktop-font-weight)] leading-[var(--buttontext-desktop-line-height)] tracking-[var(--buttontext-desktop-letter-spacing)] [font-style:var(--buttontext-desktop-font-style)]'>
						Check it out!
					</div>
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
