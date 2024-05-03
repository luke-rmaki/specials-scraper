export async function fetcher(url: string, param: number): Promise<string> {
  console.log(`fetching ${url}?page=${param}`);
  const load = await fetch(`${url}?page=${param}`);
  return await load.text();
}
