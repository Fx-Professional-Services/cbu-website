
import PanelSlide from "../common/Modal/PanelSlide";
import { useDispatch, useSelector } from 'react-redux';
import { fetchConfigurationOptions } from "../../../../redux/configurations/actions";
import { useEffect, useState } from "react";
import { ConfiguratorsModal } from "../Configurators/ConfiguratorsModal";

export const OrdersModal = ({item, open, setOpen}) => {
	const configurationId = item?.itemData["__id"];
	const [openConfigurator, setOpenConfigurator] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(null)
	const { configurations, loading } = useSelector((state) => state.configurationsReducer);
    const dispatch = useDispatch();

	useEffect(() => {
        dispatch(fetchConfigurationOptions(configurationId));
    }, [dispatch]);

	const handleConfiguratorModal = (id) => {
		setSelectedIndex(id)
		setOpenConfigurator(true);
	}

	return(
		<>
			<PanelSlide open={open} setOpen={setOpen}>
				<h2 className="text-lg font-bold">{item?.itemData?.name}</h2>
				<span className="text-sm">
					Select buttercreams and flavors for your cake
				</span>
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
											onClick={() => handleConfiguratorModal(configuration["__id"])}
											>
											{
												configuration?.type
											}
											</button>
										</div>
										</div>
									</div>
								</li>
								<ConfiguratorsModal key={configuration["__id"]} title={configuration?.categoryData["display text"]} open={openConfigurator && selectedIndex == configuration["__id"]} setOpen={setOpenConfigurator}/>
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
			</PanelSlide>
		</>
	)
}