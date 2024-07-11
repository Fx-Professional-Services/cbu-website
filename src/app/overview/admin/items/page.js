"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllItems } from '../../../../../redux/items/actions';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function AdminsItemsPage() {
	const dispatch = useDispatch();
	const { items, loading } = useSelector((state) => state.itemsReducer);

	const [itemCart, setItemCart] = useState([])

	useEffect(() => {
		
		dispatch(fetchAllItems());
	
    }, []);

    console.log(items)
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
                                                    Items
                                                </th>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-lg font-semibold text-gray-900 sm:pl-0 text-center">
                                                    Configuration
                                                </th>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-lg font-semibold text-gray-900 sm:pl-0">
                                                    Sales Item
                                                </th>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-lg font-semibold text-gray-900 sm:pl-0">
                                                    Product
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-center text-lg font-semibold text-gray-900">
                                                    Actions
                                                </th>
                                               
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
											{
												!loading ?
												items?.map((item) => {
													return(
														<tr key={item["__id"]} className='hover:bg-slate-50'>
															<td className='p-4 w-[25%] font-semibold'>
															{item?.name}
															</td>
                                                            <td className='p-4 font-semibold text-center'>
                                                                {item["is configuration"] ? <CheckCircleIcon className='w-7 h-7 text-green-400 mx-auto'/> : ""}
															</td>
                                                            <td className='p-4  font-semibold'>
                                                                {item["is sales item"] ? <CheckCircleIcon className='w-7 h-7 text-green-400 mx-auto'/> : ""}
															</td>
                                                            <td className='p-4  font-semibold'>
                                                                {item["is product"] ? <CheckCircleIcon className='w-7 h-7 text-green-400 mx-auto'/> : ""}
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
													<td colSpan={5} className='py-6'>
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