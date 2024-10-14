import FavoriteCard from "./FavoriteCard";
const FavoriteList = ({ favorites, category }) => {
    let renderFavorite;
    if (category === "job") {
        console.log("Favorite before map",favorites)
        favorites = favorites.map(fav => fav.job)
        // console.log('new favorite job', favorites);
        // console.log('new isLoading job',isLoading);
        renderFavorite = favorites.map((job) => (
            <FavoriteCard
                key={job.id}
                // title={job.title}
                description={job.job_desc}
                //   facebookLink={job.facebookLink}
                //   instagramLink={job.instagramLink}
                //   twitterLink={job.twitterLink}
                //   youtubeLink={job.youtubeLink}
                //   websiteLink={job.websiteLink}
                location={job.location}
                deadLine={job.deadLine}
                timeOut={job.salary}
            />
        ));
        // dispatch(setIsLoading());
            
    } else if (category === "university") {
        console.log("Favorite before map university",favorites)
        favorites = favorites.map(fav => fav.university)
        // console.log('new favorite university', favorites);
        // console.log('new isLoading university',isLoading);
        renderFavorite = favorites.map((university) => (
            <FavoriteCard
                key={university.id}
                title={university.name}
                description={university.description}
                facebookLink={university.facebook_url}
                instagramLink={university.instagram_url}
                //   twitterLink={university.twitterLink}
                //   youtubeLink={university.youtubeLink}
                websiteLink={university.website_url}
                location={university.location}
            // deadLine={university.deadLine}
            // timeOut={university.salary}
            />
        ));
        //  dispatch(setIsLoading());
    };
  
    return (
        <>
            {renderFavorite}
        </>
      
    )
};
export default FavoriteList;
