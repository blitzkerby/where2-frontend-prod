import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Map from '../../assets/svg/map.svg';
import MiniMap from '../../assets/svg/miniMap.svg';
import BookMark from '../../assets/svg/bookmark.svg';
import Calender from '../../assets/svg/calender.svg';
import MiniClock from '../../assets/svg/miniClock.svg';
import { Facebook, Instagram, Twitter, Youtube, Chrome } from 'lucide-react';
import Button from './ButtonComponent';
import { addFavorite } from '../../features/slices/favoriteSlice';
import { useDispatch } from 'react-redux'; 

const user = JSON.parse(localStorage.getItem('authData'));

const Card = ({
  image = '',
  imageAlt = '',
  title = '',
  description = '',
  socialLinks: { facebookLink = '', instagramLink = '', twitterLink = '', youtubeLink = '', websiteLink = '' } = {},
  position,
  salary,
  currency,
  term,
  loan_size,
  interest,
  location = '', 
  deadLine = '', 
  timeOut = '',
  route,
  type
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleReadMoreClick = () => {
    navigate(route);
  };
  
  const handleHeartClick = async () => {
      await removeFavorite(id, type);
      dispatch(setIsClicked({ id: id }))
  
    };
    
  const handleRemoveHeartClick = async () => {
    if (!user) {
      alert("Please Log in or Sing up to add your COLLECTION!");
      navigate('/login');
    } else {
      await addFavorite(id, type);
      dispatch(setIsClicked({ id: id }))
    }
  };

  const handleError = (event) => {
    event.target.src = "https://i.pinimg.com/564x/1b/b6/95/1bb69534ae81c183c82154062df5d94f.jpg";
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
    <div className="sm:max-w-[600px] sm:w-[100%] sm:flex-col relative clip-border-box rounded-xl border flex md:flex-row shadow-md lg:h-[348px] lg:w-[886px]">
      <div className="bg-cover bg-center lg:w-[398px] sm:w-[100%] sm:max-h-[348px] rounded-xl flex-shrink-0">
        {image && (
          <img className="top-0 left-0 w-full h-full object-cover -z-10" src={image} alt={imageAlt} onError={handleError} />
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
                Currency :<span> {currency}</span>
              </p>
              <p>
                Term:<span> {term}</span>
              </p>
              <p>
                Loan Size:<span> {loan_size}</span>
              </p>
              <p>
                Interest Rate:<span> {interest}</span>
              </p>
            </div> : null}
        </div>
        <div className="flex flex-col lg:h-[78%] sm:h-[200px]">
          <div className="flex-1 text-clip overflow-hidden">
            <p className="text-justify">{description}</p>
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
                  {/* {isHeartClicked ? 
                    <div>
                      <img className="w-9" src={FilledHeart} alt="Bookmark" onClick={handleHeartClick} />
                    </div> : 
                    <div>
                      <img src={BookMark} alt="Bookmark" onClick={handleRemoveHeartClick} />
                    </div> 
                  } */}
                </div>
                <Link to="">
                  <img src={Map} alt="Map" />
                </Link>
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
