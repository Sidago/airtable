"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "@/modules/signin/store/auth.store";
import { CommentService } from "../services/comment.service";

export interface CommentAPI {
  id: number;
  message: string;
  created_at: string;
  user?: {
    name: string;
  };
}

interface UseCommentsReturn {
  comments: CommentAPI[];
  addComment: (message: string) => Promise<void>;
  loadingComments: boolean;
  error: unknown;
  refetch: () => Promise<void>;
}

export const useComments = (companyId: number): UseCommentsReturn => {
  const token = useAuthStore((s) => s.tokens?.access_token);

  const [comments, setComments] = useState<CommentAPI[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [error, setError] = useState<unknown>(null);

  /**
   * 🔥 Reset immediately when companyId changes
   */
  useEffect(() => {
    setComments([]);
    setError(null);
  }, [companyId]);

  /**
   * Fetch comments
   */
  const fetchComments = useCallback(async () => {
    if (!companyId || !token) return;

    try {
      setLoadingComments(true);
      setError(null);

      const response = await CommentService.getComments(companyId, token);

      const data: CommentAPI[] = Array.isArray(response)
        ? response
        : response?.data ?? [];

      setComments(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoadingComments(false);
    }
  }, [companyId, token]);

  /**
   * Add comment
   */
  const addComment = useCallback(
    async (message: string) => {
      if (!message.trim()) return;
      if (!companyId || !token) return;

      const optimisticId = Date.now();

      const optimisticComment: CommentAPI = {
        id: optimisticId,
        message,
        created_at: new Date().toISOString(),
        user: { name: "You" },
      };

      try {
        setComments((prev) => [optimisticComment, ...prev]);

        const response = await CommentService.addComment(
          companyId,
          { message },
          token
        );

        const savedComment: CommentAPI =
          response?.data ?? response;

        setComments((prev) => [
          savedComment,
          ...prev.filter((c) => c.id !== optimisticId),
        ]);
      } catch (err) {
        setError(err);

        setComments((prev) =>
          prev.filter((c) => c.id !== optimisticId)
        );
      }
    },
    [companyId, token]
  );

  /**
   * Auto fetch
   */
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return {
    comments,
    addComment,
    loadingComments,
    error,
    refetch: fetchComments,
  };
};