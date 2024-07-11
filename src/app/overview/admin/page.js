"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalesItems } from '../../../../redux/sales_items/actions';
import { MinusCircleIcon } from '@heroicons/react/24/outline';

export default function AdminsPage() {
	const dispatch = useDispatch();
	const { salesItems, loading } = useSelector((state) => state.salesItemsReducer);

	const [itemCart, setItemCart] = useState([])

	useEffect(() => {
		
		dispatch(fetchSalesItems());
	
    }, []);

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
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                    Sales Item
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    
                                                </th>
                                               
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
											{
												!loading ?
												salesItems?.map((item) => {
													return(
														<tr key={item["__id"]} className='hover:text-yellow-500 hover:bg-slate-50'>
															<td className='p-4  font-semibold'>
															{item?.name}
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