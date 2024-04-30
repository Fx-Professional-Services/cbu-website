export default function PaymentLoading () {
	return(
		<>
		<div class=" w-full">
			<div class="animate-pulse space-x-4">
				
				<div className="mt-10">
					<div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6 mb-8">
						<div className="sm:col-span-full">

							<label htmlFor="nameOnCard" className="block text-sm font-medium leading-6 text-gray-900">
								Name on card
							</label>

							<div class="h-2 bg-slate-700 rounded mt-2">
							</div>
							<div class="h-2 bg-slate-700 rounded mt-2">
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6 mb-8">
						<div className="sm:col-span-full">

							<label htmlFor="nameOnCard" className="block text-sm font-medium leading-6 text-gray-900">
								Card details
							</label>

							<div class="h-2 bg-slate-700 rounded mt-2">
							</div>
							<div class="h-2 bg-slate-700 rounded mt-2">
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
							<div className="sm:col-span-full">

								<label htmlFor="nameOnCard" className="block text-sm font-medium leading-6 text-gray-900">
									Billing address (optional)
								</label>

								<div class="h-2 bg-slate-700 rounded mt-2 mb-3">
								</div>
								<div class="h-2 bg-slate-700 rounded mt-2 mb-3">
								</div>
								<div class="flex-1 space-y-6 py-1">
									<div class="space-y-3">
										<div class="grid grid-cols-3 gap-4">
										<div class="h-2 bg-slate-700 rounded col-span-2"></div>
										<div class="h-2 bg-slate-700 rounded col-span-1"></div>
										</div>
										<div class="grid grid-cols-3 gap-4">
										<div class="h-2 bg-slate-700 rounded col-span-2"></div>
										<div class="h-2 bg-slate-700 rounded col-span-1"></div>
										</div>
										<div class="grid grid-cols-3 gap-4">
										<div class="h-2 bg-slate-700 rounded col-span-2"></div>
										<div class="h-2 bg-slate-700 rounded col-span-1"></div>
										</div>
										<div class="grid grid-cols-3 gap-4">
										<div class="h-2 bg-slate-700 rounded col-span-2"></div>
										<div class="h-2 bg-slate-700 rounded col-span-1"></div>
										</div>
										
									</div>
								</div>
							</div>
					</div>

				</div>
			</div>
		</div>
		
		</>
	)
}