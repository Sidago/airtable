"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useAuthStore } from "@/modules/signin/store/auth.store";
import { leadService } from "@/modules/lead/services/lead.service";

export interface Lead {
  id: number;
  lead_id: string;
  full_name: string;
  role: string;
  phone: string;
  email: string;
  assigned_to: string;
  agent: string;
  follow_up_date: string | null;
  lead_type: string;
  contact_type: string;
  date_become_hot: string | null;
  others_contacts: string | null;
  company: {
    id: number;
    name: string;
    symbol: string;
    timezone: string;
  };
  svg_lead_type: string;
  svg_tobe_called: string;
  benton_lead_type: string;
  benton_tobe_called: string;
  rm_lead_type: string;
  rm_tobe_called: string;
  last_called_date_sidago: string;
  last_called_date_benton: string;
  last_called_date_rm: string;
  last_action: string;
}

interface UseLeadsReturn {
  leads: Lead[];
  loading: boolean;
  error: unknown;
  refetch: () => Promise<void>;
  selectedLead: Lead | null;
  setSelectedLead: (lead: Lead | null) => void;
}

export const useLeads = (): UseLeadsReturn => {
  const token = useAuthStore((s) => s.tokens?.access_token);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  const fetchLeads = useCallback(async () => {
    if (!token) {
      setLeads([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await leadService.allLeads(token);

      const data: Lead[] = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response)
        ? response
        : [];

      setLeads(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return useMemo(
    () => ({
      leads,
      loading,
      error,
      refetch: fetchLeads,
      selectedLead,
      setSelectedLead,
    }),
    [leads, loading, error, fetchLeads, selectedLead]
  );
};