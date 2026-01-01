"use client";
import Avatar from "@/components/shared/Avatar";
import Dropdown from "@/components/shared/Dropdown";
import { Bell, BellRing, MessageCircle, MessagesSquare, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Footer() {
  const [expand, setExpand] = useState(false);
  const toggle = () => setExpand((p) => !p);

  useEffect(() => {
    const reset = () => setExpand(false);

    window.addEventListener("drawer:closed", reset);
    return () => window.removeEventListener("drawer:closed", reset);
  }, []);

  return (
    <div className="sticky bottom-0 z-30 bg-white border-t border-gray-200">
      {!expand && (
        <div
          className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100"
          onClick={toggle}
        >
          <div>
            <Avatar initials="M" size="xs" />
            <span className="text-xs ml-2 font-normal">Add a comment...</span>
          </div>
          <div className="flex items-center">
            <MessageCircle size={16} />{" "}
            <span className="text-xs ml-2 font-normal">No comment yet</span>
          </div>
        </div>
      )}
      {expand && (
        <div className="h-50">
          <div className="flex justify-between items-center px-20 py-5 border-b border-gray-200">
            <div>
              <Dropdown
                label="All comments"
                buttonClassName="text-gray-950 font-normal!"
                menuClassName="w-40!"
                items={[
                  { label: "All comments", value: "all" },
                  { label: "Record comments", value: "record" },
                ]}
              />
            </div>
            <div className="flex items-center">
              <div>
                <Dropdown
                  label={<Bell size={16} />}
                  buttonClassName="text-gray-950 font-normal!"
                  menuClassName="w-65!"
                  items={[
                    {
                      label: (
                        <div className="flex items-center gap-2">
                          <Bell size={16} /> Notify me only for @mentions
                        </div>
                      ),
                      value: "all",
                    },
                    {
                      label: (
                        <div className="flex items-center gap-2">
                          <BellRing size={16} /> Notify me about all comments
                        </div>
                      ),
                      value: "record",
                    },
                  ]}
                />
              </div>
              <button
                onClick={toggle}
                className="w-6 h-6 rounded flex justify-center items-center cursor-pointer hover:bg-gray-100"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 mt-10">
            <div>
              <MessagesSquare />
            </div>
            <div className="text-xs font-normal">
              <p>Start a conversation</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
