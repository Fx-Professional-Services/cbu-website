
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchConfigurationOptions } from "../../../../redux/configurations/actions";
import { fetchSubConfigurationOptions } from "../../../../redux/subConfigurations/actions";
import { updateOrderItem } from "../../../../redux/update_order_item/actions";
import PanelSlide from "../common/Modal/PanelSlide";

export const OrdersModal = ({item, open, setOpen, index, setIsReload}) => {
    const dispatch = useDispatch();
	const { configurations, loading } = useSelector((state) => state.configurationsReducer);
	const { subConfigurations, loading: subConfigLoading } = useSelector((state) => state.subConfigurationsReducer);
	const {updatedOrder, loading: updateLoading} = useSelector((state) => state.updateOrderItemReducer)

	let configurationId = item?.itemData["__id"];
	const { subOrders } = item;

	//old States
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
		}

    }, [open]);

	async function handleFetchSubConfigurations(configurationOptionItemId) {
		dispatch(fetchSubConfigurationOptions(configurationOptionItemId, "_configuration option item id"));
	}
	function handleUpdateSingleOrderItem (orderId, itemId){
		console.log("orderId", orderId)
		console.log("itemId", itemId)
		setIsReload(true)
		dispatch(updateOrderItem(orderId, itemId))
	}

	useEffect(() => {
		if(updateLoading) {
			// window.location.reload()
			setIsReload(false)
			setOpen(false)
		} 
	},[updateLoading])

	// console.log("configurations", configurations)
	// console.log("Sales Order Items and subSalesOrder items", item)
	// console.log("subSalesOrder", item.subOrders)
	// console.log("subConfigLoading", subConfigLoading)
	// console.log("subConfigurations", subConfigurations)
	// console.log("selectedConfiguration", selectedConfiguration)
	// console.log("selectedSubConfigurationSubProducts", selectedSubConfigurationSubProducts)
	// console.log("selectedSubConfigurationSubProducts", selectedSubConfigurationSubProducts)

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
																	console.log(el)
																	 
																	
																} else {
																	handleFetchSubConfigurations(el["_configuration option item id"], "_configuration option item id")
																	setSelectedConfiguration(el["_configuration option item id"])
																	setSelectedConfigurationName("")
																	setSelectedSubConfigurations("")
																	setSelectedSubConfigurationSubProducts("")
																
																}
															}}
														>
															<div className="ml-4 flex flex-1 flex-col">
																<div>
																<div className="flex justify-between text-base font-medium ">
																	<h3>
																		{configurators[index]?.categoryData?.name}
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
																	Loading...
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
																			el?.configuratorData?.map((configItem, configIndex) => {
																				return (
																				<>
																				<tr 
																					key={configItem["__id"]} 
																					className={`${el["__id"] == selectedConfiguration ? "font-bold text-yellow-600" :""} hover:bg-gray-50 hover:text-yellow-600 cursor-pointer`}
																					onClick={() => {
																						setSelectedSubConfigurations(configItem.categoryData)
																						setSelectedConfigurationName(configItem?.name)
																						// console.log("subConfiguration.configurationData.categoryData",configItem.categoryData)
																						// console.log(el)
																						// console.log(subOrders)
																						let selectedOrderItem = subOrders?.filter(parentEl => parentEl["_configuration option item id"] == el["__id"])
																						
																						setSelectedLevelSubOrder(selectedOrderItem[0].subOrders)
																		
																						// console.log("subOrders",selectedOrderItem[0].subOrders)
																						// console.log("selectedSubConfigurations",selectedSubConfigurations)																						
																						let selectedSalesOrder = subOrders.filter(subOrderItem => subOrderItem["_configuration option item id"] == el["__id"])[0]["__id"]
																						setSelectedParentSalesOrderItem(selectedSalesOrder)
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
																							el?.selections
																						}
																					</td>																		
																					<td className="rounded-r-xl whitespace-nowrap px-3 py-4 text-sm">{item?.price || "$0.00"}</td>
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
															
													}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>

							{/* Sub Configuration */}
							{
								selectedLevelSubOrder && selectedLevelSubOrder.length !=0 && selectedSubConfigurations && selectedSubConfigurations.length != 0 &&
								<>
								<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl border-t-2 mt-8">
									<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
										<h2 className="text-lg font-bold">Selections for {selectedConfigurationName || ""}</h2>
										<div className="mt-8">
											<div className="flex justify-between">
												<ul role="list" className="w-[30%] divide-y divide-gray-200">
												{/* Sub configuration */}
												{
													selectedLevelSubOrder?.map((selectedSubConfiguration, index) => {
														return (
															selectedSubConfiguration != undefined ?
																<>
																<li 
																	key={selectedSubConfiguration["__id"]} 
																	className={`${selectedSubConfiguration["__id"] == selectedSubConfigurationID ? "font-bold text-yellow-600" :"" } flex cursor-pointer py-4 text-gray-900 rounded-xl hover:bg-gray-50 hover:text-yellow-600`}
																	onClick={() => {																		
																		// console.log(subOrders)
																		// let selectedSalesOrderSubItem = subOrders?.filter(parentEl => parentEl["__id"] == selectedParentSalesOrderItem)[0]?.subOrders?.filter(subItem => subItem["_configuration option item id"] ==  selectedSubConfiguration["__id"])[0]["__id"]

																		// setSelectedChildSalesOrderItem(selectedSalesOrderSubItem)
																		setSelectedChildSalesOrderItem(selectedSubConfiguration["__id"])
																	

																		setSelectedSubConfigurationID(selectedSubConfiguration["__id"])
																		let subConfig = selectedSubConfigurations.filter((el) => el["__id"] == selectedSubConfiguration["_configuration option item id"])[0].configuratorData
																		setSelectedSubConfigurationSubProducts(selectedSubConfiguration?.configuratorData || subConfig)
																	}}
																>
																	<div className="ml-4 flex flex-1 flex-col">
																		<div>
																		<div className="flex justify-between text-base font-medium ">
																			{
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
							</>
							}


							{/* Table to view existing order items in a sales order */}
							<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
							<table className="w-[100%] divide-y divide-gray-300">
								<thead>
									<tr>
										<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 w-[40%]">
											Current selected items
										</th>
										<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-[20%]">
											Quantity
										</th>
										<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-[20%]">
											Price
										</th>
										<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-[20%]">
											Total cost
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									<tr>
										<h3 className="font-bold" colSpan={4}>{selectedConfigurationName}</h3>
									</tr>
								
									
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