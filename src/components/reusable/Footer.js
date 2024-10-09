import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { BiTargetLock } from "react-icons/bi";
import { PiPersonSimpleHike } from "react-icons/pi";

const FooterLink = ({ href, children }) => (
  <Link to={href} className="hover:underline">
    {children}
  </Link>
);
const SocialIcon = ({ Icon }) => (
  <div className="w-8 h-8 rounded-full bg-[#87CEEB] flex items-center justify-center text-white cursor-pointer " style={{ filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }} >
    <Icon />
  </div>
);

function Footer () {
  return (
    <footer className="bg-[#E6F3F9] text-gray-700 py-8 px-4 w-full bottom-0">
      <div className="container mx-auto max-w-[1440px]">
        <div className="md:flex md:justify-between flex justify-between flex-wrap md:mr-6">
          {/* Desktop: Left column, Mobile: Top section */}
          <div className="mb-8 md:mb-0 w-1/2 md:w-1/4 p-2">
            <h2 className="font-bold mb-2  underline decoration-[3px] underline-offset-8"><FooterLink href="/universities">Universities</FooterLink></h2>
            <h2 className="font-bold mb-2  underline decoration-[3px] underline-offset-8"><FooterLink href="/scholarships">Scholarships</FooterLink></h2>
            <div className="mb-4">
              <h2 className="font-bold mb-2  underline decoration-[3px] underline-offset-8"><FooterLink href="/livelihood">Livelihood</FooterLink></h2>
              <ul className=" text-sm" style={{color:'rgba(157, 160, 161, 1)'}}>
                <li><FooterLink href="/part-time-job">Part Time Job</FooterLink></li>
                <li><FooterLink href="/student-loan">Student Loan</FooterLink></li>
                <li><FooterLink href="/accommodation">Accommodation</FooterLink></li>
                <li><FooterLink href="/healthcare">W2Health</FooterLink></li>
              </ul>
            </div>
          </div>
          {/* Desktop: Middle columns, Mobile: Middle section */}
          <div className="mb-8 md:mb-0 w-1/2 md:w-1/4 p-2">
            <h2 className="font-bold mb-2  underline decoration-[3px] underline-offset-8"><FooterLink href="/about-us">About Us</FooterLink></h2>
            <ul className=" text-sm" style={{color:'rgba(157, 160, 161, 1)'}}>
              <li className="flex items-center">
                <span className="mr-2"><BiTargetLock /></span>
                <FooterLink href="/our-vision">Our Vision</FooterLink>
              </li>
              <li className="flex items-center">
                <span className="mr-2"><PiPersonSimpleHike /></span>
                <FooterLink href="/our-mission">Our Mission</FooterLink>
              </li>
            </ul>
          </div>

          {/* Desktop: Right column, Mobile: Bottom section */}
          <div className='w-1/2 md:w-1/4'>
            <h2 className="font-bold   underline decoration-[3px] underline-offset-8 md:hidden mb-6"><FooterLink href="/contact-us">Contact Us</FooterLink></h2>
            <h2 className="font-bold   underline decoration-[3px] underline-offset-8 hidden md:block mb-6">Contact Us</h2>
            <ul className="text-sm mb-4" style={{color:'rgba(157, 160, 161, 1)'}}>
              <li className="flex items-center mb-1">
                <span className="mr-2"><CiMail />
								</span>
                <a href="mailto:where2@gmail.com" className="hover:underline">developers@w2hub.org</a>
              </li>
              <li className="flex items-center">
                <span className="mr-2"><CiLocationOn /></span>
                <a href='/' className="hover:underline" >Phnom Penh</a>
              </li>
            </ul>
            <div className="md:hidden">
              <div className="flex space-x-2  ">
                <SocialIcon Icon={FaTwitter} />
                <SocialIcon Icon={FaInstagram} />
                <SocialIcon Icon={FaFacebookF} />
              </div>
            </div>
          </div>
          {/* Desktop: Social icons column */}
          <div className="hidden md:block">
						<h2 className="font-bold mb-2 underline decoration-[3px] underline-offset-8">Our Social</h2>
						<div className="space-y-2 flex flex-col items-center">
							<SocialIcon Icon={FaTwitter} />
							<SocialIcon Icon={FaInstagram} />
							<SocialIcon Icon={FaFacebookF} />
						</div>
					</div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm">
          <p>COPYRIGHT © 2024 Where2. All rights reserved. </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;