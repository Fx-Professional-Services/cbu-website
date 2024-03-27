import EventCard from '../../components/event_details_card';

export default function PlannerLayout({ children }) {
    return (
        <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <aside className="fixed inset-y-0 left-72 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
                    {/* Secondary column (hidden on smaller screens) */}
                    <h2 className="text-lg font-semibold leading-6 text-gray-900 my-4">Events</h2>

                    <hr />
                    <EventCard data={
                        {
                            'event_name': 'Peter & Mary wedding',
                            'status': 'Pending',
                            'client': 'Peter Milan',
                            'event_date': 'January 31, 2023',
                            'event_cost': '$10,480',
                            'event_id': '1'
                        }
                    } />
                    <EventCard data={
                        {
                            'event_name': 'Rick & Morty wedding',
                            'status': 'Refunded',
                            'client': 'Morty Smith',
                            'event_date': 'January 31, 2023',
                            'event_cost': '$10,480',
                            'event_id': '2'
                        }
                    } />
                </aside>

                {/* For mobile view only */}
                <div className='md:hidden sm:block'>
                    <div className="relative w-full flex gap-6 snap-x overflow-x-auto pb-14">
                        <div className='shrink-0 snap-center w-full inline-block'>
                            <EventCard data = {
                                {
                                    'event_name':'J&H wedding',
                                    'status':'Paid',
                                    'client':'Alex Curren',
                                    'event_date':'January 31, 2023',
                                    'event_cost':'$10,480',
                                    'event_id':'3'
                                }
                            }/>
                        </div>
                    </div>
                </div>
                {/* End of mobile view container */}

                <main className="lg:pl-72">
                    <div>
                        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}