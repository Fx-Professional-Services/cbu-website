
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryItems } from "../../../../redux/category_items/actions";
import { fetchConfigurationOptions } from "../../../../redux/configurations/actions";
import PanelSlide from "../common/Modal/PanelSlide";

export const OrdersModal = ({item, open, setOpen, index}) => {
	
	let configurationId = item?.itemData["__id"];
	const [selectedConfiguration, setSelectedConfiguration] = useState("")

	const { configurations, loading } = useSelector((state) => state.configurationsReducer);
	const {categoryItems, loading: categoryLoading} = useSelector((state) => state.categoryItemsReducer);

    const dispatch = useDispatch();

	useEffect(() => {
        dispatch(fetchConfigurationOptions(configurationId));
    }, [open]);

	const handleConfiguratorModal = (id, categoryId) => {
		setSelectedConfiguration(id)
		dispatch(fetchCategoryItems(categoryId))
	}

	console.log(item)
	return(
		<>
			<PanelSlide open={open} setOpen={setOpen}>
				<h2 className="text-lg font-bold">{item?.itemData?.name}</h2>
				{/* <span className="text-sm">
					Select buttercreams and flavors for your cake
				</span> */}
				{
					!loading ? 
					<>
						<div className="mt-5">
							<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
								<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
									<div className="mt-8">
										<div className="flex justify-between">
											<ul key={item["__id"]} role="list" className="w-[30%] divide-y divide-gray-200">
											{configurations?.map((configuration) => (
											<>
												<li 
													key={configuration["__id"]} 
													className={`${selectedConfiguration == configuration["__id"] && "text-yellow-600 bg-gray-50" } flex cursor-pointer py-4 text-gray-900 rounded-xl hover:bg-gray-50 hover:text-yellow-600`}
													onClick={() => {
														handleConfiguratorModal(configuration["__id"], configuration["_category id"])
													}}
												>
													<div className="ml-4 flex flex-1 flex-col">
														<div>
														<div className="flex justify-between text-base font-medium ">
															<h3>
																{configuration?.categoryData["display text"]}
															</h3>
														</div>
														
														</div>
														<div className="flex flex-1 items-end justify-between text-sm">
														<p>
															Quantity: {configuration["maximum quantity"]}
														</p>

														</div>
													</div>
												</li>
											</>	
											))}
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
														selectedConfiguration != "" ?
															categoryLoading ?
															<>
																<tr>
																<td className="whitespace-nowrap px-3 py-4 text-sm" colSpan={2}>Loading ...</td>
																
															</tr>
															</>
															:
																categoryItems && categoryItems.length != 0 &&
																	categoryItems.map((category)=>{
																		return(
																			<>
																			<tr key={category["__id"]} className={`${category.itemData["is configuration"] == 1 ? "hover:bg-gray-50 hover:text-yellow-600 cursor-pointer" : ""}`}>
																				<td className="rounded-xl whitespace-nowrap px-3 py-4 text-sm">{category?.itemData?.name}</td>
																				<td className="rounded-xl whitespace-nowrap px-3 py-4 text-sm">{category?.itemData?.price || "$0.00"}</td>
																			</tr>
																			</>
																		)
																})
														: <>
															<tr>
																<td className="whitespace-nowrap px-3 py-4 text-sm" colSpan={2}>Please choose a category on the left first</td>
																
															</tr>
														</>
													}
													
													
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>

							<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
								<table className="w-[100%] divide-y divide-gray-300">
									<thead>
										<tr>
											<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 w-[40%]">
												Selected item name
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
										
										{
											configurations.map((configuration, index) => {
												return (
													selectedConfiguration != "" && selectedConfiguration == configuration["__id"] &&
													<>
														
															{
																item.subOrders.length != 0 && item.subOrders.length > 0 &&
																item.subOrders.map((subOrder) => {
																	return(
																		<>
																		
																		<tr key={subOrder["__id"]}>
																			<td className="whitespace-nowrap px-3 py-1.5 text-sm" >
																				{
																					subOrder.itemData.name
																				}
																			</td>
																			<td className="whitespace-nowrap px-3 py-4 text-sm" >
																				{
																					`${subOrder.quantity}.00`
																				}
																			</td>
																			<td className="whitespace-nowrap px-3 py-4 text-sm" >
																				{
																					subOrder.price
																				}
																			</td>
																			<td className="whitespace-nowrap px-3 py-4 text-sm" >
																				{
																					subOrder.subtotal
																				}
																			</td>
																		</tr>
																		{
																			subOrder.subOrders && subOrder.subOrders.length != 0 ?
																				subOrder.subOrders.map((subItem) => {
																				return (
																					<>
																					<tr>
																						<td className="whitespace-nowrap px-3 py-1 text-sm ml-8">
																							{subItem.itemData.name}
																						</td>
																						<td className="whitespace-nowrap px-3 py-4 text-sm" >
																							{
																								`${subItem.quantity}.00`
																							}
																						</td>
																						<td className="whitespace-nowrap px-3 py-4 text-sm" >
																							{
																								subItem.price
																							}
																						</td>
																						<td className="whitespace-nowrap px-3 py-4 text-sm" >
																							{
																								subItem.subtotal
																							}
																						</td>
																					</tr>
																					</>
																					)
																				})
																				:
																				<tr className="ml-6">
																					<td className="whitespace-nowrap px-3 py-4 text-sm" colSpan={2}>
																						No selected items
																					</td>
																				</tr>
																		}
																		</>

																	)
																})
															}
													
													</>
												)
											})
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
									<a
										href="#"
										className="flex items-center justify-center rounded-md border border-transparent bg-yellow-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-700"
									>
										Save
									</a>
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