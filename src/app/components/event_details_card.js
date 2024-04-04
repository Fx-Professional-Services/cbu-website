"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarDaysIcon, CreditCardIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { useState } from 'react';

export default function EventCard({ data }) {
    // Set the status color based on the status
    let status_color = 'bg-green-50 text-green-700 ring-green-600/20';
    if (data["Item::type"] == 'product') {
        status_color = 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
    }
    else if (data["Item::type"] == 'configurator') {
        status_color = 'bg-blue-50 text-blue-700 ring-blue-600/20';
    }
    else {
        status_color = 'bg-indigo-50 text-indigo-700 ring-indigo-600/20';
    }

    const pathname = usePathname();
    const isDispayed = pathname.includes(`/overview/planner/${data.event_id}`);
    console.log(data)
    if (data) {
        return (
            <div className={`lg:col-start-3 lg:row-end-1 sm:col-start-5 my-4`}>
                <h2 className="sr-only">Summary</h2>
                <div className={`rounded-lg bg-gray-50 shadow-sm ring-1 ${isDispayed ? 'ring-yellow-500/25' : 'ring-gray-900/5'}`}>
                    <dl className="flex flex-wrap">
                        <div className="flex-auto pl-6 pt-6">
                            <dt className="text-sm font-semibold leading-6 text-gray-900">Event / Order</dt>
                            <dd className={`mt-1 text-base font-semibold leading-6 text-gray-900 ${isDispayed ? 'text-yellow-600' : ''}`}>Order ID: {data["record id"]}</dd>
                        </div>
                        <div className="flex-none self-end px-6 pt-4">
                            <dt className="sr-only">Type</dt>
                            <dd className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 bg-green-50 ${status_color}`} style={{ textTransform: 'capitalize' }}>
                                {data["Item::type"]}
                            </dd>
                        </div>
                        <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                            <dt className="flex-none">
                                <span className="sr-only">Client</span>
                                <UserCircleIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                            </dt>
                            <dd className="text-sm font-medium leading-6 text-gray-900">{data["sales order__PARTY::display name"]}</dd>
                        </div>
                        <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                            <dt className="flex-none">
                                <span className="sr-only">Event date</span>
                                <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                            </dt>
                            <dd className="text-sm leading-6 text-gray-500">
                                <time dateTime="2023-01-31">{formatDate(data["received date"])}</time>
                            </dd>
                        </div>
                        <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                            <dt className="flex-none">
                                <span className="sr-only">Status</span>
                                <CurrencyDollarIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                            </dt>
                            <dd className="text-sm leading-6 text-gray-500">${data.total} </dd>
                        </div>
                    </dl>
                    <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                        {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:shadow-yellow-300">
                        View details <span aria-hidden="true">&rarr;</span> 
                    </a> */}
                        <Link href={`/overview/planner/${data["record id"]}`} className={`hover:text-yellow-600 ${isDispayed ? 'text-yellow-600' : ''}`}>View Details <span aria-hidden="true">&rarr;</span></Link>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="flex items-center justify-center h-96">
                <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                </svg>
                Processing...
            </div>
        );
    }
}

function formatDate(dateParam) {
    const dateStr = dateParam;
    const date = new Date(dateStr);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
}
