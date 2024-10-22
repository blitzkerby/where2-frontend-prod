const NoResults = () => {
    return (
        <div 
            className="flex flex-col items-center"
            style={{ 
                width: '100%',
                marginTop: '6.9rem'
            }}
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
