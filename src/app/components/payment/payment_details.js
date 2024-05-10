export default function PaymentDetails(payment){
	return(
		<>
			<div className="space-y-12">
				<div className="pb-12">
					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
						<div className="sm:col-span-full">
							<label htmlFor="nameOnCard" className="block text-sm font-medium leading-6 text-gray-900">
								Name on card
							</label>
							<div className="mt-2 border-b-2">
								<div className="w-[100%] py-1.5 px-4">
									Jane Smith
								</div>
								
							</div>
						</div>

						{/* card details */}
						<div className="col-span-full">
							<label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
								Card details
							</label>
							
							<div className="mt-2 flex border-b-2">
								<div className="w-[50%] py-1.5 px-4">
									1234-4567-8901-1111
								</div>
								<div className="w-[20%] py-1.5 px-4">
									05/2025
								</div>
								<div className="w-[30%] py-1.5 px-4">
									CVV 
								</div>
								
							</div>

								
						</div>

						<div className="col-span-full">
							<label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
								Billing address (optional)
							</label>
							<div className="mt-2 border-b-2">
								<div className="w-[100%] py-1.5 px-4">
									542 W. 14th Street, PO 77001
								</div>
							</div>

							<div className=" mt-2 flex justify-between space-x-4 border-b-2">
								<div className="w-[50%] py-1.5 px-4">
									Houston
								</div>
								<div className="w-[50%] py-1.5 px-4">
									NY
								</div>
							</div>
							<div className=" mt-2 flex justify-between space-x-4 border-b-2">
								<div className="w-[50%] py-1.5 px-4">
									77001
								</div>
								<div className="w-[50%] py-1.5 px-4">
									United States
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}