"use client";
import Badge from "@/components/shared/Badge";
import ContactCard from "@/components/ui/contact-card/ContactCard";
import InfoRow from "@/components/ui/InfoRow";
import InvalidAction from "@/components/ui/InvalidAction";
import CommonDrawer from "@/helpers/CommonDrawer";
import Heading from "@/modules/calllog/components/Heading";
import Sidebar from "@/modules/calllog/components/sidebar/Sidebar";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function Content() {
  const [drawer, setDrawer] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    setIsScrolled(scrollTop > 10);
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-full">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Sticky Heading */}
          <Heading />

          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto mb-10 md:mb-0">
            {/* your page content here */}
            <div className="p-10 space-y-10">
              {/* first row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
                <InfoRow
                  label="Lead Type"
                  value={
                    <div className="bg-amber-200 rounded px-2 py-1 w-fit">
                      General
                    </div>
                  }
                  direction="column"
                />

                <InfoRow
                  label="Full Name"
                  value="Mr. Christopher Kraus"
                  direction="column"
                />

                <InfoRow
                  label="Company Name"
                  value="Freshpet Inc."
                  direction="column"
                />

                <InfoRow
                  label="Role"
                  value="Chief Information Officer"
                  direction="column"
                />

                <InfoRow
                  label="Phone"
                  value={
                    <Link
                      href="tel:+16318359319"
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <span>+1 (631) 835-9319</span>
                      <ExternalLink size={14} className="opacity-70" />
                    </Link>
                  }
                  direction="column"
                />

                <InfoRow
                  label="Email"
                  value={
                    <div className="flex flex-col space-y-1">
                      <Link
                        href="mailto:christopher.kraus@example.com"
                        className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        <span>christopher.kraus@example.com</span>
                        <ExternalLink size={14} className="opacity-70" />
                      </Link>
                      <Link
                        href="mailto:christopher.kraus@example.com"
                        className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        <span>christopher.kraus@example.com</span>
                        <ExternalLink size={14} className="opacity-70" />
                      </Link>
                    </div>
                  }
                  direction="column"
                />

                <InfoRow
                  label="Contact Type"
                  value={
                    <div className="bg-amber-200 rounded px-2 py-1 w-fit">
                      Prospecting
                    </div>
                  }
                  direction="column"
                />
              </div>
              {/* second row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
                <InfoRow label="Notes" value="-" direction="column" />

                <InfoRow label="Call Back Date" value="-" direction="column" />

                <InfoRow
                  label="Last Called Date"
                  value="-"
                  direction="column"
                />
              </div>
              {/* third row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
                {NOACTIONBUTTONS.map((item, idx) => (
                  <InvalidAction key={idx} label={item} />
                ))}
              </div>
              {/* forth row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
                <InfoRow label="Notes History" value="-" direction="column" />

                <InfoRow label="Calls History" value="-" direction="column" />

                <InfoRow label="Last Fixed Date" value="-" direction="column" />

                <InfoRow
                  label="Other Contacts"
                  value={
                    <div className="flex flex-col space-y-1">
                      <Link
                        href="tel:+(908) 763-5877"
                        className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        <span>+ (908) 763-5877</span>
                        <ExternalLink size={14} className="opacity-70" />
                      </Link>
                      <Link
                        href="tel:+(908) 763-5877"
                        className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        <span>+ (908) 763-5877</span>
                        <ExternalLink size={14} className="opacity-70" />
                      </Link>
                      <Link
                        href="tel:+(908) 763-5877"
                        className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        <span>+ (908) 763-5877</span>
                        <ExternalLink size={14} className="opacity-70" />
                      </Link>
                      <Link
                        href="tel:+(908) 763-5877"
                        className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        <span>+ (908) 763-5877</span>
                        <ExternalLink size={14} className="opacity-70" />
                      </Link>
                    </div>
                  }
                  direction="column"
                />
              </div>
              <div>
                <div className="font-semibold text-xs">
                  <span className="text-red-500 mr-1">*</span>
                  <span>
                    This person {`doesn't`} work anymore in this company
                  </span>
                </div>
                <div>
                  <input type="checkbox" />
                </div>
              </div>
              <div>
                <p className="py-2 text-xs font-semibold">
                  All Company Contacts
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
                  {CARDS.map((card, idx) => (
                    <ContactCard
                      onClick={() => setDrawer(true)}
                      key={idx}
                      {...card}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="py-2 text-xs font-semibold">
                  Additional Contacts
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
                  {CARDS.map((card, idx) => (
                    <ContactCard key={idx} {...card} />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <CommonDrawer
        isOpen={drawer}
        onClose={() => setDrawer(false)}
        isScrolled={isScrolled}
        onScroll={handleScroll}
      />
    </div>
  );
}

const NOACTIONBUTTONS = [
  "No Answer",
  "Interested",
  "Bad Number",
  "Not Interested",
  "Left Message",
  "Call Lead Back",
  "DNC",
];

const CARDS = [
  {
    label: "NASDAQ : SMSI - William Smith",
    rows: [
      {
        label: "Contact Type",
        value: (
          <Badge>
            <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-2xl">
              Prospecting
            </span>
          </Badge>
        ),
      },
      {
        label: "Lead Type",
        value: (
          <Badge>
            <span className="bg-amber-200 text-xs px-2 py-0.5 rounded-2xl">
              General
            </span>
          </Badge>
        ),
      },
    ],
  },
  {
    label: "NASDAQ : SMSI - William Smith",
    rows: [
      {
        label: "Contact Type",
        value: (
          <Badge>
            <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-2xl">
              Prospecting
            </span>
          </Badge>
        ),
      },
      {
        label: "Lead Type",
        value: (
          <Badge>
            <span className="bg-amber-200 text-xs px-2 py-0.5 rounded-2xl">
              General
            </span>
          </Badge>
        ),
      },
    ],
  },
];
