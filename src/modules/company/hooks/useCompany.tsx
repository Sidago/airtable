/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback, ReactNode } from "react";
import { CompanyService } from "../services/company.service";
import { useAuthStore } from "@/modules/signin/store/auth.store";

export interface CompanyAPI {
  id: number;
  name: string;
  symbol: string;
  timezone: string;
  timezone_id: string;
  country: string;
  state: string;
  city: string;
  previous_company_name: string | null;
  previous_company_symbol: string | null;
  histories: string[];
}

export interface CompanyRow {
  id: number;
  company_name: string;
  company_symbol: ReactNode;
  previous_company_symbol: ReactNode;
  previous_company_name: string | null;
  history_log: ReactNode;
  timezone: ReactNode;
}

interface UseCompanyReturn {
  companies: CompanyAPI[];
  selectedCompany: CompanyRow | null;
  setSelectedCompany: (company: CompanyRow | null) => void;
  loading: boolean;
  error: unknown;
  refetch: () => Promise<void>;
}

export const useCompany = (): UseCompanyReturn => {
  const token = useAuthStore((s) => s.tokens?.access_token);

  const [companies, setCompanies] = useState<CompanyAPI[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CompanyRow | null>(
    null,
  );
  const [error, setError] = useState<unknown>(null);

  const fetchCompanies = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const response = await CompanyService.companies(token);
      setCompanies(response || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchCompanies();
  }, [fetchCompanies, token]);

  return {
    companies,
    selectedCompany,
    setSelectedCompany,
    loading,
    error,
    refetch: fetchCompanies,
  };
};
