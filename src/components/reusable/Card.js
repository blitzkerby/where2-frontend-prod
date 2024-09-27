// dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Chrome } from 'lucide-react';

// assets
import Map from './../../assets/svg/map.svg';
import BookMark from './../../assets/svg/bookmark.svg';
import MiniMap from './../../assets/svg/miniMap.svg'
import MiniClock from './../../assets/svg/miniClock.svg';
import Calender from './../../assets/svg/calender.svg';

// constants
// import { NODE_ENV } from '../../constants';
import DefaultCardImage from "../../assets/images/card-image-default.png";

// components
import Button from './ButtonComponent';
import { cardBody, cardTitle, cardDescription } from "./tailwindcardclass/cardClass"

// styles


const Card = ({ 
        image,
        imageAlt,
        title,
        description,
        facebookLink = '#', 
        instagramLink = '#', 
        twitterLink = '#', 
        youtubeLink = '#', 
        websiteLink = '#', 
        location , 
        deadLine, 
        timeOut,
        id,
        type,
        route,
    } 
) => {

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

    const styles = {
        /* text */
        title: "text-h4p font-bold",
        utility: "text-pp",
        description: "text-p mb-8",

        /* image */
        image: "min- max- object-cover",
        
        /* container */
        container: {
            large: `relative clip-border-box rounded-xl border flex sm:flex-col md:flex-row shadow-md`,
            small: ``
        },
        imageContainer: {
            large: "lg:h-auto rounded-xl",
            small: "",
        },
        contentContainer: {
            large: "flex-1 lg:pl-9 lg:pr-5 lg:py-3",
            small: "sm:px-5 sm:py-5"
        },
                
        headerContainer: "sm:mt-3",
        titleContainer: "sm:mb-2",
        utilityContainer: "flex sm:flex-col  h-auto sm:mb-3 lg:my-2",
        iconContainer: "flex justify-center sm:w-[5%]",
        
        bodyContainer: {
            large:"flex flex-col lg:h-[78%]",
            small:"sm:h-[200px]"
        },

        descriptionContainer: "flex-1 text-clip overflow-hidden ",
        footerContainer: "mt-auto text-center",

        socialContainer: "mb-4 flex justify-around max-w-[200px]",

        utilityItem  : "px-4 mr-4 text-nowrap",
        utilityBorder: "lg:border-r-gray-200 lg:border-r-2 ",

        workDetailsContainer: "flex justify-between ",
        workDetailItem: "flex items-center text-[12px]",
        workDetailText: "border-r-gray-200 border-r-2 p-1 text-nowrap",
        workDetailTextLast: "text-nowrap",

        bookmarkContainer: "w-[100px] flex justify-around",
        readMoreLink: "text-blue-500 hover:underline",
        button: "text-1xl p-2 px-3",
    };
    
    return (
        <div className='flex justify-center'>
            <div className={`${styles.container.small} ${styles.container.large}`}>
                <div className={`${styles.imageContainer.large} ${styles.imageContainer.small}`}>
                    <img className={styles.image} src={image} alt={imageAlt || title} />
                </div>
                <div className={`${styles.contentContainer.large} ${styles.contentContainer.small}`}>
                    <div className={styles.headerContainer}>
                        <div className={styles.titleContainer}>
                            <h5 className={styles.title}>{title}</h5>
                        </div>
                        <div className={styles.utilityContainer}>
                            {workDetails.map(({ icon, linkKey }, index) => (
                                <div key={index} className={styles.workDetailItem}>
                                    <div className={styles.iconContainer}>
                                        <img src={icon} alt={icon} />
                                    </div>

                                    {index !== 2 
                                        ? <p className={`${styles.utilityItem} ${styles.utilityBorder}`}>{linkKey}</p>
                                        : <p className={`${styles.utilityItem}`}>{linkKey}</p>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`${styles.bodyContainer.large} ${styles.bodyContainer.small}`}>
                        <div className={styles.descriptionContainer}>
                            <p className={`text-justify`}>{description}</p>
                        </div>
                        <div className={styles.footerContainer}>
                            <div className={styles.socialContainer}>
                                {socialMediaIcons.map(({ icon: Icon, linkKey, isExternal }, index) => {
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
                                <div className={styles.bookmarkContainer}>
                                    <div>
                                        <img src={BookMark} alt="Bookmark" />
                                    </div>
                                    <Link to="">
                                        <img src={Map} alt="Map" />
                                    </Link>
                                </div>

                                <Link to={`/company/companydetail/${companyUrl}`} className={styles.readMoreLink}>
                                    <Button className={styles.button} variant="primary" size="large">
                                        Read More
                                    </Button>
                                </Link>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Card;
