"use client";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Menu, X } from "lucide-react";
import Dropdown from "@/components/shared/Dropdown";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed inset-x-0 top-0 z-50 bg-[#3b66a3] md:hidden px-4 py-2 flex justify-between items-center">
        <div className="w-2/3">
          <Dropdown
            label="Sidago - CRM"
            buttonClassName="text-white bg-transparent"
            items={[]}
          />
        </div>
        <button onClick={() => setOpen(true)}>
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>

      <Transition show={open} as={Fragment}>
        <Dialog onClose={setOpen} className="relative z-50 md:hidden">
          {/* Overlay */}
          <TransitionChild
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </TransitionChild>

          {/* Sidebar Panel */}
          <TransitionChild
            enter="transition-transform duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform duration-300"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel className="fixed inset-y-0 left-0 w-64 bg-white p-4">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mt-16 space-y-3">
                <button className="block w-full text-left">Dashboard</button>
                <button className="block w-full text-left">Settings</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}
