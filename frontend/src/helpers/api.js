export async function api(path, opts = {}) {
  const res = await fetch(`/api${path}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    credentials: "include",
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const data = (await res.headers.get("content-type")?.includes("application/json"))
    ? await res.json()
    : null;
  if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
  return data;
}
