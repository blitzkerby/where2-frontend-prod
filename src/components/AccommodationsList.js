import Card from "./reusable/Card";

function AccommodationsList({accommodations}) {
  const preset = [{
    imageUrl: "https://picsum.photos/200",
    imageAlt: "Picture",
    title: "Title",
    description: "Description",
    facebookLink: "facebook link",
    instagramLink: "instagram link",
    twitterLink: "twitter link",
    youtubeLink: "youtube link",
    websiteLink: "website link",
    location: "location",
    deadLine: "01-01-3000",
    timeOut: "25:61"
  }]
  const rendered = preset.map( (acc) => {
    return <Card 
      image={acc.imageUrl}  
      imageAlt={acc.imageAlt} 
      title={acc.title} 
      description={acc.description}
      facebookLink={acc.facebookLink}
      instagramLink={acc.instagramLink}
      twitterLink={acc.twitterLink}
      youtubeLink={acc.youtubeLink}
      websiteLink={acc.websiteLink}
      location={acc.location}
      deadLine={acc.deadLine}
      timeOut={acc.timeOut}
    />;
  });
  return <div className='flex flex-col justify-center items-center'>{rendered}</div>;
}

export default AccommodationsList;