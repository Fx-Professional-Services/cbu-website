'use client'

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import { fetchConfigurationOptions } from '../../../../redux/configurations/actions';
import { createSalesOrderItem } from '../../../../redux/create_sales_order_item/actions';
import { fetchSalesItems } from '../../../../redux/sales_items/actions';
import { fetchSalesOrder } from '../../../../redux/sales_order/actions';
import { fetchSubConfigurationOptions } from '../../../../redux/subConfigurations/actions';
import ConfirmationModal from '../common/Modal/ConfirmationModal';


export default function ItemsModal({openItems, setOpenItems, params, setIsReload, isReload}) {
	
	const dispatch = useDispatch();
	const { salesItems, loading } = useSelector((state) => state.salesItemsReducer);
	const { salesOrder, loading: orderLoading } = useSelector((state) => state.singleSalesOrderReducer);
	const { newSalesOrder, loading: newItemLoading } = useSelector((state) => state.createSalesOrderItemReducer)
	const [disable, setDisable] = useState(false)
	
	useEffect(() => {
		if(openItems) {
			dispatch(fetchSalesItems());
			dispatch(fetchSalesOrder(params));
		}
    }, [openItems]);

	const transformData = (orderItem) => {

		const partyId = salesOrder["_party id"];
		const orderId = salesOrder["__id"];
		const creator = salesOrder["creator"];
		const customerTierId = salesOrder["_customer tier id"];

		return {
			itemId: orderItem["__id"],
			creator: creator,
			orderId: orderId,
			price: null,
			quantity: 1,
			customerTierId: customerTierId,
			partyId: partyId,
			parentOrderItemId: null,
			configurationOptionItemId: null
		};
		
	}

	const handleUpdateSalesOrder = (salesItem) => {
		setDisable(true)	
		
		const newSalesOrderItem = transformData(salesItem)
		dispatch(createSalesOrderItem(newSalesOrderItem));

		if(!newItemLoading){
			return new Promise(resolve => {
				setTimeout(resolve, 2000);
			  }).then(() => {
				setDisable(false)
			  });

		}


	}
		return (
		<>
			
			<Transition.Root onClick={() => setOpenItems(true)} show={openItems} as={Fragment}>
				<Dialog onClose={setOpenItems} className="relative z-10">
					<Dialog.Backdrop
						transition
						className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out"
					/>
					<Transition.Child
						as={Fragment}
						enter="ease-in-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in-out duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full w-auto sm:mt-0 mt-20 pl-10">
								<Transition.Child
									as={Fragment}
									enter="transform transition ease-in-out duration-500 sm:duration-700"
									enterFrom="translate-x-full"
									enterTo="translate-x-0"
									leave="transform transition ease-in-out duration-500 sm:duration-700"
									leaveFrom="translate-x-0"
									leaveTo="translate-x-full"
								>
									<Dialog.Panel className="pointer-events-auto relative w-screen max-w-3xl">
										<Transition.Child
											as={Fragment}
											enter="ease-in-out duration-500"
											enterFrom="opacity-0"
											enterTo="opacity-100"
											leave="ease-in-out duration-500"
											leaveFrom="opacity-100"
											leaveTo="opacity-0"
										>
											<div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
											<button
												type="button"
												className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
												onClick={() => {
													setOpenItems(false)
													if(!isReload) {
														setIsReload(true)
													} else {
														setIsReload(false)
													}
												}}
											>
												<span className="absolute -inset-2.5" />
												<span className="sr-only">Close panel</span>
												<XMarkIcon className="h-6 w-6" aria-hidden="true" />
											</button>
											</div>
										</Transition.Child>
										<div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl rounded-lg">

											<div className="px-4 sm:px-6">
												<Dialog.Title className="text-lg font-semibold leading-6 text-gray-900">Select Sales Item</Dialog.Title>
											</div>
											{
												disable ?
													<div className={`flex h-full flex-col py-6 px-6 rounded-xl mx-auto bg-green-200 text-black font-bold`}>
															You added new sales order item!
													</div>
												:
													<div className={`flex h-full flex-col py-9 px-6 bg-white text-black font-bold`}>
															
													</div>

											}
										
											<div className="relative mt-12 flex-1 px-4 sm:px-6">
												{
													!loading ?
													salesItems?.map((item) => {
														return(
															<>
																<div 
																	className="flex border py-4 pl-4 hover:bg-slate-100 rounded-lg my-2 justify-between pr-6 cursor-pointer hover:text-yellow-600 hover:font-semibold"
																	onClick={() => {
																		handleUpdateSalesOrder(item)
																	}}
																>
																	<span className=''>
																		{item?.name}
																	</span>

																	<span className=''>
																		Add
																	</span>
																</div>
															</>
														)
													})

													:  

													<div className="text-center text-lg mt-80 py-4 pl-4 hover:bg-slate-100">
														<span className='cursor-pointer '>
															Loading...
														</span>

													</div>

												}
											</div>
											
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>


		</>
		)
}
