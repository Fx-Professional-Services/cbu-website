
import { Dialog } from '@headlessui/react'

export default function ConfirmationModal ({open, setOpen, dialogBackdropClassname, children }){

  return (
	<>
    <Dialog open={open} onClose={setOpen} className="relative">
      <Dialog.Backdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className={`${dialogBackdropClassname} flex min-h-full items-center justify-center p-4 ml-4 text-center sm:items-start sm:p-0`}>
          <Dialog.Panel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            {children}
           </Dialog.Panel>
          </div>
        </div>
      </Dialog>
	</>
  )
}