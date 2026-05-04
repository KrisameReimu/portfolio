const COMMUNITY_API_BASE = (process.env.REACT_APP_COMMUNITY_API_BASE || "")
  .trim()
  .replace(/\/+$/, "");

const postCommunity = async (path, payload) => {
  if (!COMMUNITY_API_BASE) {
    throw new Error("community_api_not_configured");
  }

  const response = await fetch(`${COMMUNITY_API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data?.ok === false) {
    throw new Error(data?.error || `community_api_${response.status}`);
  }

  return data;
};

export const submitContactMessage = payload =>
  postCommunity("/contact-messages", {
    ...payload,
    source: "contact-page",
    clientTs: new Date().toISOString()
  });

export const subscribeToUpdates = payload =>
  postCommunity("/subscribers", {
    ...payload,
    source: payload.source || "contact-page"
  });
