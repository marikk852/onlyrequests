type FbqFn = (...args: unknown[]) => void;

function getFbq(): FbqFn | undefined {
  const w = window as unknown as { fbq?: FbqFn; _fbq?: FbqFn };
  return typeof w.fbq === "function" ? w.fbq : typeof w._fbq === "function" ? w._fbq : undefined;
}

export function trackMetaEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const fbq = getFbq();
  if (typeof fbq === "function") {
    if (params) fbq("track", eventName, params);
    else fbq("track", eventName);
    return;
  }

  // Защита от редкой гонки: событие может вызываться до инициализации Pixel.
  setTimeout(() => {
    const lateFbq = getFbq();
    if (typeof lateFbq !== "function") return;
    if (params) lateFbq("track", eventName, params);
    else lateFbq("track", eventName);
  }, 250);
}

