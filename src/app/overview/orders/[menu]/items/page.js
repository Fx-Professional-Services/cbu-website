"use client";

import { useDispatch, useSelector } from 'react-redux';
import { fetchSalesItems } from '../../../../../../redux/sales_items/actions';
import { useEffect, useState } from 'react';
import { MinusCircleIcon } from '@heroicons/react/24/outline';

export default function ItemsPage({params}) {
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
                       
						<div className="flex justify-evenly">
							<h1 className="text-base font-semibold leading-6 text-gray-900 w-[50%] mt-10">Choose Items for <br/> {params.menu}</h1>
							<div className='border p-6 rounded-lg w-[50%]'>
								<h2 className='text-center'>New Sales Order Items:</h2>
								{
									itemCart?.length != 0 ? 
									<>
										<div>
											<ul className='mt-2'>
											{
												itemCart?.map((prod, index) => {
													return(
														<li key={index} className='py-0.5 font-semibold flex justify-between'>
															<span className='block'>
																{prod.name}
															</span>
															<span className='block'>
																<MinusCircleIcon 
																	className='w-6 h-6 text-red-400'
																	onClick={() => {
																		const newCart = itemCart.filter((item, itemIndex) => itemIndex != index)
																		setItemCart(newCart)
																	}}
																/>
															</span>
														</li>
													)
													
												})
											}
											</ul>
											<div className='mx-auto text-center mt-4'>
												<button className='mx-auto px-8 py-2 rounded-md border bg-yellow-500 text-white font-semibold'>
													Save
												</button>
											</div>
										</div>
									</>
									: <>
									<div className='text-center mt-10 mb-10'>No selected new item</div>
									</>
								}

							</div>

						</div>
                        
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                    Item Name
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
															<td>
															 <button 
															 	className='py-2 px-6 border hover:text-white hover:bg-yellow-500 rounded-md font-semibold text-yellow-500 border-yellow-500 bg-white'
																onClick={() => {
																
																	if(item["is configuration"] == 1) {
																		console.error("Cannot add configurator items yet")
																	} else {
																		setItemCart([...itemCart, item])
																	}
																}}
															>
																Select
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