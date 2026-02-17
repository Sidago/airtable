/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { leadService } from "../services/lead.service";
import { useAuthStore } from "@/modules/signin/store/auth.store";

export interface DropdownOption {
  label: string;
  value: string;
}

interface UseLeadTypeReturn {
  options: DropdownOption[];
  loading: boolean;
  error: unknown;
  refetch: () => Promise<void>;
}

export const useLeadType = (): UseLeadTypeReturn => {
  // ✅ Get token from global store
  const token = useAuthStore((s) => s.tokens?.access_token);

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  const fetchLeadTypes = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const response = await leadService.leadTypeList(token);

      setData(response?.data || response || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchLeadTypes();
    }
  }, [fetchLeadTypes, token]);

  // ✅ Memoized dropdown options
  const options = useMemo<DropdownOption[]>(() => {
    return data.map((item: any) => ({
      label: item.label,
      value: item.id,
    }));
  }, [data]);

  // ✅ Stable return object
  return useMemo(
    () => ({
      options,
      loading,
      error,
      refetch: fetchLeadTypes,
    }),
    [options, loading, error, fetchLeadTypes]
  );
};
