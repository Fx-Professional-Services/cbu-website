"use client";

import { ConfirmationDialog } from '@/app/components/Orders/ConfirmationDialog';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import { fetchConfigurationOptions } from '../../../../../../redux/configurations/actions';
import { createSalesOrderItem } from '../../../../../../redux/create_sales_order_item/actions';
import { fetchSalesItems } from '../../../../../../redux/sales_items/actions';
import { fetchSalesOrder } from '../../../../../../redux/sales_order/actions';
import { fetchSubConfigurationOptions } from '../../../../../../redux/subConfigurations/actions';

export default function ItemsPage({params}) {
	const dispatch = useDispatch();
	const { salesItems, loading } = useSelector((state) => state.salesItemsReducer);
	const { salesOrder, loading: orderLoading } = useSelector((state) => state.singleSalesOrderReducer);
	const { newSalesOrder, loading: newItemLoading } = useSelector((state) => state.createSalesOrderItemReducer)
	const { configurations, loading: configurationsLoading } = useSelector((state) => state.configurationsReducer)
	const { subConfigurations, loading: subConfigurationsLoading } = useSelector((state) => state.subConfigurationsReducer)

	//confirmation modal
	const [showConfirmation, setShowConfirmation] = useState(false)

	//selected configurations
	const [selectedParentConfigID, setSelectedParentConfigID] = useState("")
	const [selectedChildConfigID, setSelectedChildConfigID] = useState("")
	const [selectedChildSubConfig, setSelectedChildSubConfig] = useState("")
	const [selectedChildSubConfigOptions, setSelectedChildSubConfigOptions] = useState("")

	//cart
	const [itemCart, setItemCart] = useState([])
	const [selectedCartItemID, setSelectedCartItemID] = useState("")
	const [selectedCartSubItemID, setSelectedCartSubItemID] = useState("")
	// console.log("Hello")

	useEffect(() => {
		dispatch(fetchSalesItems());
		dispatch(fetchSalesOrder(params.menu));
    }, []);

	const transformData = (data) => {
		const partyId = salesOrder["_party id"];
		const orderId = salesOrder["__id"];
		const creator = salesOrder["creator"];
		const customerTierId = salesOrder["_customer tier id"];
		return data.map(orderItem => {
			return {
				itemId: orderItem.itemId["__id"],
				creator: creator,
				orderId: orderId,
				price: null,
				quantity: 1,
				customerTierId: customerTierId,
				partyId: partyId,
				parentOrderItemId: null,
				configurationOptionItemId: null,
				subOrderSalesItems: orderItem?.subOrderSalesItems?.map(subItem => {
					return {
						itemId: subItem.subOrderSalesItems[0].itemId.__id,
						creator: creator,
						orderId: orderId,
						price: null,
						quantity: 1,
						customerTierId: customerTierId,
						partyId: partyId,
						parentOrderItemId: null,
						configurationOptionItemId: subItem.itemId["__id"],
						
					};
				})
			};
		});
	}

	const handleUpdateSalesOrder = (salesItem) => {
		
		const newSalesOrderItem = transformData(salesItem)
		
		let newSavedItems = [];

		newSalesOrderItem.forEach((newItem) => {
			dispatch(createSalesOrderItem(newItem))
			console.log("newItemLoading: ", newItemLoading)
			if(!newItemLoading){
				console.log("first level: ", newSalesOrder)
				newSavedItems.push(newItem)
				newItem.id = newSalesOrder["__id"]
				if(newItem?.subOrderSalesItems?.length != 0) {
					newItem?.subOrderSalesItems?.map((subItem) => {
						// console.log("second level: ", newSalesOrder)
						subItem.parentOrderItemId = newItem.id
						dispatch(createSalesOrderItem(subItem))
						if(!newItemLoading){
							newSavedItems.push(subItem)
						}
					})
				}
				
				return new Promise(resolve => {
					setTimeout(resolve, 2000);
				}).then(() => {
					setShowConfirmation(true)
					
					return new Promise(resolve => {
						setTimeout(resolve, 2000);
					}).then(() => {
						setShowConfirmation(false)
						// setItemCart([])
					});
				});
				
			}
		})
		console.log(newSavedItems)
	}

	console.log(newItemLoading)
    return (
        <>
            <div className="container xl:w-full">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
						<Link href={`/overview/orders/${params.menu}`} className='px-8 py-2 rounded-md border bg-yellow-500 text-white font-semibold'>
							Back
						</Link>
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
																{
																	prod["is configuration"] == 1 || prod?.itemId && prod?.itemId["is configuration"] == 1 &&
																	prod?.subOrderSalesItems?.length != 0 ?
																	<>
																	<span className='block'>
																		{prod?.itemId["name"] }
																		{
																			prod?.subOrderSalesItems?.map((subOrder) => 
																			(
																				<>
																				<span className='block ml-4'>
																					{subOrder?.itemId?.name || subOrder?.itemId?.categoryData["name"]}
																					{
																						subOrder?.subOrderSalesItems?.map((subOrderItem) => (
																							<>
																							<span className='block ml-4'>
																								{subOrderItem?.itemId?.name || subOrderItem?.itemId?.categoryData["name"]}
																							</span>
																							</>
																						))
																					}
																				</span>
																				</>

																			)
																			)
																		}
																	</span>
																	</>
																	:
																	<span className='block'>
																		{prod?.name || prod?.itemId["name"]}
																	</span>
																}
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
												<button 
													className='mx-auto px-8 py-2 rounded-md border bg-yellow-500 text-white font-semibold'
													onClick={()=> {
														handleUpdateSalesOrder(itemCart)
													}}
												>
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
														<>
															<tr key={item["__id"]} className={`${selectedParentConfigID && selectedParentConfigID == item["__id"] ? "text-yellow-500 bg-slate-50" : "" } hover:text-yellow-500 hover:bg-slate-50`}>
																<td className='p-4  font-semibold'>
																	{item?.name}
																</td>
																<td>
																	<button 
																		className={`${selectedParentConfigID && selectedParentConfigID == item["__id"] ? 'text-white bg-yellow-500' : "text-yellow-500 bg-white" } py-2 px-6 border rounded-md font-semibold  border-yellow-500  hover:text-white hover:bg-yellow-500`}
																		onClick={() => {
																		
																			if(item["is configuration"] == 1) {
																				dispatch(fetchConfigurationOptions(item["__id"], "_configuration id"))
																				setSelectedParentConfigID(item["__id"])
																				let parentConfigurator = uuidv4();
																				
																				let parentItem = {
																					"id": parentConfigurator,
																					"itemId": item,
																					"subOrderSalesItems": []
																				}
																				setSelectedCartItemID(parentItem["id"])
																				setItemCart([...itemCart, parentItem])
																			} else {
																				setItemCart([...itemCart, item])
																			}
																		}}
																	>
																		Select
																	</button>
																</td>
															</tr>

															{
																item["is configuration"] == 1 && selectedParentConfigID && selectedParentConfigID == item["__id"] &&
																
																configurations.length != 0 &&
																	configurations?.map((config) => {
																		return (
																			<>
																			<tr 
																				className={`${selectedChildConfigID == config["__id"] ? "bg-slate-50 text-yellow-500" :  "bg-yellow-50 text-black"} hover:text-yellow-500 hover:bg-slate-50 cursor-pointer`}
																				key={config['__id']}
																			>
																				<td className='pl-10 p-4 flex justify-between'>
																					<span className=' font-semibold'>
																						{config.categoryData["name"]}
																					</span>
																					<button 
																						className={`${selectedChildConfigID == config["__id"] ? "text-white bg-yellow-500" : "text-yellow-500 bg-white"} py-2 px-6 border hover:text-white hover:bg-yellow-500 rounded-md font-semibold  border-yellow-500 `}
																						onClick={() => {
																							dispatch(fetchSubConfigurationOptions(config["_configuration id"], "_configuration id"))
																							setSelectedChildConfigID(config["__id"])
																							let parentConfiguratorItemID = uuidv4();
																							let subOrderSalesItem = {
																								"id": parentConfiguratorItemID,
																								"itemId": config,
																								"subOrderSalesItems": []
																							}
																							setSelectedCartSubItemID(subOrderSalesItem["id"])
																							let parentCartItem = itemCart.filter(el => {
																								return el["id"] == selectedCartItemID
																							})
																							if(parentCartItem.length !== 0) {
																								let checkIfExistSubOrderSalesItem = parentCartItem[0].subOrderSalesItems.filter(subItem => config["__id"] == subItem?.itemId["__id"])
																								console.log(checkIfExistSubOrderSalesItem)

																								if(checkIfExistSubOrderSalesItem.length == 0) {
																									parentCartItem[0].subOrderSalesItems.push(subOrderSalesItem)
																								}
																							}
																						}}
																						>
																							Select
																					</button>
																				</td>
																				<td>
																				</td>															
																			</tr>
																		{
																			selectedChildConfigID && config["__id"] == selectedChildConfigID &&
																			!subConfigurationsLoading &&
																			subConfigurations?.map((subConfig) => {
																				return(
																						subConfig["__id"] == selectedChildConfigID &&
																						subConfig.configuratorData?.map((subConfigItem)=> {
																							return(
																								<>
																								<tr 
																								className={`${selectedChildSubConfig["__id"] == subConfigItem["__id"]? 'text-yellow-500 bg-slate-50': ''} hover:text-yellow-500 hover:bg-slate-50 cursor-pointer bg-yellow-100`}
																								>
																									<td className='pl-16 p-4 flex justify-between'>
																										<span 
																										className={`${subConfigItem["is configuration"] == 1 ? '' : 'cursor-pointer font-semibold'}`}
																										onClick={() => {
																											let parentConfiguratorItemID = uuidv4();
																											let subOrderSalesItem = {
																												"id": parentConfiguratorItemID,
																												"itemId": subConfigItem,
																												"subOrderSalesItems": []
																											}

																											if(subConfigItem["is configuration"] == 0) {
																												let parentCartItem = itemCart.filter(el => {
																													return el["id"] == selectedCartItemID
																												})
																												
																												if(parentCartItem.length !== 0) {
																													
																													let checkIfExistSubOrderSalesItem = parentCartItem[0].subOrderSalesItems.map(subItem => {
																														if(config["__id"] == subItem?.itemId["__id"])
																														{
																															if(subItem.subOrderSalesItems.length == 0){
																																subItem.subOrderSalesItems.push(subOrderSalesItem)
																																return subItem
																															}
																															return subItem
																														}
																														return subItem
																													})

																													console.log(checkIfExistSubOrderSalesItem)
																													
																													
																													
																												}
																												
																												// console.log(parentCartItem)
																												// console.log(subConfigItem)
																												// console.log(config["__id"])
																												// console.log(selectedCartSubItemID)
																												// console.log(selectedCartItemID)
																												console.log(itemCart)

																											}
																										}}
																										>
																											{subConfigItem["name"]}
																										</span>
																										{
																											subConfigItem["is configuration"] == 1 &&
																											<button 
																											className={`${selectedChildSubConfig["__id"] == subConfigItem["__id"]? "bg-yellow-500 text-white" : "text-yellow-500 bg-white" } py-2 px-6 border hover:text-white hover:bg-yellow-500 rounded-md font-semibold  border-yellow-500`}
																											onClick={() => {
																												setSelectedChildSubConfig(subConfigItem)
																											}}
																											>
																												Select
																											</button>
																										}
																									</td>	
																									<td>
																									</td>														
																								</tr>
																								{
																									selectedChildSubConfig && subConfigItem["__id"] == selectedChildSubConfig["__id"] &&
																									selectedChildSubConfig?.categoryData?.map((childSubConfigItem) => {
																										return(
																										<>
																										<tr 
																										className={`${selectedChildSubConfigOptions["__id"] == childSubConfigItem["__id"] ? "text-yellow-500 bg-slate-50" : ""} hover:text-yellow-500 hover:bg-slate-50 cursor-pointer bg-yellow-200`}
																										>
																											<td className='pl-20 p-4 flex justify-between'>
																												<span className=' font-semibold'>
																													{childSubConfigItem["name"]}
																												</span>
																												
																												<button 
																												className={`${selectedChildSubConfigOptions["__id"] == childSubConfigItem["__id"] ? "bg-yellow-500 text-white" : "text-yellow-500 bg-white"} py-2 px-6 border hover:text-white hover:bg-yellow-500 rounded-md font-semibold border-yellow-500`}
																												onClick={() => {
																													setSelectedChildSubConfigOptions(childSubConfigItem)
																													console.log(childSubConfigItem?.configuratorData)
																													console.log(selectedChildConfigID)
																												}}
																												>
																													Select
																												</button>
																											</td>
																											<td>
																											</td>													
																										</tr>
																										{
																											selectedChildSubConfigOptions && childSubConfigItem["__id"] == selectedChildSubConfigOptions["__id"] &&
																											selectedChildSubConfigOptions?.configuratorData?.map((childSubConfigOptions) => {
																												return(
																												<>
																												<tr 
																												className='hover:text-yellow-500 hover:bg-slate-50 cursor-pointer bg-yellow-200'
																												>
																													<td className='pl-28 p-4 flex justify-between'>
																														<span className=' font-semibold'>
																															{childSubConfigOptions["name"]}
																														</span>
																														
																														<button 
																														className='py-2 px-6 border hover:text-white hover:bg-yellow-500 rounded-md font-semibold text-yellow-500 border-yellow-500 bg-white'
																														onClick={() => {
																															console.log(childSubConfigOptions)
																														}}
																														>
																															Select
																														</button>
																													</td>
																													<td>
																													</td>															
																												</tr>
																												</>
																												)
																											})
																											
																										}
																										</>
																										)
																									})
																									
																								}
																								
																								</>
																							)
																						})
																					
																					
																				)
																			})
																			
																		}
																			</>
																		)
																	})
															}															
														</>
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

						{
							showConfirmation &&
							<>
								<ConfirmationDialog
									title={"Sales Order Item added!"}
									open={showConfirmation} 
									setOpen={setShowConfirmation} 
									action="loading"
									id={itemCart}
								/>
							</>
						}
                    </div>
                </div>
            </div>
        </>
    );
}