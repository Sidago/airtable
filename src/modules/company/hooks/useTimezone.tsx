/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { CompanyService } from "../services/company.service";
import { useAuthStore } from "@/modules/signin/store/auth.store";

export interface DropdownOption {
  label: string;
  value: string ;
}

interface UseTimezoneReturn {
  options: DropdownOption[];
  loading: boolean;
  error: unknown;
  refetch: () => Promise<void>;
}

export const useTimezone = (): UseTimezoneReturn => {
  // ✅ Get token directly from store
  const token = useAuthStore((s) => s.tokens?.access_token);

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  const fetchTimezones = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const response = await CompanyService.timezones(token);

      setData(response?.data || response || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchTimezones();
    }
  }, [fetchTimezones, token]);

  // ✅ Memoized dropdown options
  const options = useMemo<DropdownOption[]>(() => {
    return data.map((item: any) => ({
      label: item.label,
      value: String(item.id),
    }));
  }, [data]);

  // ✅ Stable return reference
  return useMemo(
    () => ({
      options,
      loading,
      error,
      refetch: fetchTimezones,
    }),
    [options, loading, error, fetchTimezones]
  );
};
