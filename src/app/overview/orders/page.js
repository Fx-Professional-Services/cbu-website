"use client";

import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, searchOrders } from '../../../../redux/orders/actions';
import { useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function OrdersPage() {
    const { orders, loading } = useSelector((state) => state.ordersReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            searchOrders(event.target.value);
        }
    }
    return (
        <>
            <div className="container xl:w-full">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">

                    </div>
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-base font-semibold leading-6 text-gray-900">Orders</h1>
                                <p className="mt-2 text-sm text-gray-700">
                                    A list of all the orders in your account including their id, total price, transaction date, etc.
                                </p>
                            </div>
                            {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                <button
                                    type="button"
                                    className="block rounded-md bg-yellow-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                                >
                                    Add Order
                                </button>
                            </div> */}
                             <div className="relative mt-2 rounded-md shadow-sm ms-4">
                                <input
                                    type="text"
                                    name="search"
                                    id="account-number"
                                    className="w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                                    placeholder="Search orders"
                                    onKeyDown={handleSearch}
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                    Order ID
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Transaction Date
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Total
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {
                                                !loading ? 
                                                <>
                                                    {orders.map((order) => {
                                                        const itemID = uuidv4();
                                                        return (
                                                            <tr key={itemID}>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                                {order.order_id}
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.created}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.total}</td>
                                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                                <a href={`/overview/orders/${order.order_id}`} className="text-yellow-600 hover:text-yellow-900">
                                                                    Edit<span className="sr-only">, {order.order_id}</span>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                        )
                                                    })}
                                                </>
                                                :
                                                <>
                                                    <tr>
                                                        <td colSpan={4} className="text-center whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                           Loading ...
                                                        </td>
                                                    </tr>
                                                </>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}