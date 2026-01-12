import Link from "next/link";
import { SubmenuItem } from "@/types/menu";
import clsx from "clsx";
import useMenuTree from "@/modules/navigation/hooks/useMenuTree";

export default function Item({ label, href }: SubmenuItem) {
  const {activeTab} = useMenuTree();
  const active = activeTab === href;

  return (
    <div className="relative ml-3 border-l border-gray-500 py-1">
      <Link
        href={href}
        className={clsx(
          "relative ml-2 py-1 px-2 text-white text-sm font-normal rounded transition-colors block",
          "hover:bg-gray-500/40",
          active && "bg-gray-500/40"
        )}
      >
        {active && (
          <span className="absolute -left-2.25 top-0 h-full w-px bg-white rounded-full" />
        )}
        {label}
      </Link>
    </div>
  );
}
