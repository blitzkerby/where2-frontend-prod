// dependencies
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

//assets
import EnabledMap from '../../assets/svg/EnabledMap.svg';   //map enabled
import DisabledMap from '../../assets/svg/DisabledMap.svg';   //map disabled
import MiniMap from '../../assets/svg/miniMap.svg';
import BookMark from '../../assets/svg/bookmark.svg';
import Calender from '../../assets/svg/calender.svg';
import MiniClock from '../../assets/svg/miniClock.svg';
import { Facebook, Instagram, Twitter, Youtube, Chrome } from 'lucide-react';
import FilledHeart from '../../assets/svg/filled-heart.svg';
import Where2Logo from '../../assets/images/where2.jpg'
import  {convertToHTML}  from '../../utility/markdownConverter';
//components
import Button from './ButtonComponent';

//slice
import { addFavorite, removeFavorite } from "../../features/slices/favoriteSlice";
import  {setIsClicked}  from '../../features/slices/favoriteSlice';




const Card = ({
  image = '',
  imageAlt = '',
  title = '',
  description = '',
  socialLinks: { facebookLink = '', instagramLink = '', twitterLink = '', youtubeLink = '', websiteLink = '' } = {},
  position,
  salary,
  term,
  loan_size,
  interest,
  location, 
  deadLine = '', 
  timeOut = '',
  route,
  type,
  isHeartClicked, 
  id,
  size,
  price,
  mapURL,
}) => {
  const user = JSON.parse(localStorage.getItem('authData'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [heartClicked, setHeartClicked] = useState()

  useEffect(() => {
    setHeartClicked(isHeartClicked)
  },[isHeartClicked])

  const handleReadMoreClick = () => {
    navigate(route);
  };
  
  const handleHeartClick = async () => {
    setHeartClicked(false)
      await removeFavorite(id, type);
    dispatch(setIsClicked({ id: id }))

    };
    
  const handleRemoveHeartClick = async () => {
    if (user) {
      setHeartClicked(true)
      await addFavorite(id, type);
      dispatch(setIsClicked({ id: id }))
    } else if(window.confirm('Please login or Sign up to Add your Collection!') === true) {
      navigate('/login');
    }
  };

  const handleError = (event) => {
    event.target.src = Where2Logo;
  };

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

  return (
    <div className="relative clip-border-box rounded-xl border flex md:flex-row shadow-md
        lg:h-[348px] lg:w-[886px]
        sm:max-w-[600px] sm:w-[100%] sm:flex-col">
      <div className="bg-cover bg-center rounded-xl flex-shrink-0
          lg:w-[398px]
          sm:w-[100%] sm:max-h-[348px]">
        {image ? (
          <img
            className="top-0 left-0 w-full h-full object-cover -z-10"
            src={image}
            alt={imageAlt}
            onError={handleError}
          />
        ) : (
          <img
            className="top-0 left-0 w-full h-full object-cover -z-10"
            src={Where2Logo}
            alt="where2 logo"
          />
        )}
      </div>
      <div className="flex-1 lg:pl-9 lg:pr-5 lg:py-3 sm:px-5 sm:py-5">
        <div className="sm:mt-3">
          <div className="sm:mb-2">
            <h5 className="text-h4p font-bold">{title}</h5>
          </div>
          <div className="flex sm:flex-col h-auto sm:mb-3 lg:my-2">
            {workDetails.map(({ icon, linkKey }, index) => (
              linkKey && (
                <div key={index} className="flex items-center text-[12px]">
                  <div className="flex justify-center sm:w-[5%]">
                    <img src={icon} alt={icon} />
                  </div>
                  <p className={`px-4 mr-4 text-nowrap ${index !== 2 ? 'lg:border-r-gray-200 lg:border-r-2' : ''}`}>
                    {linkKey}
                  </p>
                </div>
              )
            ))}
          </div>
            {type === "job"?  <div className="py-2">
              <p className="py-1">Position :<span> {position}</span></p>
              <p>Salary :<span> ${salary}</span></p>
            </div> : null}
            {type === "loan"? <div className="py-2">
              <p>
                Term:<span> {term}</span>
              </p>
              <p>
                Interest Rate:<span> {interest}</span>
              </p>
            </div> : null}
            {type === "accommodation"? <div className="py-2">
              <p>
                Size :<span> {size}</span>
              </p>
              <p>
                Price:<span> {price}</span>
              </p>
            </div> : null}
        </div>
        <div className="flex flex-col lg:h-[62%] sm:h-[200px]">
          <div className="flex-1 text-clip overflow-hidden h-[10px]">
            <p className="text-justify">{convertToHTML(description)}</p>
          </div>
          <div className="mt-auto text-center">
            <div className="mb-4 flex justify-around max-w-[200px]">
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
            <div className="flex justify-between cursor-pointer">
              <div className="w-[100px] flex justify-around">
                <div>
                  {heartClicked ? 
                    <div>
                      <img className="w-9" src={FilledHeart} alt="Bookmark" onClick={handleHeartClick} />
                    </div> : 
                    <div>
                      <img src={BookMark} alt="Bookmark" onClick={handleRemoveHeartClick} />
                    </div> 
                  }
                </div>
                {
                  mapURL ? (
                    <Link to={`/location/${location}`}>
                      <img className="w-9" src={EnabledMap} alt="Map"/>
                    </Link>
                  ) : (
                    <div>
                      <img className="w-9" src={DisabledMap} alt="Map"/>
                    </div>
                  )
                }
              </div>
              <Button className="text-1xl p-2 px-3" variant="primary" size="large" onClick={handleReadMoreClick}>
                Read More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
