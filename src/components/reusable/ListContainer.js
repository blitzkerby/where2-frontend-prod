const ListContainer = ({children}) => {
    return (
        <div className="min-h-screen mx-auto grid 
        max-w-[1200px] lg:mt-[248px]
        sm:w-[100%] sm:px-[35px] sm:mt-[6.9rem]
        gap-[30px] 
        "
        >
            {children}
        </div>
    );
};
export default ListContainer;
