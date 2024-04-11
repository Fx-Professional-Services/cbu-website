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
                        <span className="text-sm font-semibold leading-6 text-gray-900 my-10">Event / Order ID: </span>
                        <span className="text-lg cbu-accent-text font-semibold"> {params.event}</span>
                        <hr />
                        <div className="grid grid-cols-2 gap-1">
                            <div className="p-5">
                                <span className="text-sm font-semibold cbu-accent-text">Client Name: </span> <br />
                                <span className="text-lg font-semibold">Rick Keyser III</span>
                            </div>
                            <div className="p-5">
                                <span className="text-sm font-semibold cbu-accent-text">Received Date: </span> <br />
                                <span className="text-lg font-semibold">January 01, 2024</span>
                            </div>
                            <div className="p-5">
                                <span className="text-sm font-semibold cbu-accent-text">Location: </span> <br />
                                <span className="text-lg font-semibold">{ params.location ?? "No data available" }</span>
                            </div>
                            <div className="p-5">
                                <span className="text-sm font-semibold cbu-accent-text">Time: </span> <br />
                                <span className="text-lg font-semibold">{params.location ?? "No data available"}</span>
                            </div>
                            <div className="p-5">
                                <span className="text-sm font-semibold cbu-accent-text">Location: </span> <br />
                                <span className="text-lg font-semibold">{params.location ?? "No data available"}</span>
                            </div>
                            <div className="p-5">
                                <span className="text-sm font-semibold cbu-accent-text">Number of Guests: </span> <br />
                                <span className="text-lg font-semibold">{params.location ?? "No data available"}</span>
                            </div>
                            <div className="p-5">
                                <span className="text-sm font-semibold cbu-accent-text">Start Date / End Date: </span> <br />
                                <span className="text-lg font-semibold">{params.location ?? "No data available"}</span>
                            </div>
                            <div className="p-5">
                                <span className="text-sm font-semibold cbu-accent-text">Contract Price: </span> <br />
                                <span className="text-lg font-semibold">{params.event_cost ?? "No data available"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}