import FavoriteCard from "./FavoriteCard";
import Card from "./Card";
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
                title={job.company_name}
                position={job.position}
                salary={job.salary}
                description={job.job_desc}
                // facebookLink={job.updatedAt}
                // instagramLink={job.updatedAt}
                // twitterLink={job.createdAt}
                // youtubeLink={job.createdAt}
                // websiteLink={job.createdAt}
                location={job.location}
                deadLine={job.deadline}
                timeOut={job.work_hour}
                type={"job"}
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
                title={loan.bank_name}
                description={loan.loan_type}
                interest={loan.interest_rate}
                loan_size={loan.loan_limit}
                currency={"KHR and USD"}
                term={loan.loan_term}
                // facebookLink={loan.updatedAt}
                // instagramLink={loan.updatedAt}
                // twitterLink={loan.createdAt}
                // youtubeLink={loan.createdAt}
                // websiteLink={loan.createdAt}
                location={loan.address}
                deadLine={loan.deadline}
                // timeOut={loan.salary}
                type={"loan"}
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
        favorites = favorites.map(fav => fav.accommodation)
        // console.log('new favorite university', favorites);
        // console.log('new isLoading university',isLoading);
        renderFavorite = favorites.map((accommodation) => (
            <FavoriteCard
            key={accommodation.id}
                id={accommodation.id}
                type={"accommodation"}
            // image={'https://th.bing.com/th/id/R.5a8394ded8bc846fa7be1d13d7ff568b?rik=eAfE14B5fVvw4A&pid=ImgRaw&r=0'}
            // imageAlt={"room"}
            title={accommodation.name}
            size={accommodation.size}
            price = {accommodation.price}
            address = {accommodation.location}
            // description={accommodation.accommodation_desc}
            // facebookLink={accommodation.updatedAt}
            // instagramLink={accommodation.updatedAt}
            // twitterLink={accommodation.createdAt}
            // youtubeLink={accommodation.createdAt}
            // websiteLink={accommodation.createdAt}
            // deadLine={accommodation.deadline}
            // timeOut={accommodation.salary}
            route={`/accommodation-detail/${ accommodation.id }`}
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
