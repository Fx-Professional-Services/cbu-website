
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { checkIfExistSalesOrderItem } from "../../../../redux/check_ifExist_sales_order_item_/actions";
import { fetchConfigurationOptions } from "../../../../redux/configurations/actions";
import { createSalesOrderItem } from "../../../../redux/create_sales_order_item/actions";
import { fetchSubConfigurationOptions } from "../../../../redux/subConfigurations/actions";
import { updateOrderItem } from "../../../../redux/update_order_item/actions";
import { fetchSalesOrderItem } from "../../../../redux/get_sales_order_item/actions";
import PanelSlide from "../common/Modal/PanelSlide";

export const OrdersModal = ({item, open, setOpen, index, setIsReload}) => {
    const dispatch = useDispatch();
	const { configurations, loading } = useSelector((state) => state.configurationsReducer);
	const { subConfigurations, loading: subConfigLoading } = useSelector((state) => state.subConfigurationsReducer);
	const { updatedOrder, loading: updateLoading} = useSelector((state) => state.updateOrderItemReducer);
	const { newSalesOrder, loading: newItemLoading } = useSelector((state) => state.createSalesOrderItemReducer);
	const { existingSalesOrder, loading: checkIfExistLoading } = useSelector((state) => state.checkIfExistSalesOrderItemReducer);
	const {salesOrderItem, loading: salesOrderItemLoading} = useSelector((state) => state.getSalesOrderItemReducer)

	let configurationId = item?.itemData["__id"];
	const { subOrders } = item;

	//old States
	const [selectedSalesOrder, setSelectedSalesOrder] = useState([])
	const [selectedConfiguration, setSelectedConfiguration] = useState("")
	const [selectedConfigurationName, setSelectedConfigurationName] = useState("")
	const [selectedSubConfigurations, setSelectedSubConfigurations] = useState("")
	const [selectedSubConfigurationID, setSelectedSubConfigurationID] = useState("")
	const [selectedSubConfigurationSubProducts, setSelectedSubConfigurationSubProducts] = useState("")
	const [selectedLevelSubOrder, setSelectedLevelSubOrder] = useState("")

	//Selected Family Sales Order Items
	const [selectedParentSalesOrderItem, setSelectedParentSalesOrderItem] = useState("")
	const [selectedChildSalesOrderItem, setSelectedChildSalesOrderItem] = useState("")
	const [newSalesOrderItem, setNewSalesOrderItem] = useState("")

	const [selectedLevelOne, setSelectedLevelOne] = useState("")
	const [selectedLevelTwo, setSelectedLevelTwo] = useState("")
	const [selectedLevelThree, setSelectedLevelThree] = useState("")

	//new sales order item 
	const [newSalesOrderItemSubItemID, setNewSalesOrderItemSubItemID] = useState("")

	const getSelections = (itemConfigurations) => {
		return itemConfigurations.flatMap(configuration => {
			if(configuration?.type == "select multiple" && configuration?.selections > 1) {
				return [configuration, configuration]
			} 
			
			return configuration
		})
	}
	
	const configurators = getSelections(configurations);
	// console.log("getSelections(configurations)",configurators)

	function checkIfNotConfigurator (data) {
		 
		if (!Array.isArray(data)) {
			return;
		}
	
		for (const item of data) {
			if('categoryData' in item){

				if (item.categoryData !== null && Array.isArray(item.categoryData)) {
					return checkIfNotConfigurator(item.categoryData)
					// return "is configuration"
					
				} else if (!Array.isArray(item.categoryData)) {
					if('categoryData' in item.categoryData){
						return checkIfNotConfigurator(item.categoryData.categoryData)
					} else if("is configuration" in item &&  item["is configuration"] === 0) {
						return "is not configuration"
					}

				}
				
			} else if("is configuration" in item &&  item["is configuration"] === 0) {
				return "is not configuration"
			}

		}
	}

	const isNotConfigurator = checkIfNotConfigurator(configurations)

	useEffect(() => {
		if(item["_configuration option item id"] == null) {
			dispatch(fetchConfigurationOptions(configurationId, "_configuration id"));
		} else {
			console.log("dispatch _configuration option item id")
			dispatch(fetchConfigurationOptions(configurationId, "_configuration id"));
		}

    }, [open]);

	async function handleFetchSubConfigurations(configurationOptionItemId) {
		dispatch(fetchSubConfigurationOptions(configurationOptionItemId, "_configuration option item id"));
	}

	async function handleUpdateSingleOrderItem (orderId, itemId){
		console.log("orderId", orderId)
		console.log("itemId", itemId)
		// setIsReload(true)
		dispatch(updateOrderItem(orderId, itemId))
	}


	async function updateNewSalesOrderItem (salesItem, configurationID, parentSalesOrderItemID) {

		const newSalesOrderItem = {
			itemId: salesItem["__id"],
			creator: item["creator"],
			orderId: item["_order id"],
			price: null,
			quantity: 1,
			customerTierId: item["_customer tier id"],
			partyId: item["_party id"],
			parentOrderItemId: parentSalesOrderItemID,
			configurationOptionItemId: configurationID
		};

		try {
			let checkIfExist = await dispatch(checkIfExistSalesOrderItem(salesItem["__id"], parentSalesOrderItemID));
			  
			if(typeof checkIfExist == 'boolean' && !checkIfExist){
				dispatch(createSalesOrderItem(newSalesOrderItem));
				setIsReload(true);
			} else {
				if(checkIfExist?.error){
					console.error(checkIfExist?.error)
				} else {	
					setNewSalesOrderItemSubItemID(checkIfExist["__id"])
				}
			}
		} catch(error) {
			console.error(error)
		}
	}

	console.log("levelOne", selectedLevelOne)
	console.log("levelTwo", selectedLevelTwo)
	console.log("levelThree", selectedLevelThree)
	

	return(
		<>
			<PanelSlide open={open} setOpen={setOpen}>
				<h2 className="text-lg font-bold">{item?.itemData?.name}</h2>
				{/* <span className="text-sm">
					Select buttercreams and flavors for your cake
				</span> */}
				{
					!loading && configurators.length != 0 ? 
					<>
						<div className="mt-5">
							<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
								<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
									<div className="mt-8">
										<div className="flex justify-between">
											<ul key={index} role="list" className="w-[30%] divide-y divide-gray-200">
											{/* Parent Configurations */}
											
											{
												subOrders.length == 0 || subOrders.length < configurations.length ?
												configurations?.map((configItem, index) => 
													{
													return(
														
														configItem["_category id"] != undefined &&
															<li 
															key={configItem["__id"]} 
															className={`flex cursor-pointer py-4 text-gray-900 rounded-xl hover:bg-gray-50 hover:text-yellow-600`}
															onClick={() => {
																
																dispatch(fetchSubConfigurationOptions(configItem["_configuration id"], "_configuration id"))
																setSelectedLevelOne(configItem["__id"])
																setSelectedConfiguration(configItem["__id"])
																setSelectedConfigurationName("")
																setSelectedSubConfigurations("")
																setSelectedSubConfigurationSubProducts("")
																setNewSalesOrderItemSubItemID("")
																setSelectedLevelSubOrder("")
															}}
														>
															<div className="ml-4 flex flex-1 flex-col">
																<div>
																<div className="flex justify-between text-base font-medium ">
																	<h3>
																		{configItem?.categoryData?.name}
																	</h3>
																</div>
																
																</div>
																<div className="flex flex-1 items-end justify-between text-sm">
																<p>
																	Quantity: {configItem?.selections}
																</p>

																</div>
															</div>
														</li>
														
													)
												})
												:
												subOrders?.map((el, index) => (
													
													<>
													{
														el.type == "select multiple" && el.selection > 1
													}
														<li 
															key={item["__id"]} 
															className={`${ selectedConfiguration == el["_configuration option item id"] && "text-yellow-600 bg-gray-50" } flex cursor-pointer py-4 text-gray-900 rounded-xl hover:bg-gray-50 hover:text-yellow-600`}
															onClick={() => {
																if(isNotConfigurator && isNotConfigurator === "is not configuration") {
																	// handleConfiguratorModal(configurators[index], el["__id"], el)
																	console.log("hrhrhrhr")
																	 
																	
																} else {
																	console.log(el["_configuration option item id"])
																	console.log(configurators?.filter(itemEl => itemEl["__id"] == el["_configuration option item id"] ))
																	handleFetchSubConfigurations(el["_configuration option item id"], "_configuration option item id")
																	setSelectedConfiguration(el["_configuration option item id"])
																	setSelectedLevelOne(el["__id"])
																	setSelectedConfigurationName("")
																	setSelectedSubConfigurations("")
																	setSelectedSubConfigurationSubProducts("")
																	setSelectedLevelSubOrder("")
																}
															}}
														>
															<div className="ml-4 flex flex-1 flex-col">
																<div>
																<div className="flex justify-between text-base font-medium ">
																	<h3>
																		
																		{
																			el["is configuration"] != 1 ? configurators?.filter(itemEl => itemEl["__id"] == el["_configuration option item id"])[0]?.categoryData["name"]  : el?.itemData["name"]
																		}
																		
																	</h3>
																</div>
																
																</div>
																<div className="flex flex-1 items-end justify-between text-sm">
																<p>
																	Quantity: {subOrders && subOrders[index] !== undefined && subOrders[index]["quantity"]}
																</p>

																</div>
															</div>
														</li>
													</>	

												))
											}

											</ul>

											<table className="w-[60%] divide-y divide-gray-300">
												<thead>
													<tr>
														<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 w-[60%]">
															Item Name
														</th>
														<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-[20%]">
															Quantity
														</th>
														<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-[20%]">
															Price
														</th>
													</tr>
												</thead>
												<tbody className="divide-y divide-gray-200">
													
													{
														selectedConfiguration != "" && selectedConfiguration != undefined &&
														subConfigLoading ? 
														<>
															<tr 
																className="font-semibold text-center"
															>
																<td 
																	colSpan={3}
																>
																	Loading items ...
																</td>
																
															</tr>
														</>
														:
														<>
														{
															subConfigurations?.map((el, index) => { 
															
																return(
																<>
																{
																	el["__id"] == selectedConfiguration &&
																	el?.configuratorData?.map((configItem, index) => {
																		return(
																			<tr 
																				key={el["__id"]} 
																				className={`${el["__id"] == selectedConfiguration ? "font-bold text-yellow-600" :""} hover:bg-gray-50 hover:text-yellow-600 cursor-pointer`}
																				onClick={() => {
																					let selectedOrderItem = subOrders?.filter(parentEl => parentEl["_configuration option item id"] == el["__id"])
																					
																					if(subOrders.length == 0 || subOrders.length < configurations.length) {
																						console.log("HELLO")
																						setSelectedSubConfigurations(configItem?.categoryData)
																						updateNewSalesOrderItem(configItem, el["__id"], item["__id"])
																						setSelectedConfigurationName(configItem?.name)
																					} else if(selectedOrderItem[0]?.subOrders.length == 0) {
																						
																						if(selectedOrderItem["is configuration"] != 1){
																							console.log("update")
																							handleUpdateSingleOrderItem(selectedOrderItem[0]["__id"] ,configItem["__id"])
																						} else {
																							console.log("add new")
																							// setSelectedLevelTwo(configItem["__id"])
																							// setSelectedSubConfigurations(configItem?.categoryData)
																							// updateNewSalesOrderItem(configItem, el["__id"], item["__id"])
																							// setSelectedConfigurationName(configItem?.name)
																						}
																							
																					} else {
																						console.log("ELSE")
																						setSelectedLevelTwo(selectedOrderItem[0]["__id"])
																						setSelectedLevelSubOrder(selectedOrderItem[0]?.subOrders)
																						setSelectedSubConfigurations(configItem?.categoryData)
																						let selectedSalesOrder = subOrders.filter(subOrderItem => subOrderItem["_configuration option item id"] == el["__id"])[0]["__id"]
																						setSelectedParentSalesOrderItem(selectedSalesOrder)
																					}
																				}}
																			>
																				<td 
																					className="rounded-l-xl whitespace-nowrap px-3 py-4 text-sm"
																				>
																					{
																						configItem?.name
																					}
																				</td>
																				
																				<td className="whitespace-nowrap px-3 py-1 text-sm max-w-xl text-wrap">
																					{
																						configItem?.selections
																					}
																				</td>																		
																				<td className="rounded-r-xl whitespace-nowrap px-3 py-4 text-sm">{item?.price || "$0.00"}</td>
																			</tr>
																		)
																	})

																}
																</>
																)
															})
														}
														</>
															
													}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>

							{/* For new sales order item - selection */}
							
							{
								Array.isArray(selectedSubConfigurations) ?
									(subOrders.length == 0 || subOrders.length < configurations.length) || selectedLevelSubOrder.length == 0 ?
									
									<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl border-t-2 mt-8">
										<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
											<h2 className="text-lg font-bold">Selections for {selectedConfigurationName || ""}</h2>
											<div className="mt-8">
												<div className="flex justify-between">
													<ul role="list" className="w-[30%] divide-y divide-gray-200">
													{/* Sub configuration */}
													{
														selectedSubConfigurations && selectedSubConfigurations.length != 0 &&
														selectedSubConfigurations?.map((selectedSubConfiguration, index) => {
															
															return (
																selectedSubConfiguration?.configuratorData?.length != 0 &&
																<>
																	<li 
																		key={selectedSubConfiguration["__id"]} 
																		className={`${selectedSubConfiguration["__id"] == selectedSubConfigurationID ? "font-bold text-yellow-600" :"" } flex cursor-pointer py-4 text-gray-900 rounded-xl hover:bg-gray-50 hover:text-yellow-600`}
																		onClick={() => {				
																			setSelectedSubConfigurationID(selectedSubConfiguration["__id"])
																			setSelectedSubConfigurationSubProducts(selectedSubConfiguration?.configuratorData)
																			setSelectedChildSalesOrderItem(selectedSubConfiguration["__id"])
																			setSelectedLevelThree(selectedSubConfiguration["__id"])
																			
																		}}
																	>
																		<div className="ml-4 flex flex-1 flex-col">
																			<div>
																			<div className="flex justify-between text-base font-medium ">
																				<h3>
																					{selectedSubConfiguration?.name}
																				</h3>
																			</div>
																			
																			</div>
																			<div className="flex flex-1 items-end justify-between text-sm">
																			<p>
																				Quantity: {selectedSubConfiguration?.selections}
																			</p>

																			</div>
																		</div>
																	</li>
																</>	
															)
														}
														)
													}
													</ul>
													<table className="w-[60%] divide-y divide-gray-300">
														<thead>
															<tr>
																<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 w-[80%]">
																	Item Name
																</th>
																<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-[20%]">
																	Price
																</th>
															</tr>
														</thead>
														<tbody className="divide-y divide-gray-200">
															{
																selectedSubConfigurationSubProducts && selectedSubConfigurationSubProducts.length !== 0 &&
																	selectedSubConfigurationSubProducts.map((subProduct, index) => {
																			return(
																				<>
																				<tr 
																					key={subProduct["__id"]} 
																					className={`${newSalesOrderItem != "" && newSalesOrderItem == subProduct["__id"] ? "text-yellow-600" :"" } hover:bg-gray-50 hover:text-yellow-600 cursor-pointer`}
																					onClick={() => {
																						updateNewSalesOrderItem (subProduct, selectedSubConfigurationID, newSalesOrderItemSubItemID)
																					}}
																				>
																					<td className="rounded-xl whitespace-nowrap px-3 py-4 text-sm">{subProduct?.name}</td>
																					<td className="rounded-xl whitespace-nowrap px-3 py-4 text-sm">{subProduct?.price || "$0.00"}</td>
																				</tr>
																				</>
																			)
																	})
															}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
									:
									<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl border-t-2 mt-8">
										<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
											<h2 className="text-lg font-bold">Selections for {selectedConfigurationName || ""}</h2>
											<div className="mt-8">
												<div className="flex justify-between">
													<ul role="list" className="w-[30%] divide-y divide-gray-200">
													{/* Sub configuration */}
													{
														selectedLevelSubOrder && selectedLevelSubOrder.length != 0 &&
														selectedLevelSubOrder?.map((selectedSubConfiguration, index) => {
															
															return (
																selectedSubConfiguration != undefined ?
																	<>
																		<li 
																			key={selectedSubConfiguration["__id"]} 
																			className={`${selectedSubConfiguration["__id"] == selectedSubConfigurationID ? "font-bold text-yellow-600" :"" } flex cursor-pointer py-4 text-gray-900 rounded-xl hover:bg-gray-50 hover:text-yellow-600`}
																			onClick={() => {																	
																				setSelectedChildSalesOrderItem(selectedSubConfiguration["__id"])
																				setSelectedLevelThree(selectedSubConfiguration["__id"])
																			

																				setSelectedSubConfigurationID(selectedSubConfiguration["__id"])
																				let subConfig = selectedSubConfigurations.filter((el) => el["__id"] == selectedSubConfiguration["_configuration option item id"])[0].configuratorData
																				setSelectedSubConfigurationSubProducts(selectedSubConfiguration?.configuratorData || subConfig)
																			}}
																		>
																			<div className="ml-4 flex flex-1 flex-col">
																				<div>
																				<div className="flex justify-between text-base font-medium ">
																					{
																						selectedSubConfigurations &&
																						selectedSubConfigurations?.map((config) => {
																							return (
																								config["__id"] == selectedSubConfiguration["_configuration option item id"] &&
																								<h3>
																									{config.name}
																								</h3>
																							)
																						})
																					}
																				</div>
																				
																				</div>
																				<div className="flex flex-1 items-end justify-between text-sm">
																				<p>
																					Quantity: 
																				</p>

																				</div>
																			</div>
																		</li>
																	</>	
																:""
															)
														}
														)
														// :

														// selectedSubConfigurations?.map((selectedSubConfiguration, index) => {
														// 	return (
														// 		selectedSubConfiguration != undefined ?
														// 			<>
														// 			<li 
														// 				key={selectedSubConfiguration["__id"]} 
														// 				className={`${selectedSubConfiguration["__id"] == selectedSubConfigurationID ? "font-bold text-yellow-600" :"" } flex cursor-pointer py-4 text-gray-900 rounded-xl hover:bg-gray-50 hover:text-yellow-600`}
														// 				onClick={() => {				
														// 					console.log(selectedSubConfiguration)
																																
														// 					setSelectedSubConfigurationSubProducts(selectedSubConfiguration?.configuratorData)
														// 				}}
														// 			>
														// 				<div className="ml-4 flex flex-1 flex-col">
														// 					<div>
														// 					<div className="flex justify-between text-base font-medium ">
														// 						<h3>
														// 							{selectedSubConfiguration.name}
														// 						</h3>
														// 					</div>
																			
														// 					</div>
														// 					<div className="flex flex-1 items-end justify-between text-sm">
														// 					<p>
														// 						Quantity: 
														// 					</p>

														// 					</div>
														// 				</div>
														// 			</li>
														// 		</>	
														// 		:""
														// 	)
														// }
														// )
													}
													</ul>

													<table className="w-[60%] divide-y divide-gray-300">
														<thead>
															<tr>
																<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 w-[80%]">
																	Item Name
																</th>
																<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-[20%]">
																	Price
																</th>
															</tr>
														</thead>
														<tbody className="divide-y divide-gray-200">
															{
																selectedSubConfigurationSubProducts && selectedSubConfigurationSubProducts.length !== 0 &&
																	selectedSubConfigurationSubProducts.map((subProduct, index) => {
																			return(
																				<>
																				<tr 
																					key={subProduct["__id"]} 
																					className={`${newSalesOrderItem != "" && newSalesOrderItem == subProduct["__id"] ? "text-yellow-600" :"" } hover:bg-gray-50 hover:text-yellow-600 cursor-pointer`}
																					onClick={() => {
																						setNewSalesOrderItem(subProduct["__id"])
																					}}
																				>
																					<td className="rounded-xl whitespace-nowrap px-3 py-4 text-sm">{subProduct?.name}</td>
																					<td className="rounded-xl whitespace-nowrap px-3 py-4 text-sm">{subProduct?.price || "$0.00"}</td>
																				</tr>
																				</>
																			)
																	})
															}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								: null
							}


							{/* Table to view existing order items in a sales order */}
							<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
							<table className="w-[100%] divide-y divide-gray-300">
								<thead>
									<tr>
										<th scope="col" className="py-3.5 pl-4 pr-3 text-lg text-center font-semibold text-gray-900 sm:pl-0 w-[40%]">
											Current selected items
										</th>
										
										
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									
									{
										Array.isArray(subOrders) && subOrders.length != 0 &&
										subOrders.map((el) => (
											selectedLevelOne == el["__id"] &&
											<div className={`"bg-yellow-50"} my-5`}>
											<tr>
												<td>
												<span className="font-semibold text-lg">
													{configurators?.filter(itemEl => itemEl["__id"] == el["_configuration option item id"])[0]?.categoryData["name"]}
												</span>
												
												</td>
											</tr>
											<tr>
												<td colSpan={3}>
												
													<span className="ml-10 text-lg">
														{el.itemData["name"]}
														
													</span>
												</td>
											</tr>
											{
												Array.isArray(el?.subOrders) && el?.subOrders.length != 0 &&
												el?.subOrders.map((subItem) => {
													return(
														!subConfigLoading &&
														<>
															<tr>
																<td>
																<span className="font-semibold text-lg ml-16">
																	{ 
																		subConfigurations && subConfigurations.length != 0 &&
																		subConfigurations?.map(subItemEl =>{
																		return subItemEl?.configuratorData?.map(configEl => {
																			return configEl?.categoryData?.filter(category => {
																				return subItem["_configuration option item id"] == category["__id"]
																				})[0]
																			})[0]
																		})[0]?.name
																	}
																</span>
																
																</td>
															</tr>
															<tr>
																<td colSpan={3}>
																	<span className="ml-20 text-lg">
																		{subItem.itemData["name"]}

																	</span>
																</td>
															</tr>
														</>	
													)
												})
											}
											
											</div>
										))
									}
								</tbody>
							</table>
							</div>
							
							<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
								<div className="flex justify-between text-base font-medium text-gray-900">
									<p>Subtotal</p>
									<p>${item?.subtotal}.00</p>
								</div>
								<p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
								<div className="mt-6">
									<button
										onClick={()=>{
											console.log("selectedChildSalesOrderItem", selectedChildSalesOrderItem)
											console.log("newSalesOrderItem", newSalesOrderItem)
											handleUpdateSingleOrderItem(selectedChildSalesOrderItem, newSalesOrderItem)
										}}
										className="flex items-center justify-center rounded-md border border-transparent bg-yellow-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-700"
									>
										Save
									</button>
								</div>
							</div>
						</div>
					</>
					:
					<>
					<div className="mt-10">
						<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
							<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
								<div className="mt-8">
									<div className="flow-root">
									<div class="animate-pulse space-x-4">
											<div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6 mb-8">
												<div className="sm:col-span-full">
													<div class="h-2 bg-slate-700 rounded mt-10">
													</div>
													<div class="h-2 bg-slate-700 rounded mt-10">
													</div>
													<div class="h-2 bg-slate-700 rounded mt-10">
													</div>
													<div class="h-2 bg-slate-700 rounded mt-10">
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					</>
					
				}
			</PanelSlide>
		</>
	)
}