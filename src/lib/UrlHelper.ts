export const withParams = (to: string, params: Record<string, string>) => {
  const url = new URL(to);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value);
  }
  return url.toString();
};

export const isRelative = (url: string) => {
  try {
    new URL(url);
    return false;
  } catch (e) {
    return true;
  }
};
