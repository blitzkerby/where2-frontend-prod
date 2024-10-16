import Card from "./reusable/Card";

const isDebug = true;  // Set to false to turn off console logging

/**
 * UniversityList component
 *
 * @param {Array} universities - List of universities to display.
 * @returns {JSX.Element} The list of university cards or a "No results found" message.
 */
const UniversityList = ({ universities }) => {

    // Debugging
    if (isDebug) {
        console.log("UniversityList says: ", universities);
    }

    if (universities.length === 0) {
        return <div style={{ textAlign: 'center', color: 'red', fontSize: '24px' }}>No results found :(</div>;
    }

    return (
        <>
            {universities.map((university, index) => (
                <Card
                    key={index}
                    image={university.image_url}
                    imageAlt={university.image_alt}
                    title={university.name}
                    description={university.description}
                    facebookLink={university.facebook_url}
                    instagramLink={university.instagram_url}
                    telegramLink={university.telegram_url}
                    websiteLink={university.website}
                    location={university.location}
                    route={`/detail/university/${ university.id }`}
                    // isHeartClicked = {isClicked[university.id]}
                />
            ))}
        </>
    );
};

export default UniversityList;
