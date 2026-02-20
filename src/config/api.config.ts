export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const apiConfig = {
  apiUrl: API_URL,
  endpoints: {
    signin: `${API_URL}/api/login`,
    refresh: `${API_URL}/api/refresh`,
    me: `${API_URL}/api/me`,
    logout: `${API_URL}/api/logout`,
    agentList: `${API_URL}/api/agents`,
    leadTypes: `${API_URL}/api/lead-types`,
    contactTypes: `${API_URL}/api/contact-types`,
    createLead: `${API_URL}/api/lead`,
    timezones: `${API_URL}/api/timezones`,
    companies: `${API_URL}/api/companies`,
    company: `${API_URL}/api/company`,
  },
};
