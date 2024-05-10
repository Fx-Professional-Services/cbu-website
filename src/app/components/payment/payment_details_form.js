
export default function PaymentForm() {
	return (
	<form>
		<div className="space-y-12">
			<div className="pb-12">
				<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
					<div className="sm:col-span-full">
						<label htmlFor="nameOnCard" className="block text-sm font-medium leading-6 text-gray-900">
							Name on card
						</label>
						<div className="mt-2">
							<div className="w-[100%] rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-600">
								<input
									type="text"
									name="nameOnCard"
									id="nameOnCard"
									autoComplete="nameOnCard"
									className="block border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									placeholder="Jane Smith"
								/>
							</div>
							
						</div>
					</div>

					{/* card details */}
					<div className="col-span-full">
						<label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
							Card details
						</label>
						<div className="mt-2">
							<div className="w-[100%] flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-600">
							
								<input
									type="text"
									name="cardNumber"
									id="cardNumber"
									autoComplete="cardNumber"
									className="w-[50%] block border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									placeholder="1234-1234-1234-1234"
								/>
								<input
									type="text"
									name="cardDate"
									id="cardDate"
									autoComplete="cardDate"
									className="w-[25%] block border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									placeholder="MM/YY"
								/>

								<input
									type="text"
									name="cardCVV"
									id="cardCVV"
									autoComplete="cardCVV"
									className="w-[25%] block border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									placeholder="CVV"
								/>

							</div>
						</div>
					</div>

					<div className="col-span-full">
						<label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
							Billing address (optional)
						</label>
						<div className="mt-2">
							<div className="w-[100%] rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-600">
							
								<input
									type="text"
									name="billingAddress"
									id="billingAddress"
									autoComplete="billingAddress"
									className="w-[100%] block border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									placeholder="Address"
								/>

							</div>
						</div>

						<div className=" mt-2 flex justify-between space-x-4">
							<div className="w-[100%] flex-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-600">
							
								<input
									type="text"
									name="billingCity"
									id="billingCity"
									autoComplete="billingCity"
									className="block border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									placeholder="City"
								/>

							</div>
							<div className="w-[100%] flex-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-600">
							
								<input
									type="text"
									name="billingCity"
									id="billingCity"
									autoComplete="billingCity"
									className="block border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									placeholder="State"
								/>

							</div>
						</div>
						<div className=" mt-2 flex justify-between space-x-4">
							<div className="w-[100%] flex-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-600">
							
								<input
									type="text"
									name="billingZip"
									id="billingZip"
									autoComplete="billingZip"
									className="block border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									placeholder="Zip"
								/>

							</div>
							<div className="w-[100%] flex-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-600">

								<select
								id="country"
								name="country"
								autoComplete="country-name"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:max-w-xs sm:text-sm sm:leading-6"
								>
								<option>United States</option>
								<option>Canada</option>
								<option>Mexico</option>
								</select>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
	)
}