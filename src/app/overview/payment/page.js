"use client"

import { useState, Suspense } from 'react';
import { lazy } from 'react';
import PaymentLoading from '@/app/components/payment/payment_loading';
import { PencilSquareIcon, CheckIcon } from '@heroicons/react/24/outline';

const PaymentForm = lazy(() => delayForDemo(import('@/app/components/payment/payment_details_form')));
const PaymentDetails = lazy(() => delayForDemo(import('@/app/components/payment/payment_details')));

export default function Payment() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [nameOnCard, setNameOnCard] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardDate, setCardDate] = useState("");
    const [cardCVV, setCardCVV] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [billingCity, setBillingCity] = useState("");
    const [billingState, setBillingState] = useState("");
    const [billingZip, setBillingZip] = useState("");
    const [billingCountry, setBillingCountry] = useState("");

    return (
        <>
            <div className="grid min-h-full grid-cols-1 grid-rows-[1fr,auto,1fr] bg-white lg:grid-cols-[max(50%,36rem),1fr] p-[5%]">
                <main className="mx-auto w-full max-w-7xl px-6  lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
                    <div className="max-w-lg">
                        <div className=''>
                            <h2 className="text-3xl font-semibold leading-10 text-gray-900">Payment details</h2>
                            <button
                                type="button"
                                className="px-3 py-2 text-sm font-semibold text-white"
                                onClick={()=> {
                                    setIsOpen(!isOpen)
                                }}
                            >
                                {
                                    isOpen ? 
                                    <CheckIcon className='w-8 h-8 text-gray-500 hover:text-yellow-600'/>
                                    :
                                    <PencilSquareIcon className='w-8 h-8 text-gray-500 hover:text-yellow-600'/>

                                }
                            </button>
                        </div>
                        {
                            isOpen ?
                            <Suspense fallback={<PaymentLoading />}>
                                <PaymentForm />
                            </Suspense>
                            :
                            <Suspense fallback={<PaymentLoading />}>
                                <PaymentDetails />
                            </Suspense>
                        }
                       
                    </div>
                </main>
            </div>
        </>
    )
}

function delayForDemo(promise) {
    return new Promise(resolve => {
      setTimeout(resolve, 2000);
    }).then(() => promise);
  }
