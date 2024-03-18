import React from "react";
import Logo from "../assets/images/4052984.png";
import {Link, NavLink} from "react-router-dom";

const Navbar = () => {
	return (
		<nav className='flex w-full items-center justify-between px-[1%] pt-[1.5%]'>
			<Link
				to='/'
				className='inline-flex w-1/3 items-center gap-[15px] no-underline'
			>
				<img className='h-[15vh]' src={Logo} alt='Logo' />
				<h1 className='relative w-fit text-center font-bold leading-[normal] tracking-[0] text-[#384c51] text-[5vh]'>
					Weather4U
				</h1>
			</Link>
			<h1 className='w-1/3'>Weather Data On The Go!</h1>
			<div className='w-1/3'></div>
		</nav>
	);
};

export default Navbar;
