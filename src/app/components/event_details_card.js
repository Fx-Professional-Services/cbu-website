import { CalendarDaysIcon, CreditCardIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'

export default function EventCard() {
    return (
        <div className="lg:col-start-3 lg:row-end-1 sm:col-start-5">
            <h2 className="sr-only">Summary</h2>
            <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                <dl className="flex flex-wrap">
                    <div className="flex-auto pl-6 pt-6">
                        <dt className="text-sm font-semibold leading-6 text-gray-900">Event</dt>
                        <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">J&J Wedding</dd>
                    </div>
                    <div className="flex-none self-end px-6 pt-4">
                        <dt className="sr-only">Status</dt>
                        <dd className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            Paid
                        </dd>
                    </div>
                    <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                        <dt className="flex-none">
                            <span className="sr-only">Client</span>
                            <UserCircleIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                        </dt>
                        <dd className="text-sm font-medium leading-6 text-gray-900">Alex Curren</dd>
                    </div>
                    <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                        <dt className="flex-none">
                            <span className="sr-only">Due date</span>
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
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:shadow-yellow-300">
                        View details <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
