import { apiConfig } from "@/config/api.config";

export const agentService = {
  agentList: async (token: string) => {
    const res = await fetch(apiConfig.endpoints.agentList, {
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
