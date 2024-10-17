const ListContainer = ({children}) => {
    return (
        <div className="max-w-full flex justify-center min-h-screen mx-auto grid
        lg:w-[886px]
        sm:w-[100%] sm:px-[35px]
        gap-[30px] mt-[248px]">
            {children}
        </div>
    );
};
export default ListContainer;
