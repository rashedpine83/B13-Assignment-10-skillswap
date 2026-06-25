const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  });

  // if (!res.ok) {
  //   const text = await res.text();
  //   throw new Error(text);
  // }
  console.log(res);

  return await res.json();
};

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);

  if (!res.ok) {
    const error = await res.text();

    console.log("Status:", res.status);
    console.log("Response:", error);

    throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  }

  return await res.json();
};
