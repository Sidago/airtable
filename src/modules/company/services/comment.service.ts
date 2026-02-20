import { apiConfig } from "@/config/api.config";

export const CommentService = {
  getComments: async (companyId: number, token: string) => {
    const res = await fetch(
      `${apiConfig.endpoints.company}/${companyId}/comments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) throw await res.json();
    return res.json();
  },

  addComment: async (
    companyId: number,
    payload: { message: string },
    token: string
  ) => {
    const res = await fetch(
      `${apiConfig.endpoints.company}/${companyId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) throw await res.json();
    return res.json();
  },
};