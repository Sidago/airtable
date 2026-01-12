"use client";

import { useState, useEffect } from "react";
import { ChevronsLeft, Cog, LogOut, Table, User } from "lucide-react";
import clsx from "clsx";
import Avatar from "@/components/shared/Avatar";
import Menu from "@/components/menu/Menu";
import { useAuthStore } from "@/modules/signin/store/auth.store";
import useMenuTree from "@/modules/navigation/hooks/useMenuTree";
import {
  Menu as HeadlessMenu,
  MenuButton as HeadlessMenuButton,
  MenuItems as HeadlessMenuItems,
  MenuItem as HeadlessMenuItem,
  Portal,
} from "@headlessui/react";
import Divider from "@/components/shared/Divider";
import { useAuth } from "@/modules/signin/hooks/useAuth";

export default function Sidebar() {
  const { logout } = useAuth();
  const { menus } = useMenuTree();
  const user = useAuthStore((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  useEffect(() => {
    if (collapsed) {
      document.dispatchEvent(new Event("click"));
    }
  }, [collapsed]);


  return (
    <aside
      className={clsx(
        "hidden md:flex flex-col h-full bg-[#3b66a3] transition-[width] duration-300 ease-in-out overflow-hidden",
        collapsed ? "w-16" : "w-68"
      )}
    >
      {/* Top Branding */}
      {collapsed ? (
        <div className="px-4 py-5 flex justify-center items-center text-white">
          <Table size={16} />
        </div>
      ) : (
        <div className="px-4 py-5 text-white text-base font-semibold">
          Sidago - CRM
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-custom px-4 space-y-1">
        {menus.map((menu, idx) => (
          <Menu
            key={idx}
            icon={menu.icon}
            label={menu.label}
            routes={menu.routes}
            submenus={menu.submenus}
            collapsed={collapsed}
            toggleCollapsed={toggleCollapsed}
          />
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-white/10 p-3 bg-white/10">
        <div
          className={clsx(
            "flex items-center gap-3 transition-all duration-200",
            collapsed
              ? "flex-col-reverse justify-center"
              : "flex-row justify-between"
          )}
        >
          {/* Profile Menu */}
          <HeadlessMenu as="div" className="relative">
            <HeadlessMenuButton title={collapsed ? "Sidago" : ""}>
              <Avatar
                initials="Sidago"
                size="xs"
                shape="rounded-full"
                initialsClassName="text-white text-sm bg-purple-500"
                className="cursor-pointer"
              />
            </HeadlessMenuButton>

            <Portal>
              <HeadlessMenuItems
                className={clsx(
                  "absolute z-50 w-60 rounded-md bg-white backdrop-blur-xl text-black text-xs shadow-lg focus:outline-none overflow-hidden transition-all duration-200",
                  collapsed
                    ? `bottom-12 left-5 origin-left` // Show outside collapsed sidebar
                    : "bottom-12 left-5 origin-top-left"
                )}
              >
                <div className="p-4">
                  <div className="flex flex-col gap-1 mb-2">
                    <p className="text-xs font-medium">Sidago</p>
                    <p className="text-xs font-medium">sidago@example.com</p>
                  </div>
                  <Divider />
                  <div className="flex flex-col">
                    <HeadlessMenuItem>
                      {({ active }) => (
                        <button className="w-full text-left py-2 rounded flex items-center gap-1 cursor-pointer">
                          <User size={14} />
                          Profile
                        </button>
                      )}
                    </HeadlessMenuItem>

                    <HeadlessMenuItem>
                      {({ active }) => (
                        <button className="w-full text-left py-2 rounded flex items-center gap-1 cursor-pointer">
                          <Cog size={14} />
                          Settings
                        </button>
                      )}
                    </HeadlessMenuItem>

                    <HeadlessMenuItem>
                      {({ active }) => (
                        <button
                          className="w-full text-left py-2 rounded flex items-center gap-1 cursor-pointer"
                          onClick={() => logout.mutate()}
                        >
                          <LogOut size={14} />
                          Logout
                        </button>
                      )}
                    </HeadlessMenuItem>
                  </div>
                </div>
              </HeadlessMenuItems>
            </Portal>
          </HeadlessMenu>

          {/* Collapse Button */}
          <button
            onClick={toggleCollapsed}
            className="text-white text-xs font-normal rounded-md w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-[#3b66a3]/50"
          >
            <ChevronsLeft
              size={16}
              className={clsx(
                "transition-transform",
                collapsed && "rotate-180"
              )}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}
