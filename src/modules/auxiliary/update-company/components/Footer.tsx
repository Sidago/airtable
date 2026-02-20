/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Avatar from "@/components/shared/Avatar";
import Dropdown from "@/components/shared/Dropdown";
import { useComments } from "@/modules/company/hooks/useComments";
import { MessageCircle, MessagesSquare, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Footer({ companyId }: { companyId: number | null }) {
  const [expand, setExpand] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [saving, setSaving] = useState(false);

  const toggle = () => setExpand((p) => !p);

  const {
    comments = [],
    addComment,
    loadingComments,
    refetch
  } = useComments(companyId || 0);

  useEffect(() => {
    const reset = () => setExpand(false);
    window.addEventListener("drawer:closed", reset);
    return () => window.removeEventListener("drawer:closed", reset);
  }, []);

  const handleSave = async () => {
    if (!newComment.trim() || !companyId) return;

    try {
      setSaving(true);
      await addComment(newComment);
      setNewComment("");
      refetch();

    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="sticky bottom-0 z-30 bg-white border-t border-gray-200">
      {/* Collapsed View */}
      {!expand && (
        <div
          className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100"
          onClick={toggle}
        >
          <div className="flex items-center">
            <Avatar initials="M" size="xs" />
            <span className="text-xs ml-2 font-normal">Add a comment...</span>
          </div>

          <div className="flex items-center">
            <MessageCircle size={16} />
            <span className="text-xs ml-2 font-normal">
              {comments.length > 0
                ? `${comments.length} comment${comments.length > 1 ? "s" : ""}`
                : "No comment yet"}
            </span>
          </div>
        </div>
      )}

      {/* Expanded View */}
      {expand && (
        <div className="flex flex-col h-80">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <Dropdown
              label="All comments"
              buttonClassName="text-gray-950 font-normal!"
              menuClassName="w-40!"
              items={[
                { label: "All comments", value: "all" },
                { label: "Record comments", value: "record" },
              ]}
            />

            <button
              onClick={toggle}
              className="w-6 h-6 rounded flex justify-center items-center hover:bg-gray-100"
            >
              <X size={16} />
            </button>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {loadingComments ? (
              <div className="text-xs text-gray-400">Loading comments...</div>
            ) : comments.length === 0 ? (
              <div className="flex flex-col justify-center items-center gap-3 mt-10 text-gray-400">
                <MessagesSquare size={24} />
                <p className="text-xs font-normal">Start a conversation</p>
              </div>
            ) : (
              comments.map((comment: any) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar initials={comment.user?.name?.[0] || "U"} size="xs" />

                  <div className="flex flex-col">
                    <div className="text-xs font-medium text-gray-800">
                      {comment.user?.name || "Unknown User"}
                    </div>
                    <div className="text-xs text-gray-600">
                      {comment.message}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1">
                      {new Date(comment.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Comment Box */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-3">
              <Avatar initials="U" size="xs" />
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <button
                  onClick={handleSave}
                  disabled={saving || !newComment.trim()}
                  className="px-3 py-2 text-xs cursor-pointer bg-black text-white rounded disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
