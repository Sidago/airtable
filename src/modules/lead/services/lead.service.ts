/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiConfig } from "@/config/api.config";

interface FormValues {
  full_name: string;
  role: string;
  company_id: number;
  phone: string;
  email: string;
  contact_type_id: number;
  others_contacts: string;
}

export const leadService = {
  leadTypeList: async (token: string) => {
    const res = await fetch(apiConfig.endpoints.leadTypes, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw await res.json();
    return res.json();
  },
  contactTypeList: async (token: string) => {
    const res = await fetch(apiConfig.endpoints.contactTypes, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw await res.json();
    return res.json();
  },
  createLead: async (data: FormValues, token: string) => {
    // Create a shallow copy to avoid mutating original formValues
    const payload: any = { ...data };

    // Convert to number if not empty, otherwise remove the field
    if (payload.lead_type_id) {
      payload.lead_type_id = Number(payload.lead_type_id);
    } else {
      delete payload.lead_type_id;
    }

    if (payload.contact_type_id) {
      payload.contact_type_id = Number(payload.contact_type_id);
    } else {
      delete payload.contact_type_id;
    }

    const res = await fetch(apiConfig.endpoints.createLead, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw await res.json();
    return res.json();
  },
  allLeads: async (token: string) => {
    const res = await fetch(apiConfig.endpoints.leads, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw await res.json();
    return res.json();
  },
};
