"use client";

import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from '../../../../redux/invoices/actions';
import { useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";

export default function InvoicesPage() {
    const { invoices, loading } = useSelector((state) => state.invoicesReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchInvoices());
    }, [dispatch]);

    return (
            <div className="container xl:w-full">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">

                    </div>
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-base font-semibold leading-6 text-gray-900">Invoices</h1>
                                <p className="mt-2 text-sm text-gray-700">
                                    A list of all the invoices in your account including their id, total price, transaction date, etc.
                                </p>
                            </div>
                            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                <button
                                    type="button"
                                    className="block rounded-md bg-yellow-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                                >
                                    Add Invoice
                                </button>
                            </div>
                        </div>
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                    Invoice ID
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Transaction Date
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Total
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Taxes
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-300">
                                            {invoices.map((invoice) => {
                                                const itemID = uuidv4();
                                                return (
                                                    <tr key={itemID}>
                                                        <td className="pl-4 pr-3 py-4 whitespace-nowrap text-sm font-normal text-gray-900 sm:pl-0">
                                                            {invoice.__id}
                                                        </td>
                                                        <td className="px-3 py-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                                            {invoice.transactionDate}
                                                        </td>
                                                        <td className="px-3 py-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                                            {invoice.total}
                                                        </td>
                                                        <td className="px-3 py-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                                            {invoice.taxes}
                                                        </td>
                                                        <td className="pl-3 pr-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <a href="#" className="text-yellow-600 hover:text-yellow-900">Edit</a>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}