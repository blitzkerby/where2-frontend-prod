
const ListContainer = ({children}) => {
    return (
        <div className="max-w-full flex justify-center min-h-screen lg:max-w-[980px] sm:w-[100%] mx-auto gap-[30px] lg:gap-[40px] mt-[248px] lg:mt-[276px] grid sm:px-[35px]">
           {children}
        </div>
    );
};

export default ListContainer;