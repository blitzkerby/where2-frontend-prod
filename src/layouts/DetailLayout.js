import { Facebook, Twitter, Instagram } from "lucide-react";
import { convertToHTML } from "../utils/markdownConverter";


function DetailLayout({ image, description, title, websiteLink, facebookLink, instagramLink, twitterLink, telegramLink }) {
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

    const handleError = (event) => {
        event.target.src = "https://i.pinimg.com/564x/1b/b6/95/1bb69534ae81c183c82154062df5d94f.jpg";
    };

    return (
        <div className="flex flex-col items-center justify-center mx-auto my-24 p-5" style={{ maxWidth: '1040px' }}>
            <div className="w-full mb-6" style={{ width: '100%' }}>
                <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingTop: '56.25%' }}>
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                        className="border"
                        onError={handleError}
                    />
                    ) : (
                    <img
                        src="https://i.pinimg.com/564x/1b/b6/95/1bb69534ae81c183c82154062df5d94f.jpg"
                        alt="Bill is a wonderful pup!"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                        className="border"
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
                <div className="drop-shadow-md w-full bg-white sm:w-[350px] lg:w-[555px] h-auto p-4 ml-0">
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
        </div>
    );
}

export default DetailLayout;
