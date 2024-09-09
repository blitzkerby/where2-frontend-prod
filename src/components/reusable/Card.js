import { Facebook, Instagram, Twitter, Youtube, Chrome } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cardBody, cardTitle, cardDescription } from './tailwindcardclass/cardClass';
import Map from '../../assets/svg/map.svg';
import BookMark from '../../assets/svg/bookmark.svg';
import Button from './ButtonComponent';
import MiniMap from '../../assets/svg/miniMap.svg'
import MiniClock from '../../assets/svg/miniClock.svg';
import Calender from '../../assets/svg/calender.svg';
// import NODE_ENV

const Card = ({
    image,
    imageAlt,
    title,
    description,
    facebookLink,
    instagramLink,
    twitterLink,
    youtubeLink,
    websiteLink,
    location,
    deadLine,
    timeOut
}) => {
    const socialMediaIcons = [
        { icon: Facebook, linkKey: facebookLink },
        { icon: Twitter, linkKey: twitterLink },
        { icon: Instagram, linkKey: instagramLink },
        { icon: Youtube, linkKey: youtubeLink },
        { icon: Chrome, linkKey: websiteLink, isExternal: true },
    ];
    const companyUrl = title.toLowerCase().replace(/\s+/g, '-');
    const workDetails = [
        { icon: MiniClock, linkKey: timeOut },
        { icon: Calender, linkKey: deadLine },
        { icon: MiniMap, linkKey: location },
    ]
}