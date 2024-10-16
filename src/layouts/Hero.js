import React from "react";
import useAuth from "./../hooks/useAuth";
import WrapperComponent from "./../components/reusable/WrapperComponent";

const Hero = ({ props, children }) => {
  const {
    title,
    subtitle,
    searchPlaceholder,
    backgroundGradient,
    titleColor,
    subtitleColor,
    mainImageSrc,
    mainImageAlt,
    onSearch,
  } = { ...props };

  const { username, entity } = useAuth(); // Use the custom hook to get the user

  const styles = {
    /* containers */
    section: "relative w-full lg:h-[90vh] sm:h-[500px] z-[0] gap-10 mb-[16px]",
    container: "w-full h-full bg-white text-center flex justify-center",

    gradientOverlay: "inset-0 bg-gradient-to-b opacity-50",
    gradientClipPath: { clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)" },

    /* textbox */
    title: "text-4xl md:text-5xl lg:text-6xl tracking-tight font-black mb-2",
    subtitle: "text-xl md:text-2xl lg:text-3xl tracking-tight mb-4",
    welcome: "text-2xl md:text-3xl lg:text-4xl font-bold mb-4",
    contentWrapper:
      "absolute w-full z-10 mx-auto top-[7%] mt-section-top-margin max-w-[660px]",

    /* background image */
    imageContainer: `flex justify-center w-full h-full`,
    image:
      "object-contain min-w-full min-h-full sm:object-cover transition-transform duration-500 ease-in-out transform hover:scale-110",

    /* components */
    form: "relative mx-[20px]",
    input:
      "w-full py-3 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-80",
    searchButton: "absolute right-3 top-1/2 transform -translate-y-1/2",
    searchIcon: "h-5 w-5 text-gray-400 z-[0]",
  };

  return (
    <WrapperComponent>
    <section className={`${styles.section} ${backgroundGradient}`}>
      <div className={styles.container}>
        <div
          className={`${styles.gradientOverlay} `}
          style={styles.gradientClipPath}
        />
        <div className={styles.contentWrapper}>
          <h1 className={`${styles.title} ${titleColor}`}>{title}</h1>
          <p className={`${styles.subtitle} ${subtitleColor}`}>{subtitle}</p>
          {children}
        </div>
        <div className={styles.imageContainer}>
          <img src={mainImageSrc} alt={mainImageAlt} className={styles.image} />
        </div>
      </div>
    </section>
    </WrapperComponent>

  );
};

export default Hero;
