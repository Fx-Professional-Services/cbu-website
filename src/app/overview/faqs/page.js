
"use client";

import { useDispatch, useSelector } from 'react-redux';
import { fetchFaqs } from '../../../../redux/faqs/actions';
import { useEffect } from 'react';

const faqsTest = [
    {
        question: 'I would like to provide meals for my vendors. What kind of meal will my vendors be served?',
        answer: 'Your vendors will receive the same meal as your guests at hal price (plus service charge and tax).',
    },
    {
        question: 'Should I include my vendors in my seating arrangement?',
        answer: 'Please do not include your vendors in your seating arrangement. After all of your guests have been served, we will serve your vendors in a private area so that they can eat, recharge, and prepare to work the remaining portion of the your reception.',
    },
    {
        question: 'What kind of meal will children be served?',
        answer: 'We will serve children a meal of chicken tenders, mac-n-cheese, corn on the cob, and applesauce.',
    },
    {
        question: 'When is the final day to make changes or subtitutions?',
        answer: 'All the menu selections must be submitted to your Planning Executive 60 days prior to your event date, and any changes to your menu must be submitted to your Planning Executive 15 days prior to your event date.',
    },
    {
        question: 'I have guests with dietary restrictions and/ or allergies. Can you provide any meal alternatives?',
        answer: "Yes, we can certainly accomodate special meal requests. Please indicate your special meal requests on the 'Seating' page and we will make the necessary arrangements.",
    },
    // More questions...
]

export default function FaqPage() {
    const { faqs, loading } = useSelector((state) => state.faqsReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFaqs());
    }, [dispatch]);

    return (
        // <div className="bg-white">
        //     <div className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40">
        //         <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        //             <div className="lg:col-span-5">
        //                 <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
        //                 <p className="mt-4 text-base leading-7 text-gray-600">
        //                     Can’t find the answer you’re looking for? Reach out to our{' '}
        //                     <a href="#" className="font-semibold text-yellow-600 hover:text-yellow-500">
        //                         customer support
        //                     </a>{' '}
        //                     team.
        //                 </p>
        //             </div>
        //             <div className="mt-10 lg:col-span-7 lg:mt-0">
        //                 <dl className="space-y-10">
        //                     {faqs.map((faq) => (
        //                         <div key={faq.question}>
        //                             <dt className="text-base font-semibold leading-7 text-gray-900">{faq.question}</dt>
        //                             <dd className="mt-2 text-base leading-7 text-gray-600">{faq.answer}</dd>
        //                         </div>
        //                     ))}
        //                 </dl>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-1 py-16 sm:py-24 lg:px-8">
                <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600">
                    Have a different question and can’t find the answer you’re looking for? Reach out to our support team by{' '}
                    <a href="#" className="font-semibold text-yellow-500 hover:text-yellow-300">
                        sending us an email
                    </a>{' '}
                    and we’ll get back to you as soon as we can.
                </p>
                <div className="py-5">
                    <hr />
                </div>
                <div className="mt-20">
                    <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-2 lg:gap-x-8">
                        {faqs.map((faq) => (
                            <div key={faq.question}>
                                <dt className="text-base font-semibold leading-7 text-gray-900 cbu-accent-text">{faq.question}</dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">{faq.answer}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}