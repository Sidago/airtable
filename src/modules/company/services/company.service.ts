import { apiConfig } from "@/config/api.config";

interface FormValues {
  symbol: string;
  name: string;
  timezone_id: string; // from select
  country: string;
  state:string;
  city: string;
}

interface CompanyPayload {
  symbol: string;
  name: string;
  timezone_id: number; // converted
  country: string;
  state:string;
  city: string;
}

export const CompanyService = {
  timezones: async (token: string) => {
    const res = await fetch(apiConfig.endpoints.timezones, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw await res.json();
    return res.json();
  },

  companies: async (token: string) => {
    const res = await fetch(apiConfig.endpoints.companies, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw await res.json();
    return res.json();
  },

  createCompany: async (data: FormValues, token: string) => {
    const payload: CompanyPayload = {
      ...data,
      timezone_id: Number(data.timezone_id), // ✅ convert here
    };

    const res = await fetch(apiConfig.endpoints.company, {
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

  updateCompany: async (
    data: FormValues,
    id: string,
    token: string
  ) => {
    const payload: CompanyPayload = {
      ...data,
      timezone_id: Number(data.timezone_id), // ✅ convert here too
    };

    const res = await fetch(`${apiConfig.endpoints.company}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw await res.json();
    return res.json();
  },
  commnets: async (companyId: number, token: string) => {
    const res = await fetch(`${apiConfig.endpoints.company}/${companyId}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },
  addComment: async (companyId: number, content: string, token: string) => {
    const res = await fetch(`${apiConfig.endpoints.company}/${companyId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },
};
