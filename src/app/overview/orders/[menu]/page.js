"use client";

import ItemsModal from '@/app/components/AddItem/ItemsModal';
import { ConfirmationDialog } from '@/app/components/Orders/ConfirmationDialog';
import { OrdersModal } from '@/app/components/Orders/OrdersModal';
import { ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSalesOrderItem } from '../../../../../redux/delete_sales_order_item/actions';
import { fetchSalesOrderItem } from '../../../../../redux/get_sales_order_item/actions';
import { fetchMenu } from '../../../../../redux/menu/actions';

export default function MenuPage({params}) {
    const dispatch = useDispatch();
    const { menu, loading } = useSelector((state) => state.menuReducer);
    const { salesOrderItem, loading: salesOrderItemLoading } = useSelector((state) => state.getSalesOrderItemReducer);
    const { deleted, loading: deleteLoading} = useSelector((state) => state.deleteSalesOrderItemReducer);

    const [open, setOpen] = useState(false);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
    const [showDeletedDialog, setShowDeletedDialog] = useState(false)

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isReload, setIsReload] = useState(false)
    const [showSubOrders, setShowSubOrders] = useState([])
    const [deleteSalesOrderItemId, setDeleteSalesOrderItemId] = useState(null)
    const [deleteSalesOrderItemName, setDeleteSalesOrderItemName] = useState(null)

    //Add items modal
    const [openItems, setOpenItems] = useState(false)

    useEffect(() => {
        dispatch(fetchMenu(params.menu));
    }, [isReload]);

    useEffect(() => {
       if(isReload) {
            setIsReload(false)
       }
    }, [isReload]);

    const handleSubOrders = (orderId) => {
        if(showSubOrders.includes(orderId)){
            setShowSubOrders(showSubOrders.filter((id) => id !== orderId))
        } else {
            setShowSubOrders([orderId, ...showSubOrders])
        }
    }

    const handleDeleteSalesOrderItem = (salesOrderId) => {
        dispatch(deleteSalesOrderItem(salesOrderId))
        setShowDeletedDialog(true)
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
          }).then(() => {
            setShowDeletedDialog(false)

            return new Promise(resolve => {
                setTimeout(resolve, 1000);
              }).then(() => {
                setShowConfirmationDialog(false)
                return new Promise(resolve => {
                    setTimeout(resolve, 1000);
                  }).then(() => {
                    setIsReload(true)
                    return new Promise(resolve => {
                        setTimeout(resolve, 1000);
                      }).then(() => {
                        setIsReload(false)
                      });
                  });
              });
          });
    }

    return (
        <>
            <div className="container xl:w-full">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">

                    </div>
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-base font-semibold leading-6 text-gray-900">Menu</h1>
                                <p className="mt-2 text-sm text-gray-700">
                                    A list of all the items in your order including their name quantity, price, etc.
                                </p>
                            </div>
                            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                {/* <Link
                                  href={`/overview/orders/${params.menu}/items`}
                                    className="block rounded-md bg-yellow-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                                >
                                    Add Item
                                </Link> */}
                                 <button
                                    type="button"
                                    className="block rounded-md bg-yellow-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                                    onClick={() => {
                                        setOpenItems(true)
                                    }}
                                >
                                    Add sales item
                                </button>
                            </div>
                        </div>
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                    Item Name
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Quantity
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Price
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {
                                                !loading ?
                                                    menu?.data?.map((item, index) => (
                                                        
                                                       item != undefined && item.itemData != undefined &&
                                                       <>
                                                       <tr 
                                                           key={index} 
                                                       >
                                                           <td 
                                                               className={`${item.itemData["is configuration"] == 1 && "cursor-pointer hover:text-yellow-700"} whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0 flex justify-between w-[50%]`}
                                                               onClick={()=> {
                                                                   handleSubOrders(item["__id"])
                                                               }} 
                                                           >
                                                               <span>
                                                                   {item.itemData.name}
                                                               </span>
                                                               {
                                                                   item.itemData["is configuration"] === 1 &&
                                                                   <ChevronDownIcon className='h-6 w-6'/>
                                                               }
                                                               
                                                           </td>
                                                           <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                                {
                                                                    item["is quantity hidden"] != 1 && `${item.quantity || '0'}`
                                                                }
                                                           </td>
                                                           <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                                {
                                                                    item["is price hidden"] != 1 && `$ ${item.price || '0'}.00`
                                                                }
                                                            </td>
                                                           
                                                           { item.itemData["is configuration"] === 1 ? (
                                                               <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 ">
                                                                       <button 
                                                                           className='cursor-pointer hover:text-yellow-700' 
                                                                           onClick={() => {
                                                                               setOpen(true)
                                                                               setSelectedIndex(item["__id"])
                                                                           }}
                                                                           type="button"
                                                                       >
                                                                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                           <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                                                                       </svg>
                                                                   </button>
                                                               </td>
                                                               )
                                                           : <></>
                                                           }
                                                           <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 ">
                                                               <TrashIcon 
                                                                    onClick={()=> {
                                                                        setShowConfirmationDialog(true)
                                                                        setDeleteSalesOrderItemId(item["__id"])
                                                                        setDeleteSalesOrderItemName(item.itemData.name)
                                                                        dispatch(fetchSalesOrderItem(item["__id"]))
                                                                        
                                                                    }} 
                                                                    className='w-6 h-6 text-red-500 cursor-pointer'
                                                                />
                                                           </td>
                                                       </tr>
                                                       {   
                                                           showSubOrders.includes(item["__id"]) ?
                                                               item.subOrders && item.subOrders.length != 0 &&
                                                                   item.subOrders.map((subitem) => {
                                                                       return (
                                                                           <>
                                                                           <tr 
                                                                               key={subitem["__id"]}
                                                                           >
                                                                               <td 
                                                                                   className={`${subitem.itemData["is configuration"] == 1 && "cursor-pointer hover:text-yellow-700"} whitespace-nowrap py-4 pr-3 text-sm font-medium pl-6 flex justify-between w-[50%]`}
                                                                                   onClick={()=> {
                                                                                       handleSubOrders(subitem["__id"])
                                                                                   }}
                                                                               >
                                                                                   <span>
                                                                                       {subitem.itemData.name}
                                                                                   </span>
                                                                                   {
                                                                                       subitem.itemData["is configuration"] === 1 &&
                                                                                       <ChevronDownIcon className='h-6 w-6'/>
                                                                                   }
                                                                               </td>
                                                                               <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                                                {
                                                                                    subitem["is quantity hidden"] != 1 && `${subitem.quantity || ''}`
                                                                                }
                                                                                                        
                                                                               
                                                                                </td>
                                                                               <td className="whitespace-nowrap px-3 py-4 text-sm"> ${subitem.price}.00</td>
                                                                               <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                                                   {subitem.itemData["is configuration"] === 1 && (
                                                                                       <a  className='cursor-pointer hover:text-yellow-700' onClick={() => handleClick(subitem["__id"])}>
                                                                                       {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                                           <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                                                                                       </svg> */}
                                                                                       <OrdersModal key={subitem?.itemData["__id"]} item={subitem.itemData["is configuration"] === 1 && subitem} open={open && selectedIndex == subitem["__id"]} setOpen={setOpen} index={selectedIndex} setIsReload={setIsReload}/>
                                                                                       
                                                                                   </a>
                                                                                   )}
                                                                               </td>
                                                                           </tr>
                                                                               {
                                                                                   showSubOrders.includes(subitem["__id"]) ?
                                                                                       subitem.subOrders && subitem.subOrders.length != 0 &&
                                                                                           subitem.subOrders.map((subitemOrder) => {
                                                                                            
                                                                                               return (
                                                                                                   <tr 
                                                                                                       key={subitemOrder["__id"]}
                                                                                                   >
                                                                                                        <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium pl-12 w-[50%]">{subitemOrder.itemData.name}</td>
                                                                                                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                                                                        {
                                                                                                            subitemOrder["is quantity hidden"] != 1 && `${subitemOrder.quantity || '0'}`
                                                                                                        }
                                                                                                        
                                                                                                        </td>
                                                                                                        <td className="whitespace-nowrap px-3 py-4 text-sm"> 
                                                                                                    
                                                                                                        {
                                                                                                            subitemOrder["is price hidden"] !== 1 && `$ ${subitemOrder.price || '0'}.00`
                                                                                                        }
                                                                                                    
                                                                                                        </td>
                                                                                                       
                                                                                                   </tr>
                                                                                               )
                                                                                           })
                                                                                   : ""
                                                                               }
                                                                           </>
                                                                           
                                                                       )
                                                                   })
                                                           : ""
                                                       }
                                                       </>
                                                    ))
                                                    :
                                                    <>
                                                        <tr 
                                                        >
                                                            <td 
                                                                className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0 text-center`}
                                                                colSpan={4}
                                                            >
                                                               Loading ...
                                                            </td>
                                                        </tr>
                                                    </>
                                            }
                                        </tbody>
                                    </table>
                                  <div>
                                  {
                                        open &&

                                        <OrdersModal key={selectedIndex} item={menu?.data?.filter(el => el["__id"] == selectedIndex)[0]} open={open && selectedIndex !== null} setOpen={setOpen} index={selectedIndex} setIsReload={setIsReload}/>
                                    }
                                    {
                                        showConfirmationDialog &&
                                            !salesOrderItemLoading ? 
                                            <>
                                             <ConfirmationDialog 
                                                key={deleteSalesOrderItemId}
                                                id={deleteSalesOrderItemId}
                                                open={showConfirmationDialog} 
                                                setOpen={setShowConfirmationDialog}  
                                                title={deleteSalesOrderItemName} 
                                                handleDeleteSalesOrderItem={handleDeleteSalesOrderItem}
                                                action="delete"
                                            />
                                            </>
                                            : 
                                            <>
                                            <ConfirmationDialog 
                                                key={deleteSalesOrderItemId}
                                                id={deleteSalesOrderItemId}
                                                open={showConfirmationDialog} 
                                                setOpen={setShowConfirmationDialog}  
                                                title={"Loading ..."} 
                                                handleDeleteSalesOrderItem={handleDeleteSalesOrderItem}
                                                action="loading"
                                            />
                                            </>
                                    }
                                    {
                                        showDeletedDialog &&
                                        <ConfirmationDialog 
                                            key={deleteSalesOrderItemId}
                                            id={deleteSalesOrderItemId}
                                            open={showConfirmationDialog} 
                                            setOpen={setShowConfirmationDialog}  
                                            title={"Deleted!"} 
                                            handleDeleteSalesOrderItem={handleDeleteSalesOrderItem}
                                            action="loading"
                                        />

                                    }

                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/* Add Items */}
            <ItemsModal openItems={openItems} setOpenItems={setOpenItems} params={params.menu} setIsReload={setIsReload} /> 
            </div>


        </>
    );
}