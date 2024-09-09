import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Card from "./components/reusable/Card";
import SearchBar from "./components/reusable/SearchBar";

const company =
  [
    {
      index: 1,
      image: 'data:image/png;base64,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',
      imageAlt: "Company Logo",
      title: "pine apple",
      description: "Lorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipi",
      facebookLink: "https://www.facebook.com/pineapplecompany/",
      instagramLink: "https://www.instagram.com/pineapplecompany/",
      twitterLink: "https://www.twitter.com/pineapplecompany/",
      youtubeLink: "https://www.youtube.com/channel/pineapplecompany/",
      websiteLink: "https://pineapplecompany.com/",
      location: "Phnom Penh, Cambodia",
      deadLine: "10/10/2022",
      timeOut: "10:00 AM"
    },
    {
      image: 'https://m.media-amazon.com/images/I/514q4uEjRaL._UF350,350_QL80_.jpg',
      title: "University of Autism",
      description: "Lorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipisit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipiLorem ipsum dolor sit amet, consectetur adipi",
      instagramLink: "https://www.instagram.com/pineapplecompany/",
      youtubeLink: "https://www.youtube.com/channel/pineapplecompany/",
      websiteLink: "https://pineapplecompany.com/",
      location: "Phnom Penh, Cambodia",
      deadLine: "10/10/2022",
      timeOut: "10:00 AM"
    },
  ];
  
  
function App() {
  return (
    <Card
    key={company[0].index}
    image={company[0].image}
    imageAlt={company[0].imageAlt}
    title={company[0].title}
    description={company[0].description}
    facebookLink={company[0].facebookLink}
    instagramLink={company[0].instagramLink}
    twitterLink={company[0].twitterLink}
    youtubeLink={company[0].youtubeLink}
    websiteLink={company[0].websiteLink}
    location={company[0].location}
    deadLine={company[0].deadLine}
    timeOut={company[0].timeOut}
  />
  );
}

export default App;
