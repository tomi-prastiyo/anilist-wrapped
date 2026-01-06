const ANILIST_API = "https://graphql.anilist.co";

interface GraphQLResponse<T> {
  data: T;
  errors?: { message: string }[];
}

export async function aniListRequest<
  TData,
  TVariables extends Record<string, unknown> = Record<string, unknown>
>(query: string, variables?: TVariables): Promise<TData> {
  const res = await fetch(ANILIST_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const json: GraphQLResponse<TData> = await res.json();

  if (json.errors) {
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }

  return json.data;
}
