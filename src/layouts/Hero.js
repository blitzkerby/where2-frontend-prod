import React from 'react';
import { Search } from 'lucide-react';

const Hero = ({ props , children }) => {
    
    const {
        title,
        subtitle,
        searchPlaceholder,
        backgroundGradient,
        titleColor,
        subtitleColor,
        mainImageSrc,
        mainImageAlt,
        onSearch } = {...props};

    const styles = {
        section: "relative w-full sm:h-[517px] lg:h-[859px] z-[0] gap-5",
        container: "relative w-full h-full bg-white text-center",
        gradientOverlay: "inset-0 bg-gradient-to-b opacity-50",
        gradientClipPath: { clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)' },
        contentWrapper: "absolute sm:w-full z-10 mx-auto lg:left-[calc(50%-263px)] top-[7%]",
        title: "text-h1 font-bold mb-2",
        subtitle: "text-xl mb-8",
        form: "relative mx-[20px]",
        input: "w-full py-3 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-80",
        searchButton: "absolute right-3 top-1/2 transform -translate-y-1/2",
        searchIcon: "h-5 w-5 text-gray-400 z-[0]",
        imageContainer: "mt-12 flex justify-center items-end w-full h-full",
        image: "object-contain sm:object-cover w-full h-full"
    };

    return (
        <section className={`${styles.section} ${backgroundGradient}`}>
            <div className={styles.container}>
                <div 
                    className={`${styles.gradientOverlay} `} 
                    style={styles.gradientClipPath}
                />
                <div className={styles.contentWrapper}>
                    <h1 className={`${styles.title} ${titleColor}`}>{title}</h1>
                    <p className={`${styles.subtitle} ${subtitleColor}`}>{subtitle}</p>
                    { children }
                </div>
                <div className={styles.imageContainer}>
                    <img 
                        src={mainImageSrc} 
                        alt={mainImageAlt} 
                        className={styles.image} 
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
