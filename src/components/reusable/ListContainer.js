
const ListContainer = ({children}) => {
    return (
        <div className="flex flex-col align-middle justify-center gap-6 p-6 mt-[64px] h-max">
           {children}
        </div>
    );
};

export default ListContainer;