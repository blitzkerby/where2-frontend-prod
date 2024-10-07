import Card from "./reusable/Card";

const UniversityList = ({ universities }) => {
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
                />
            ))}
        </>

    )
}

export default UniversityList;