// dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Chrome } from 'lucide-react';

// assets
import Map from '../../assets/svg/map.svg';
import BookMark from '../../assets/svg/bookmark.svg';
<<<<<<< HEAD
import Button from './Button';
import MiniMap from '../../assets/svg/miniMap.svg'
import MiniClock from '../../assets/svg/miniClock.svg';
import Calender from '../../assets/svg/calender.svg';
<<<<<<< HEAD
import { cardBody, cardDescription, cardTitle } from './tailwindcardclass/cardClass';
// import NODE_ENV (No .env file)
=======
import MiniMap from '../../assets/svg/miniMap.svg'
import MiniClock from '../../assets/svg/miniClock.svg';
import Calender from '../../assets/svg/calender.svg';
>>>>>>> ef4bf0d (REMOVED : test/ folder)
=======
<<<<<<< HEAD
=======
import { cardBody, cardDescription, cardTitle } from './tailwindcardclass/cardClass';
// import NODE_ENV (No .env file)
>>>>>>> 134478d (added the comment on Button.js)
>>>>>>> ac86c7b (added the comment on Button.js)

// constants
// import { NODE_ENV } from '../../constants';
import DefaultCardImage from "../../assets/images/card-image-default.png";

// components
import Button from './ButtonComponent';
import { cardBody, cardTitle, cardDescription } from "./tailwindcardclass/cardClass"

// styles


const Card = ({ 
    props: {
        image = DefaultCardImage, 
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
<<<<<<< HEAD
<<<<<<< HEAD
    // const companyUrl = title.toLowerCase().replace(/\s+/g, '-');
=======

>>>>>>> ef4bf0d (REMOVED : test/ folder)
=======

=======
    // const companyUrl = title.toLowerCase().replace(/\s+/g, '-');
>>>>>>> 1b362f0 (ft#8-studentLoan: Added route for student loan and tested using reusable card component on StudentLoanPage)
>>>>>>> e47aa8b (ft#8-studentLoan: Added route for student loan and tested using reusable card component on StudentLoanPage)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <div className="lg:h-[348px] lg:w-[676px] mx-auto">
        <div className={`${cardBody} justify-center `}>
            <div className="h-[300px] rounded-xl">
                <img className="min-w-full max-h-full object-fit " src={image} alt={imageAlt || title} />
            </div>
            <div>
                <div className="p-6 pb-0 w-[376px]">
                    <h5 className={`${cardTitle}`}>{title}</h5>
                    <div className='flex justify-between w-full'>
                        <div className="flex items-center space-x-2">
                            {workDetails.map(({ icon , linkKey }, index) => (
                                <div key={index} className="flex items-center text-[12px]">
                                    <img src={icon} alt={icon}/>
                                    {index !== 2 ? <p className='border-r-gray-200 border-r-2 p-1 text-nowrap'>{linkKey}</p> : <p className='text-nowrap'>{linkKey}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-clip overflow-hidden w-full h-[200px]">
                        <p className={`${cardDescription} mt-3 text-justify`}>{description}</p>
                    </div>
=======
        <div className="lg:h-[348px] lg:w-[890px] mx-auto mb-[64px]">
            <div className={`${cardBody} justify-center `}>
                <div className="h-[300px] rounded-xl">
                    <img className="min-w-full max-h-full object-fit " src={image} alt={imageAlt || title} />
>>>>>>> ef4bf0d (REMOVED : test/ folder)
=======
        <div className={styles.container}>
            <div className={`${cardBody} justify-center`}>
                <div className={styles.imageContainer}>
=======
        <div className='flex justify-center'>
            <div className={`${styles.container.small} ${styles.container.large}`}>
                <div className={`${styles.imageContainer.large} ${styles.imageContainer.small}`}>
>>>>>>> ef33a06 (MODIFIED : card.js)
                    <img className={styles.image} src={image} alt={imageAlt || title} />
>>>>>>> 8cf1e62 (REBASE : HomePage.js)
                </div>
<<<<<<< HEAD
                <div>
                    <div className={styles.contentContainer}>
                        <h5 className={`${cardTitle}`}>{title}</h5>
                        <div className={styles.workDetailsContainer}>
                            <div className="flex items-center space-x-2">
                                {workDetails.map(({ icon, linkKey }, index) => (
                                    <div key={index} className={styles.workDetailItem}>
                                        <img src={icon} alt={icon} />
                                        {index !== 2 ? (
                                            <p className={styles.workDetailText}>{linkKey}</p>
                                        ) : (
                                            <p className={styles.workDetailTextLast}>{linkKey}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
<<<<<<< HEAD
                            <Link to="">
                                <img src={Map} alt="Map" />
                            </Link>
                        </div>
{/* // I comment this to avoid error, since We don't have the Link set in App.js file yet. */}
                        <Link to={`/company/companydetail/:company`} className="text-blue-500 hover:underline">
                            <Button className="font- text-1xl p-2 px-3" variant="primary" size="large">
                                Read More
                            </Button>
                        </Link>
=======
=======
                <div className={`${styles.contentContainer.large} ${styles.contentContainer.small}`}>
                    <div className={styles.headerContainer}>
                        <div className={styles.titleContainer}>
                            <h5 className={styles.title}>{title}</h5>
>>>>>>> ef33a06 (MODIFIED : card.js)
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
<<<<<<< HEAD
                    <div className={`${styles.bodyContainer.large} ${styles.bodyContainer.small}`}>
                        <div className={styles.descriptionContainer}>
                            <p className={`text-justify`}>{description}</p>
                        </div>
<<<<<<< HEAD
                        <div className={styles.footerContainer}>
                            <div className={styles.socialContainer}>
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
<<<<<<< HEAD
    
                            <Link to={`/company/companydetail/${companyUrl}`} className={styles.readMoreLink}>
                                <Button className={styles.button} variant="primary" size="large">
                                    Read More
                                </Button>
                            </Link>
<<<<<<< HEAD
>>>>>>> ef4bf0d (REMOVED : test/ folder)

=======
>>>>>>> 8cf1e62 (REBASE : HomePage.js)
=======
>>>>>>> ef33a06 (MODIFIED : card.js)
                        </div>
=======
// I comment this to avoid error, since We don't have the Link set in App.js file yet.
                        {/* <Link to={`/company/companydetail/:company`} className="text-blue-500 hover:underline">
                            <Button className="font- text-1xl p-2 px-3" variant="primary" size="large">
=======
                    <div className="text-clip overflow-hidden w-full h-[200px]">
                        <p className={`${cardDescription} mt-3 text-justify`}>{description}</p>
                    </div>
                </div>
                <div className="p-6 pt-0">
                    <div className="social flex py-6 justify-around max-w-[200px]">
                        {socialMediaIcons.map(({ icon: Icon, linkKey, isExternal }, index) => {
                            // if (NODE_ENV === 'development') {
                            //     console.log(linkKey)
                            // }
                            return linkKey ? (
                                isExternal ? (
                                    <a href={linkKey} key={index} target="_blank" rel="noopener noreferrer">
                                        <Icon />
                                    </a>
                                ) : (
                                        "testing"
                                    // <Link to={linkKey} key={index}>
                                    //     <Icon />
                                    // </Link>
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
{/* // I comment this to avoid error, since We don't have the Link set in App.js file yet. */}
                        <Link to={`/company/companydetail/:company`} className="text-blue-500 hover:underline">
                            {/* <Button className="font- text-1xl p-2 px-3" variant="primary" size="large">
>>>>>>> 1b362f0 (ft#8-studentLoan: Added route for student loan and tested using reusable card component on StudentLoanPage)
                                Read More
                            </Button> */}
                        </Link>

>>>>>>> 6459814 (commented on Link on card component)
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Card;
