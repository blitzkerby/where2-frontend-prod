import Profile from "./../reusable/Profile";

const PublicProfile = ({ userData }) => {
    return (
      <div className='w-full h-full mt-[70px]'>
        <Profile userData={userData} isPublic={true} />
      </div>
    );
  };

  export default PublicProfile;