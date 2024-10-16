import Card from "./reusable/Card";

const ScholarshipList = ({ scholarship }) => {

    if (scholarship.length === 0) {
        return <div style={{ textAlign: 'center', color: 'red', fontSize: '24px' }}>No results found :(</div>
    }

    return (
    <>
        {scholarship.map((scholarship, index) => (
            <Card
                key={index}
                image={scholarship.image_url}
                imageAlt={scholarship.image_alt}
                title={scholarship.name}
                description={scholarship.description}
                location={scholarship.location}
                deadLine={scholarship.deadLine}
                id={scholarship.id}
                type={'scholarship'}
                route={`/detail/scholarship/${scholarship.id}`}
                // isHeartClicked={isClicked[scholarship.id]}
            />))
            }
            </>
        
    );
}
export default ScholarshipList;