"use client";
import InfoRow from "@/components/ui/InfoRow";
import Header from "@/components/ui/contact-drawer/Header";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import InvalidAction from "@/components/ui/InvalidAction";
import Footer from "@/components/ui/contact-drawer/Footer";
import React from "react";
import dynamic from "next/dynamic";
const Drawer = dynamic(() => import("@/components/shared/Drawer"), {
  ssr: false,
});

interface CommonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isScrolled: boolean;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

export default function CommonDrawer({
  isOpen,
  onClose,
  isScrolled,
  onScroll,
}: CommonDrawerProps) {
  return (
    <div>
      <Drawer width="w-2xl" height="h-full" isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col h-full">
          <Header
            scrolled={isScrolled}
            label="NASDAQ : FRPT - Mr. Scott James Morris"
            onClose={onClose}
          />
          <div
            className="flex-1 overflow-y-auto"
            onScroll={onScroll}
          >
            <section className="p-10 space-y-10">
              <p className="text-xl font-semibold">
                NASDAQ : FRPT - Mr. Scott James Morris
              </p>
              {/* first row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
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
                  label="Time Zone"
                  value={
                    <div className="bg-blue-200 rounded px-2 py-1 w-fit">
                      1 - EST
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
              {/*second row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
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
              </div>
              {/* third row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                <InfoRow label="Notes" value="-" direction="column" />

                <InfoRow label="Call Back Date" value="-" direction="column" />

                <InfoRow
                  label="Last Called Date"
                  value="-"
                  direction="column"
                />
              </div>
              {/* fourth row */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-stretch">
                <InfoRow
                  label=""
                  value={
                    <div className="font-semibold">
                      <span className="text-red-500 mr-1">*</span>
                      <span>
                        This person {`doesn't`} work anymore in this company
                      </span>
                    </div>
                  }
                  direction="column"
                />
              </div>
              {/* fifth row */}
              <div>
                <p className="text-sm font-semibold mb-5">History</p>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-stretch">
                  <InfoRow
                    className="justify-start items-start"
                    label="History Calls"
                    value={
                      <div className="flex flex-col space-y-1">
                        <p>12/01/2025 - MARIZ CABIDO - No Answer</p>
                        <p>12/31/2025 - MARIZ CABIDO - No Answer</p>
                      </div>
                    }
                  />
                  <InfoRow
                    className="justify-start items-start"
                    label="History Notes"
                    value={
                      <div className="flex flex-col space-y-1">
                        <p>11/24/2025 - Lead Manual Validated - Chris Moore</p>
                      </div>
                    }
                  />
                </div>
              </div>
              {/* sixth row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                {NOACTIONBUTTONS.map((item, idx) => (
                  <InvalidAction key={idx} label={item} />
                ))}
              </div>
              {/* seventh row */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-stretch">
                <InfoRow
                  className="justify-start items-start gap-4"
                  label="Additional Contacts"
                  value="-"
                />
              </div>
            </section>
          </div>
          <Footer />
        </div>
      </Drawer>
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
