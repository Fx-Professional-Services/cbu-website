"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarDaysIcon, CreditCardIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'

export default function EventCard({ data }) {
    // Set the status color based on the status
    let status_color = 'bg-green-50 text-green-700 ring-green-600/20';
    if (data.status === 'Pending') {
        status_color = 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
    }
    else if (data.status === 'Cancelled') {
        status_color = 'bg-red-50 text-red-700 ring-red-600/20';
    }
    else if (data.status === 'Refunded') {
        status_color = 'bg-blue-50 text-blue-700 ring-blue-600/20';
    }
    else {
        status_color = 'bg-red-50 text-red-700 ring-red-600/20';
    }

    const pathname = usePathname();
    const isDispayed = pathname.includes(`/overview/planner/${data.event_id}`);

    return (
        <div className={`lg:col-start-3 lg:row-end-1 sm:col-start-5 my-4`}>
            <h2 className="sr-only">Summary</h2>
            <div className={`rounded-lg bg-gray-50 shadow-sm ring-1 ${isDispayed ? 'ring-yellow-500/25' : 'ring-gray-900/5'}`}>
                <dl className="flex flex-wrap">
                    <div className="flex-auto pl-6 pt-6">
                        <dt className="text-sm font-semibold leading-6 text-gray-900">Event</dt>
                        <dd className={`mt-1 text-base font-semibold leading-6 text-gray-900 ${isDispayed ? 'text-yellow-600' : ''}`}>{data.event_name}</dd>
                    </div>
                    <div className="flex-none self-end px-6 pt-4">
                        <dt className="sr-only">Status</dt>
                        {/* <dd className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 bg-green-50 ${status_color}`}>
                            { data.status }
                        </dd> */}
                    </div>
                    <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                        <dt className="flex-none">
                            <span className="sr-only">Client</span>
                            <UserCircleIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                        </dt>
                        <dd className="text-sm font-medium leading-6 text-gray-900">{data.client}</dd>
                    </div>
                    <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                        <dt className="flex-none">
                            <span className="sr-only">Event date</span>
                            <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                        </dt>
                        <dd className="text-sm leading-6 text-gray-500">
                            <time dateTime="2023-01-31">January 31, 2023</time>
                        </dd>
                    </div>
                    <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                        <dt className="flex-none">
                            <span className="sr-only">Status</span>
                            <CurrencyDollarIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                        </dt>
                        <dd className="text-sm leading-6 text-gray-500">$10,480</dd>
                    </div>
                </dl>
                <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                    {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:shadow-yellow-300">
                        View details <span aria-hidden="true">&rarr;</span>
                    </a> */}
                    <Link href={`/overview/planner/${data.event_id}`} className={`hover:text-yellow-600 ${isDispayed ? 'text-yellow-600' : ''}`}>View Details <span aria-hidden="true">&rarr;</span></Link>
                </div>
            </div>
        </div>
    )
}
