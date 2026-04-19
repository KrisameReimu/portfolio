const API_BASE = (process.env.REACT_APP_COMMUNITY_API_BASE || "").replace(
  /\/$/,
  ""
);

const isEnabled = () => Boolean(API_BASE);

const request = async (path, options = {}) => {
  const {authToken, headers: customHeaders, ...fetchOptions} = options;
  const headers = {
    "Content-Type": "application/json",
    ...(customHeaders || {})
  };
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    headers,
    ...fetchOptions
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      error:
        payload?.error || payload?.message || `request_failed_${res.status}`
    };
  }

  if (payload && typeof payload === "object") {
    return payload;
  }

  return {
    ok: true
  };
};

export const communityAPI = {
  isEnabled,
  async createSession(payload) {
    return request("/auth/session", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },
  async createGoogleSession(payload) {
    return request("/auth/google", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },
  async getComments(resourceKey) {
    return request(`/comments?resourceKey=${encodeURIComponent(resourceKey)}`);
  },
  async postComment(payload) {
    return request("/comments", {
      method: "POST",
      body: JSON.stringify(payload),
      authToken: payload?.sessionToken
    });
  },
  async getFavorites(userId) {
    return request(`/favorites?userId=${encodeURIComponent(userId)}`);
  },
  async toggleFavorite(payload) {
    return request("/favorites/toggle", {
      method: "POST",
      body: JSON.stringify(payload),
      authToken: payload?.sessionToken
    });
  },
  async getNowLatest() {
    return request("/api/now/latest");
  },
  async getRoadmap() {
    return request("/api/roadmap");
  },
  async getExperiments({pillar, status, limit} = {}) {
    const searchParams = new URLSearchParams();
    if (pillar) searchParams.append("pillar", pillar);
    if (status) searchParams.append("status", status);
    if (limit) searchParams.append("limit", `${limit}`);
    const query = searchParams.toString();
    return request(`/api/experiments${query ? `?${query}` : ""}`);
  },
  async getPublicDashboard() {
    return request("/api/dashboard/public");
  },
  async subscribe(payload) {
    return request("/api/subscribers", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },
  async trackEvent(payload) {
    return request("/api/events", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },
  async askQuery(payload) {
    return request("/api/ask/query", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }
};
