const SubpageHeroSection = () => {
  return (
    <div className="bg-[#E6F3F9] w-full pt-[64px] min-h-[50vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-[70%] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 py-12">
        <div className="lg:w-1/2 space-y-6 tracking-tighter">
          <h1 className="text-black text-5xl font-bold leading-tight sm:text-center">
            W2COMMUNITY
            <br />
            Dive into Anything
          </h1>

          <p className="text-black/90 text-lg sm:text-xl max-w-lg text-justify tracking-tight">
            W2COMMUNITY is home to thousands of communities, students,
            researchers, endless interactions, and genuine human interactions.
            Whether you are a student, researcher, or an individual, W2COMMUNITY
            has something for you. Feel free to start a disucssion and share
            your thoughts with the world.
          </p>
        </div>

        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(0 -5)">
                <path
                  d="M50 95c19.33 0 35-15.67 35-35S69.33 25 50 25 15 40.67 15 60s15.67 35 35 35z"
                  fill="#FFFFFF"
                />
                <circle cx="50" cy="15" r="5" fill="#FFFFFF" />
                <path
                  d="M50 20c0 0 0 15 0 15"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Eyes */}
                <circle cx="35" cy="55" r="5" fill="#FF4500" />
                <circle cx="65" cy="55" r="5" fill="#FF4500" />
                <path
                  d="M35 70c6 5 24 5 30 0"
                  stroke="#000000"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubpageHeroSection;