"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSalesOrders } from '../../../../../redux/sales_orders/actions';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function AdminsSalesOrderPage() {
	const dispatch = useDispatch();
	const { salesOrders, loading } = useSelector((state) => state.salesOrdersReducer);

	useEffect(() => {
		
		dispatch(fetchAllSalesOrders());
	
    }, []);

    // console.log(salesOrders)
    return (
        <>
            <div className="container xl:w-full">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">

                    </div>
                    <div className="px-4 sm:px-6 lg:px-8">
                       
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-gray-900 sm:pl-0">
                                                    Sales Order
                                                </th>
                                               
                                                <th scope="col" className="px-3 py-3.5 text-center text-lg font-semibold text-gray-900">
                                                    Actions
                                                </th>
                                               
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
											{
												!loading ?
												salesOrders?.map((order) => {
													return(
														<tr key={order["__id"]} className='hover:bg-slate-50'>
															<td className='p-4 font-semibold'>
															{order["__id"]}
															</td>
                                                          
                                                            <td className='p-4 flex space-x-3 font-semibold mx-auto text-center justify-center'>
                                                                <button className='px-4 rounded-lg border '>
                                                                    Edit
                                                                </button>
                                                                <button className='px-4 rounded-lg border '>
                                                                    Archive
                                                                </button>
															</td>
															
														</tr>
                                                        
													)
												})
												: <tr className='text-center font-bold'>
													<td colSpan={2} className='py-6'>
														Loading...
													</td>
												</tr>
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