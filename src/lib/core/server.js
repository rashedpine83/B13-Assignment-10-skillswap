const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return await res.json();
};

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  // handle 401, 404, 403
  return await res.json();
};
