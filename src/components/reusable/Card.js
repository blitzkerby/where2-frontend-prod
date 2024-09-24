// dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Chrome } from 'lucide-react';

// assets
import Map from '../../assets/svg/map.svg';
import BookMark from '../../assets/svg/bookmark.svg';
import MiniMap from '../../assets/svg/miniMap.svg'
import MiniClock from '../../assets/svg/miniClock.svg';
import Calender from '../../assets/svg/calender.svg';

// constants
import { NODE_ENV } from '../constants';

// components
import Button from './ButtonComponent';
import { cardBody, cardTitle, cardDescription } from "./tailwindcardclass/cardClass"

const Card = ({ 
    props: {
        image = 'defaultImage.jpg', 
        imageAlt = 'default alt text', 
        title = 'Default Title', 
        description = 'Default Description', 
        socialLinks: {
            facebookLink = '#', 
            instagramLink = '#', 
            twitterLink = '#', 
            youtubeLink = '#', 
            websiteLink = '#'
        } = {}, 
        location = 'Default Location', 
        deadLine = 'Default Deadline', 
        timeOut = 'Default Timeout'
    } = {} 
}) => {

    const socialMediaIcons = [
        { icon: Facebook, linkKey: facebookLink },
        { icon: Twitter, linkKey: twitterLink },
        { icon: Instagram, linkKey: instagramLink },
        { icon: Youtube, linkKey: youtubeLink },
        { icon: Chrome, linkKey: websiteLink, isExternal: true },
    ];

    const workDetails = [
        { icon: MiniClock, linkKey: timeOut },
        { icon: Calender, linkKey: deadLine },
        { icon: MiniMap, linkKey: location },
    ];

    const companyUrl = title ? title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : "";

    return (
        <div className="lg:h-[348px] lg:w-[890px] mx-auto mb-[64px]">
            <div className={`${cardBody} justify-center `}>
                <div className="h-[300px] rounded-xl">
                    <img className="min-w-full max-h-full object-fit " src={image} alt={imageAlt || title} />
                </div>
                <div>
                    <div className="p-6 pb-0 w-[376px]">
                        <h5 className={`${cardTitle}`}>{title}</h5>
                        <div className='flex justify-between w-full'>
                            <div className="flex items-center space-x-2">
                                {workDetails.map(({ icon, linkKey }, index) => (
                                    <div key={index} className="flex items-center text-[12px]">
                                        <img src={icon} alt={icon} />
                                        {index !== 2 ? (
                                            <p className='border-r-gray-200 border-r-2 p-1 text-nowrap'>{linkKey}</p>
                                        ) : (
                                            <p className='text-nowrap'>{linkKey}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-clip overflow-hidden w-full h-[200px]">
                            <p className={`${cardDescription} mt-3 text-justify`}>{description}</p>
                        </div>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="social flex py-6 justify-around max-w-[200px]">
                            {socialMediaIcons.map(({ icon: Icon, linkKey, isExternal }, index) => {
                                if (NODE_ENV === 'development') {
                                    console.log(linkKey);
                                }
                                return linkKey ? (
                                    isExternal ? (
                                        <a href={linkKey} key={index} target="_blank" rel="noopener noreferrer">
                                            <Icon />
                                        </a>
                                    ) : (
                                        <Link to={linkKey} key={index}>
                                            <Icon />
                                        </Link>
                                    )
                                ) : null;
                            })}
                        </div>
                        <div className="flex justify-between">
                            <div className="w-[100px] flex justify-around">
                                <div>
                                    <img src={BookMark} alt="Bookmark" />
                                </div>
                                <Link to="">
                                    <img src={Map} alt="Map" />
                                </Link>
                            </div>

                            <Link to={`/company/companydetail/${companyUrl}`} className="text-blue-500 hover:underline">
                                <Button className="font- text-1xl p-2 px-3" variant="primary" size="large">
                                    Read More
                                </Button>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
