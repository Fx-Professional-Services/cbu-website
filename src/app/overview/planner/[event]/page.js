export default function EventPage({ params }) {
    return (
        <>
            {/* <h2 className="text-lg font-semibold leading-6 text-gray-900 my-4">Event Details</h2>
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                
                <p className="text-base font-normal leading-6 text-gray-900">Event ID: { params.event_id }</p>
                <p className="text-base font-normal leading-6 text-gray-900">Status: { params.status }</p>
                <p className="text-base font-normal leading-6 text-gray-900">Client: { params.client }</p>
                <p className="text-base font-normal leading-6 text-gray-900">Date: { params.date }</p>
                <p className="text-base font-normal leading-6 text-gray-900">Cost: { params.cost }</p>
            </div> */}
            <div className="container xl:w-full">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-semibold leading-6 text-gray-900 my-4">Event: {params.event_name}</h3>
                    </div>
                </div>
            </div>
        </>
    );
}