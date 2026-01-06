"use client";
import Image from "next/image";
import EmptyIlustration from "../../../../public/empty_illustration.svg";
import Header from "../components/Header";

export default function Content() {
  return (
    <div>
      <Header
        breadcrumbs={[
          { label: "Auxiliary Staff", active: false },
          { label: "SMS", active: true },
        ]}
      />

      {/* Empty state */}
      <div className="flex flex-1 items-center justify-center py-20">
        <div className="relative w-64 h-64">
          <Image
            src={EmptyIlustration}
            fill
            alt="Empty illustration"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
