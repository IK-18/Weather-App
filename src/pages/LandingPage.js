import React from "react";
import {ReactComponent as Logo} from "../assets/svg/logo.svg";
import carousel1 from "../assets/images/images (1).jpeg";
import carousel2 from "../assets/images/images (4).jpeg";
import carousel3 from "../assets/images/images (5).jpeg";
import bus from "../assets/images/bus.jpg";
import pos from "../assets/images/pos.jpg";
import {CCarousel, CCarouselItem, CImage} from "@coreui/react";
import {ReactComponent as Free} from "../assets/svg/free.svg";
import {ReactComponent as Swift} from "../assets/svg/swift.svg";
import {ReactComponent as Secure} from "../assets/svg/secure.svg";
import {ReactComponent as Authentic} from "../assets/svg/authentic.svg";
import {ReactComponent as BackG} from "../assets/svg/Group 584.svg";
import {ReactComponent as Mobile} from "../assets/svg/teenyicons_mobile-outline.svg";
import {ReactComponent as FB} from "../assets/svg/ic_baseline-facebook.svg";
import {ReactComponent as IG} from "../assets/svg/ri_instagram-fill.svg";
import {ReactComponent as TW} from "../assets/svg/bi_twitter.svg";
import Navbar from "../components/Navbar";
import "../styles/carousel.sass";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";

const LandingPage = () => {
	return (
		<div className='z-10'>
			<div className='relative flex h-full w-full flex-col justify-center bg-[#f6deff]'>
				<div className='absolute right-0 top-[-13%] z-0 h-full w-full'>
					<div className='relative right-0 top-0 h-[2449px] w-[1836px]'>
						<div className='absolute right-0 top-[528px] inline-flex items-start'>
							<div className='relative mb-[-1.24px] ml-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mr-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
						</div>
						<div className='absolute right-0 top-[768px] inline-flex items-start'>
							<div className='relative mb-[-1.24px] ml-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mr-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
						</div>
						<div className='absolute right-0 top-[1008px] inline-flex items-start'>
							<div className='relative mb-[-1.24px] ml-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mr-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
						</div>
						<div className='absolute right-0 top-[1248px] inline-flex items-start'>
							<div className='relative mb-[-1.24px] ml-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mr-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
						</div>
						<div className='absolute right-0 top-[1488px] inline-flex items-start'>
							<div className='relative mb-[-1.24px] ml-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mr-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
						</div>
						<div className='absolute right-0 top-[1728px] inline-flex items-start'>
							<div className='relative mb-[-1.24px] ml-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mr-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
						</div>
						<div className='absolute right-0 top-[1968px] inline-flex items-start'>
							<div className='relative mb-[-1.24px] ml-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
							<div className='relative mb-[-1.24px] mr-[-1.24px] mt-[-1.24px] h-[242.48px] w-[242.48px] rounded-[26.48px] border-[2.48px] border-solid border-[#f0f0f0]' />
						</div>
						<div className='left-[-352px] top-[1278px] h-[720px] w-[1425px] -rotate-90 [background:linear-gradient(180deg,rgb(232.49,254.42,232.49)_0%,rgba(241,251,241,0.04)_100%)]' />
						<div className='left-[45px] top-0 h-[1526px] w-[1791px] rounded-[895.45px/763.03px] [background:radial-gradient(50%_50%_at_50%_50%,rgb(235,254,235)_0%,rgba(255,255,255,0)_100%)]' />
					</div>
				</div>
				<div className='relative w-full overflow-hidden'>
					<div className='w-full'>
						<Navbar />
						<div className='my-[5%] flex w-full flex-col items-center'>
							<div className='relative mb-[1%] inline-flex h-[15%] flex-[0_0_auto] flex-col items-center'>
								<div className='font-title text-variable-collection-black relative mt-[-1.00px] w-fit text-center text-[length:var(--title-font-size)] font-[number:var(--title-font-weight)] leading-[var(--title-line-height)] tracking-[var(--title-letter-spacing)] [font-style:var(--title-font-style)]'>
									Welcome to Weather4U
								</div>
								<p className='font-h1-desktop text-variable-collection-secondary relative m-0 mb-1 w-[60%] text-center text-[length:var(--h1-desktop-font-size)] font-[number:var(--h1-desktop-font-weight)] leading-[var(--h1-desktop-line-height)] tracking-[var(--h1-desktop-letter-spacing)] [font-style:var(--h1-desktop-font-style)]'>
									<span className='font-h1-desktop text-[length:var(--h1-desktop-font-size)] font-[number:var(--h1-desktop-font-weight)] leading-[var(--h1-desktop-line-height)] tracking-[var(--h1-desktop-letter-spacing)] text-[#384c52] [font-style:var(--h1-desktop-font-style)]'>
										{" "}
										Your Gateway to Trusted{" "}
									</span>
									<span className='font-h1-desktop text-[length:var(--h1-desktop-font-size)] font-[number:var(--h1-desktop-font-weight)] leading-[var(--h1-desktop-line-height)] tracking-[var(--h1-desktop-letter-spacing)] text-[var(--primary-color-100)] [font-style:var(--h1-desktop-font-style)]'>
										Local Weather
									</span>
									<span className='font-h1-desktop text-[length:var(--h1-desktop-font-size)] font-[number:var(--h1-desktop-font-weight)] leading-[var(--h1-desktop-line-height)] tracking-[var(--h1-desktop-letter-spacing)] text-[#384c52] [font-style:var(--h1-desktop-font-style)]'>
										{" "}
										Data!
									</span>
								</p>
							</div>
						</div>
					</div>
					<div className='my-[15%] flex w-full flex-col items-center justify-between'>
						<div className='mb-[7.5%] flex w-[75%] items-center justify-between gap-[5%]'>
							<div className='relative inline-flex flex-[0_0_auto] flex-col items-start gap-[32px]'>
								<p className='font-h3-desktop relative mt-[-1.00px] w-[612px] text-[length:var(--h3-desktop-font-size)] font-[number:var(--h3-desktop-font-weight)] leading-[var(--h3-desktop-line-height)] tracking-[var(--h3-desktop-letter-spacing)] text-[#364a50] [font-style:var(--h3-desktop-font-style)]'>
									Real-Time Weather Updates
								</p>
								<p className='font-body1-desktop relative h-[180px] w-[586px] text-[length:var(--body1-desktop-font-size)] font-[number:var(--body1-desktop-font-weight)] leading-[var(--body1-desktop-line-height)] tracking-[var(--body1-desktop-letter-spacing)] text-[#000000] [font-style:var(--body1-desktop-font-style)]'>
									Get access to up-to-date weather information
									for major cities across the globe, allowing
									you to plan your activities accordingly and
									make informed decisions based on the current
									weather conditions.
								</p>
							</div>
							<CCarousel
								className='h-[60vh] w-[60vh] rounded-[20px] bg-cover bg-[50%_50%] shadow-[0px_4px_200px_#0000001a]'
								indicators
								transition='crossfade'
								interval={3000}
							>
								<CCarouselItem>
									<CImage
										src={carousel1}
										className='aspect-square h-full w-full overflow-hidden rounded-[20px] bg-[50%_50%]'
									/>
								</CCarouselItem>
								<CCarouselItem>
									<CImage
										src={carousel2}
										className='aspect-square h-full w-full overflow-hidden rounded-[20px] bg-[50%_50%]'
									/>
								</CCarouselItem>
								<CCarouselItem>
									<CImage
										src={carousel3}
										className='aspect-square h-full w-full overflow-hidden rounded-[20px] bg-[50%_50%]'
									/>
								</CCarouselItem>
							</CCarousel>
						</div>
						<div className='flex w-[75%] items-center justify-between gap-[5%]'>
							<img
								className='relative h-[60vh] w-[60vh] rounded-[20px] bg-cover bg-[50%_50%] shadow-[0px_4px_200px_#0000001a]'
								src={pos}
								alt=''
							/>
							<div className='relative flex w-[60vh] flex-col items-start gap-[32px]'>
								<div className='font-h3-desktop relative mr-[-28.00px] mt-[-1.00px] w-[612px] text-[length:var(--h3-desktop-font-size)] font-[number:var(--h3-desktop-font-weight)] leading-[var(--h3-desktop-line-height)] tracking-[var(--h3-desktop-letter-spacing)] text-[#364a50] [font-style:var(--h3-desktop-font-style)]'>
									Multi-Day Forecast
								</div>
								<p className='font-body1-desktop relative h-[180px] w-[584px] text-[length:var(--body1-desktop-font-size)] font-[number:var(--body1-desktop-font-weight)] leading-[var(--body1-desktop-line-height)] tracking-[var(--body1-desktop-letter-spacing)] text-[#000000] [font-style:var(--body1-desktop-font-style)]'>
									Stay prepared and ahead of the weather curve
									with a multi-day weather forecast, providing
									you with an extended outlook to help you
									plan events, trips, and activities well in
									advance.
								</p>
							</div>
						</div>
					</div>
					<div className='my-[15%] flex w-full justify-between'>
						<div className='flex h-[70vh] w-full items-center justify-around'>
							<div className='mb-[7.5%] flex flex-col items-start gap-[10%]'>
								<div className='mb-[5%] inline-flex flex-col items-start gap-[15px]'>
									<div className='font-h2-desktop text-variable-collection-secondary relative mt-[-1.00px] w-[402px] text-[length:var(--h2-desktop-font-size)] font-[number:var(--h2-desktop-font-weight)] leading-[var(--h2-desktop-line-height)] tracking-[var(--h2-desktop-letter-spacing)] [font-style:var(--h2-desktop-font-style)]'>
										Why Choose Weather4U ?
									</div>
								</div>
								<img
									className='relative h-[50vh] w-[50vh] rounded-[20px] bg-cover bg-[50%_50%] shadow-[0px_4px_200px_#0000001a]'
									alt='Rectangle'
									src={bus}
								/>
							</div>
							<div className='inline-flex flex-col items-start gap-[42px]'>
								<div className='relative flex w-[590px] flex-[0_0_auto] items-center justify-center gap-[32px]'>
									<div className='flex h-[10vh] w-[10vh] items-center justify-center rounded-[20px] bg-[#384C52]'>
										<Free className='relative flex-[0_0_auto]' />
									</div>
									<div className='relative flex flex-1 grow flex-col items-start gap-[12px]'>
										<div className='font-h4-desktop relative mt-[-1.00px] w-[179px] text-[length:var(--h4-desktop-font-size)] font-[number:var(--h4-desktop-font-weight)] leading-[var(--h4-desktop-line-height)] tracking-[var(--h4-desktop-letter-spacing)] text-[#000000] [font-style:var(--h4-desktop-font-style)]'>
											Personalized
										</div>
										<p className='font-body2-desktop relative self-stretch text-[length:var(--body2-desktop-font-size)] font-[number:var(--body2-desktop-font-weight)] leading-[var(--body2-desktop-line-height)] tracking-[var(--body2-desktop-letter-spacing)] text-[#00000099] [font-style:var(--body2-desktop-font-style)]'>
											Customize your weather settings and
											units of measurement to create a
											personalized weather experience
											tailored to your preferences,
											ensuring that you receive weather
											information in the format that best
											suits you.
										</p>
									</div>
								</div>
								<div className='relative flex w-[590px] flex-[0_0_auto] items-center justify-center gap-[32px]'>
									<div className='flex h-[10vh] w-[10vh] items-center justify-center rounded-[20px] bg-[#384C52]'>
										<Swift className='relative flex-[0_0_auto]' />
									</div>
									<div className='relative flex flex-1 grow flex-col items-start gap-[12px]'>
										<div className='font-h4-desktop relative mt-[-1.00px] w-[300px] text-[length:var(--h4-desktop-font-size)] font-[number:var(--h4-desktop-font-weight)] leading-[var(--h4-desktop-line-height)] tracking-[var(--h4-desktop-letter-spacing)] text-[#000000] [font-style:var(--h4-desktop-font-style)]'>
											User-Friendly
										</div>
										<p className='font-body2-desktop relative self-stretch text-[length:var(--body2-desktop-font-size)] font-[number:var(--body2-desktop-font-weight)] leading-[var(--body2-desktop-line-height)] tracking-[var(--body2-desktop-letter-spacing)] text-[#00000099] [font-style:var(--body2-desktop-font-style)]'>
											Enjoy a seamless and user-friendly
											interface that makes finding weather
											information a breeze, with intuitive
											navigation, clear weather displays,
											and a visually appealing design that
											enhances your overall user
											experience.
										</p>
									</div>
								</div>
								<div className='relative flex w-[590px] flex-[0_0_auto] items-center justify-center gap-[32px]'>
									<div className='flex h-[10vh] w-[10vh] items-center justify-center rounded-[20px] bg-[#384C52]'>
										<Secure className='relative flex-[0_0_auto]' />
									</div>
									<div className='relative flex flex-1 grow flex-col items-start gap-[12px]'>
										<div className='font-h4-desktop relative mt-[-1.00px] w-[179px] text-[length:var(--h4-desktop-font-size)] font-[number:var(--h4-desktop-font-weight)] leading-[var(--h4-desktop-line-height)] tracking-[var(--h4-desktop-letter-spacing)] text-[#000000] [font-style:var(--h4-desktop-font-style)]'>
											Global
										</div>
										<p className='font-body2-desktop relative self-stretch text-[length:var(--body2-desktop-font-size)] font-[number:var(--body2-desktop-font-weight)] leading-[var(--body2-desktop-line-height)] tracking-[var(--body2-desktop-letter-spacing)] text-[#00000099] [font-style:var(--body2-desktop-font-style)]'>
											From bustling metropolises to remote
											corners of the world, our weather
											forecast covers a wide range of
											cities, ensuring that you have
											access to accurate and reliable
											weather information no matter where
											your adventures take you.
										</p>
									</div>
								</div>
								<div className='relative flex w-[590px] flex-[0_0_auto] items-center justify-center gap-[32px]'>
									<div className='flex h-[10vh] w-[10vh] items-center justify-center rounded-[20px] bg-[#384C52]'>
										<Authentic className='relative flex-[0_0_auto]' />
									</div>
									<div className='relative flex flex-1 grow flex-col items-start gap-[12px]'>
										<div className='font-h4-desktop relative mt-[-1.00px] w-[179px] text-[length:var(--h4-desktop-font-size)] font-[number:var(--h4-desktop-font-weight)] leading-[var(--h4-desktop-line-height)] tracking-[var(--h4-desktop-letter-spacing)] text-[#000000] [font-style:var(--h4-desktop-font-style)]'>
											Authentic
										</div>
										<p className='font-body2-desktop relative self-stretch text-[length:var(--body2-desktop-font-size)] font-[number:var(--body2-desktop-font-weight)] leading-[var(--body2-desktop-line-height)] tracking-[var(--body2-desktop-letter-spacing)] text-[#00000099] [font-style:var(--body2-desktop-font-style)]'>
											Trust in the accuracy and
											reliability of our weather
											information, sourced from reputable
											providers and updated in real-time,
											ensuring that you receive authentic
											and precise weather data for your
											desired locations.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='my-[15%] h-[40vh] w-full'>
						<div className='relative flex h-[40vh] w-full flex-col items-center overflow-hidden rounded-[32px]'>
							<div className='absolute h-[40vh] w-[75%] rounded-[32px] bg-[#394c52]'>
								<BackG className='h-[40vh] rounded-[32px]' />
							</div>
							<div className='relative flex h-[40vh] w-[75%] items-center justify-around'>
								<p className='font-h2-desktop left-[474px] top-[134px] w-[393px] text-[length:var(--h2-desktop-font-size)] font-[number:var(--h2-desktop-font-weight)] leading-[var(--h2-desktop-line-height)] tracking-[var(--h2-desktop-letter-spacing)] text-white [font-style:var(--h2-desktop-font-style)]'>
									Start Exploring Now!
								</p>
								<div className='flex flex-col items-start gap-[32px]'>
									<p className='font-body1-desktop relative mt-[-1.00px] w-[483px] text-[length:var(--body1-desktop-font-size)] font-[number:var(--body1-desktop-font-weight)] leading-[var(--body1-desktop-line-height)] tracking-[var(--body1-desktop-letter-spacing)] text-white [font-style:var(--body1-desktop-font-style)]'>
										Begin your weather exploration journey
										by searching for your preferred city or
										browsing through our extensive list of
										major cities, empowering you to get
										instant and comprehensive weather
										details for any location of your choice.
									</p>
								</div>
							</div>
						</div>
					</div>
					<Footer />
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
