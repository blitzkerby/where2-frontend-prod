import FavoriteCard from "./FavoriteCard";
const FavoriteList = ({ favorites, category }) => {
    let renderFavorite;
    if (category === "job") {
        console.log("Favorite before map", favorites)
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
                route={`/job-detail/${job.id}`}
            />
        ));
            
    } else if (category === "university") {
        console.log("Favorite before map university", favorites)
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
                route={'university'}
            // deadLine={university.deadLine}
            // timeOut={university.salary}
            />
        ));
        //  dispatch(setIsLoading());
    } else if (category === "loan") {
        // console.log("Favorite before map university",favorites)
        favorites = favorites.map(fav => fav.loan)
        // console.log('new favorite university', favorites);
        // console.log('new isLoading university',isLoading);
        renderFavorite = favorites.map((loan) => (
            <FavoriteCard
                key={loan.loan_id}
                id={loan.loan_id}
                // image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB6qQYTiaG58zHg3LwPcbPaqOrkFmAschW8A&s'}
                // imageAlt={loan.image_alt}
                title={loan.bank_name}
                description={loan.loan_type}
                // facebookLink={loan.updatedAt}
                // instagramLink={loan.updatedAt}
                // twitterLink={loan.createdAt}
                // youtubeLink={loan.createdAt}
                // websiteLink={loan.createdAt}
                location={loan.address}
                deadLine={loan.deadline}
                // timeOut={loan.salary}
                // type={"loan"}
                route={`/loan-detail`}
            // isHeartClicked={isClicked[loan.loan_id]}
            />
        ))
    } else if (category === "scholarship") {
        // console.log("Favorite before map university",favorites)
        favorites = favorites.map(fav => fav.scholarship)
        // console.log('new favorite university', favorites);
        // console.log('new isLoading university',isLoading);
        renderFavorite = favorites.map((scholarship) => (
            <FavoriteCard
            key={scholarship.id}
            // image={scholarship.image_url}
            // imageAlt={scholarship.image_alt}
            title={scholarship.name}
            description={scholarship.description}
            location={scholarship.location}
            deadLine={scholarship.deadLine}
            id={scholarship.id}
            type={'scholarship'}
            route={`/scholarship/${ scholarship.id }`}
            // isHeartClicked={isClicked[scholarship.id]}
            />
        ))
    } else {
        favorites = favorites.map(fav => fav.accomodation)
        // console.log('new favorite university', favorites);
        // console.log('new isLoading university',isLoading);
        renderFavorite = favorites.map((accomodation) => (
            <FavoriteCard
            key={accomodation.id}
            // image={accomodation.image_url}
            // imageAlt={accomodation.image_alt}
            title={accomodation.name}
            description={accomodation.description}
            location={accomodation.location}
            deadLine={accomodation.deadLine}
            id={accomodation.id}
            type={'accomodation'}
            route={`/accomodation/${ accomodation.id }`}
            // isHeartClicked={isClicked[scholarship.id]}
            />
        ))
    }
    ;
  
    return (
        <>
            {renderFavorite}
        </>
      
    )
};
export default FavoriteList;
