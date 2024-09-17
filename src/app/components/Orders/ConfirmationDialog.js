import { Dialog } from '@headlessui/react';
import ConfirmationModal from "../common/Modal/ConfirmationModal";
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export const ConfirmationDialog = ({open, setOpen, handleDeleteSalesOrderItem, title, action, id}) => {

	return (
		<>
			<ConfirmationModal open={open} setOpen={setOpen}>
			
				<div>
					{
						action == "loading" ?
						<>
						<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
							<div className="sm:flex sm:items-start">
								<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full  sm:mx-0 sm:h-10 sm:w-10">
									
								</div>
								<div className="mt-3 text-center sm:ml-4 sm:mt-0">
									<Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 text-center">
										{title}
									</Dialog.Title>
									<div className="mt-2 p-10">
										{
											Array.isArray(id) &&
												id.map((item, index) => 
													(
														<div key={index} className="text-center">
															{item["name"]}
														</div>
													))
										}
										
									</div>
								</div>
							</div>
						</div>
						</>

						:

						<>
							<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
								<div className="sm:flex sm:items-start">
									<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
										<ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
									</div>
									<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
										<Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
											Delete this Sales Order Item?
										</Dialog.Title>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
											Are you sure you want to delete your Sales Order Item <strong>{title}</strong>? It will be permanently removed.
											<br/>
											This action cannot be undone.
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
								<button
									type="button"
									onClick={() => {
										handleDeleteSalesOrderItem(id)
									}}
									className="inline-flex w-full justify-center rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
								>
									Delete
								</button>
								<button
									type="button"
									data-autofocus
									onClick={() => setOpen(false)}
									className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
								>
									Cancel
								</button>
							</div>
						</>
					}
				</div>
			</ConfirmationModal>
		</>
	)
}