import { useState } from "react";
import { Facebook, Twitter, Instagram, ImageIcon } from "lucide-react";

import {convertToHTML} from "../utility/markdownConverter/markdownConverter"

import DiscussionContainer from "../components/reusable/DiscussionContainer";

function DetailLayout({ image, description, title, websiteLink, facebookLink, instagramLink, twitterLink, telegramLink }) {
    const [imageError, setImageError] = useState(false)
    
    const socialMediaIcons = [
        { icon: Facebook, linkKey: facebookLink },
        { icon: Twitter, linkKey: twitterLink },
        { icon: Instagram, linkKey: instagramLink },
    ];

    const socialLinks = [
        { label: 'Website', link: websiteLink },
        { label: 'Instagram', link: instagramLink },
        { label: 'Telegram', link: telegramLink },
        { label: 'Twitter', link: twitterLink },
        { label: 'Facebook', link: facebookLink },
    ];

    const handleError = () => {
        setImageError(true)
    };

    return (
        <div className="flex flex-col items-center justify-center mx-auto my-24 p-5" style={{ maxWidth: '1040px' }}>
            <div className="w-full mb-6" style={{ width: '100%' }}>
                <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingTop: '56.25%' }}>
                    {imageError || !image ? (
                        <div 
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' , backgroundColor: "lightgrey"}}
                            className="top-0 left-0 flex items-center justify-center border"
                            >
                            <ImageIcon size={48} color="gray" />
                        </div>
                        ) : (
                        <img
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                            className="border"
                            src={image}
                            onError={handleError}
                        />
                    )}
                </div>
            </div>
            <div className="w-full mb-6">
                <h2 className="text-2xl mb-4">{title}</h2>
                {convertToHTML(description)}
            </div>
            <div className="w-full social flex py-6 ml-0 gap-[15px]">
                {socialMediaIcons.map(({ icon: Icon, linkKey }, index) => (
                    linkKey ? (
                        <a href={linkKey} key={index} target="_blank" rel="noopener noreferrer">
                            <Icon />
                        </a>
                    ) : null
                ))}
            </div>
            <div className="w-full">
                <div className="drop-shadow-md w-full bg-white 
                    lg:w-[555px]
                    sm:w-[100%] h-auto p-4 ml-0">
                    <h4 className="text-lg font-semibold border-b-2">Relevant Links</h4>
                    <p className="mt-5">Requirement</p>
                    {socialLinks.map(({ label, link }) => (
                        link && (
                            <div className="mt-2" key={label}>
                                <a
                                    className="text-sm block text-ellipsis overflow-hidden whitespace-nowrap"
                                    href={link}
                                    style={{ color: 'rgba(0,0,0,0.45)' }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {label}
                                </a>
                            </div>
                        )
                    ))}
                </div>
            </div>
            <DiscussionContainer />
        </div>
    );
}

export default DetailLayout;
