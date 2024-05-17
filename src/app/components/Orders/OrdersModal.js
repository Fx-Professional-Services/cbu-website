
import PanelSlide from "../common/Modal/PanelSlide";
import { useDispatch, useSelector } from 'react-redux';
import { fetchConfigurationOptions } from "../../../../redux/configurations/actions";
import { fetchCategoryItems } from "../../../../redux/category_items/actions";
import { useEffect, useState } from "react";
import { ConfiguratorsModal } from "../Configurators/ConfiguratorsModal";

export const OrdersModal = ({item, open, setOpen, index}) => {
	
	let configurationId = item?.itemData["__id"];
	const [openConfigurator, setOpenConfigurator] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState({})
	const [modalTitle, setModalTitle] = useState()
	const { configurations, loading } = useSelector((state) => state.configurationsReducer);
	const {categoryItems, loading: categoryLoading} = useSelector((state) => state.categoryItemsReducer);

    const dispatch = useDispatch();

	useEffect(() => {
        dispatch(fetchConfigurationOptions(configurationId));
    }, [open]);

	const handleConfiguratorModal = (id, name, categoryId) => {
		setSelectedIndex({[id]: true, ...selectedIndex})
		setModalTitle(name)
		if(categoryId) dispatch(fetchCategoryItems(categoryId))
		setOpenConfigurator(true);
	}

	console.log(configurations)
	console.log(item)
	return(
		<>
			
			<PanelSlide open={open} setOpen={setOpen}>
				<h2 className="text-lg font-bold">{item?.itemData?.name}</h2>
				<span className="text-sm">
					Select buttercreams and flavors for your cake
				</span>
				{
					!loading ? 
					<>
						<div className="mt-10">
							<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
								<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
								<div className="mt-8">
									<div className="flow-root">
									<ul role="list" className="-my-6 divide-y divide-gray-200">
									{configurations?.map((configuration) => (
									<>
									<li className="flex py-6">
										<div className="ml-4 flex flex-1 flex-col">
											<div>
											<div className="flex justify-between text-base font-medium text-gray-900">
												<h3>
													{configuration?.categoryData["display text"]}
												</h3>
											</div>
											
											</div>
											<div className="flex flex-1 items-end justify-between text-sm">
											<p className="text-gray-500">
												Quantity: {configuration["maximum quantity"]}
											</p>

											<div className="flex">
												<button
												type="button"
												className="font-medium text-yellow-600 hover:text-yellow-500"
												onClick={() => handleConfiguratorModal(configuration["__id"], configuration?.categoryData["display text"], configuration["_category id"])}
												>
												{
													configuration?.type
												}
												</button>
											</div>
											</div>
										</div>
									</li>
									
										<ControlledModal key={configuration["__id"]} name={modalTitle} open={openConfigurator && selectedIndex[configuration["__id"]]} setOpen={setOpenConfigurator} categoryLoading={categoryLoading} categories={categoryItems} handleConfiguratorModal={handleConfiguratorModal} selectedIndex={selectedIndex} dispatch={dispatch}/>
										
									</>
									
									))}
								</ul>
							</div>
							</div>
						</div>
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

const ControlledModal = ({name, open, setOpen, categories, categoryLoading, dispatch}) => {
	const [openSubConfigurator, setOpenSubConfigurator] = useState(false)
	const [selectedSubConIndex, setSelectedSubConIndex] = useState()

	const handleClick = (itemId, item) => {
		
        setSelectedSubConIndex(itemId)
        setOpenSubConfigurator(true)
		setOpen(true)
    }

	return(
		<>
		<ConfiguratorsModal open={open} setOpen={setOpen}>
			<h2 className="text-lg font-bold">{name}</h2>
			<span className="text-sm">
				Select item for your {name}
			</span>
			{
				!categoryLoading ? 
				<>
					<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
						<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 mt-8">
							<div className="mt-8">
								<div className="flow-root">
									<ul role="list" className="-my-6 divide-y divide-gray-200">
									{categories?.map((item) => (
										<>
										<li className="flex py-6">
											<div className="ml-4 flex flex-1 flex-col">
												<div>
												<div className="flex justify-between text-base font-medium text-gray-900">
													<h3>
														{item?.itemData?.name}
													</h3>
													<button
														type="button"
														className="font-medium text-yellow-600 hover:text-yellow-500"
														onClick={() => handleClick(item["__id"], item)}
														>
														 select one
													</button>
												</div>
												</div>		
											</div>
										</li>
										</>
										))}
									</ul>
								</div>
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

		</ConfiguratorsModal>

		<ConfiguratorsModal open={openSubConfigurator} setOpen={setOpenSubConfigurator}>
			
		</ConfiguratorsModal>
		</>
	)
}