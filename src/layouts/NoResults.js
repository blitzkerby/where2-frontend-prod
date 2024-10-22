const NoResults = () => {
    return (
        <div 
            className="flex flex-col items-center mt-10"
            style={{ backgroundColor: 'rgba(139, 237, 242, 0.3)', height: '100vh' }}
        >
            <div className="flex justify-center items-center">
                <img 
                    src="https://i.imgur.com/NyzUIDt.png" 
                    alt="404 Not Found" 
                    className="w-64 h-64 object-cover"
                />
            </div>
            <h1 className="text-center" style={{ fontSize: '1.5rem', marginTop: '10px' }}>No results... (bawk!)</h1>
        </div>
    )
}

export default NoResults;
