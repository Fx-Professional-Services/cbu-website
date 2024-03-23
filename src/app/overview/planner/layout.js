import EventCard from '../../components/event_details_card';

export default function PlannerLayout({ children }) {
    return (
        <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <main className="lg:pl-72">
                    <div className="xl:pl-96">
                        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                            
                        </div>
                    </div>
                </main>
                <aside className="fixed inset-y-0 left-72 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
                    {/* Secondary column (hidden on smaller screens) */}
                    <EventCard />
                </aside>
                <div className='md:hidden sm:block'>
                    <div className="relative w-full flex gap-6 snap-x overflow-x-auto pb-14">
                        {/* <div className="snap-center w-20 inline-block">Content 1</div>
                        <div className="snap-center w-48 inline-block">Content 2</div>
                        <div className="snap-center w-48 inline-block">Content 3</div>
                        <div className="snap-center w-48 inline-block">Content 4</div>
                        <div className="snap-center w-48 inline-block">Content 5</div> */}
                        <div className='shrink-0 snap-center w-full inline-block'>
                            <EventCard />
                        </div>
                        <div className='shrink-0 snap-center w-full inline-block'>
                            <EventCard />
                        </div>
                        <div className='shrink-0 snap-center w-full inline-block'>
                            <EventCard />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}