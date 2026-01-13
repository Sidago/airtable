"use client";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Cog, LogOut, Menu as MenuIcon, User, X } from "lucide-react";
import useMenuTree from "@/modules/navigation/hooks/useMenuTree";
import Menu from "@/components/menu/Menu";
import { useAuth } from "@/modules/signin/hooks/useAuth";
import {
  Menu as HeadlessMenu,
  MenuButton as HeadlessMenuButton,
  MenuItems as HeadlessMenuItems,
  MenuItem as HeadlessMenuItem,
  Portal,
} from "@headlessui/react";
import Avatar from "@/components/shared/Avatar";
import clsx from "clsx";
import Divider from "@/components/shared/Divider";

export default function MobileSidebar() {
  const { logout } = useAuth();
  const { menus } = useMenuTree();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed inset-x-0 top-0 z-50 bg-[#3b66a3] md:hidden px-4 py-2 flex justify-between items-center">
        <div className="px-2 py-3 text-white text-base font-semibold">
          Sidago - CRM
        </div>
        <button onClick={() => setOpen(true)}>
          <MenuIcon className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Sidebar */}
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
            <DialogPanel className="fixed inset-y-0 left-0 w-64 bg-white flex flex-col">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4">
                <span className="font-semibold">Menu</span>
                <button onClick={() => setOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Menu Area */}
              <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3">
                {menus.map((menu, idx) => (
                  <Menu
                    key={idx}
                    icon={menu.icon}
                    label={menu.label}
                    routes={menu.routes}
                    submenus={menu.submenus}
                  />
                ))}
              </div>

              {/* Sidebar Footer */}
              <div className="p-3 text-xs">
                <HeadlessMenu as="div" className="w-full">
                  <HeadlessMenuButton className="flex items-center gap-2 w-full">
                    <Avatar
                      initials="Sidago"
                      size="xs"
                      shape="rounded-full"
                      initialsClassName="text-white text-sm bg-purple-500"
                    />
                  </HeadlessMenuButton>

                  <Portal>
                    <HeadlessMenuItems
                      className={clsx(
                        "absolute z-50 w-60 rounded-md bg-white backdrop-blur-xl text-black text-xs shadow-lg focus:outline-none overflow-hidden transition-all duration-200 bottom-12 left-3"
                      )}
                    >
                      <div className="p-4">
                        <div className="flex flex-col gap-1 mb-2">
                          <p className="text-xs font-medium">Sidago</p>
                          <p className="text-xs font-medium">
                            sidago@example.com
                          </p>
                        </div>
                        <Divider />
                        <div className="flex flex-col">
                          <HeadlessMenuItem>
                            <button className="w-full text-left py-2 rounded flex items-center gap-1 cursor-pointer">
                              <User size={14} /> Profile
                            </button>
                          </HeadlessMenuItem>
                          <HeadlessMenuItem>
                            <button className="w-full text-left py-2 rounded flex items-center gap-1 cursor-pointer">
                              <Cog size={14} /> Settings
                            </button>
                          </HeadlessMenuItem>
                          <HeadlessMenuItem>
                            <button
                              className="w-full text-left py-2 rounded flex items-center gap-1 cursor-pointer"
                              onClick={() => logout.mutate()}
                            >
                              <LogOut size={14} /> Logout
                            </button>
                          </HeadlessMenuItem>
                        </div>
                      </div>
                    </HeadlessMenuItems>
                  </Portal>
                </HeadlessMenu>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}
