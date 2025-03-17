import { CreateResult, DataProvider, fetchUtils } from "react-admin";

const apiUrl = "http://localhost:3001/api";

// Create a custom httpClient that includes the auth token
const httpClient = (url: string, options: any = {}) => {
  const auth = localStorage.getItem("auth");
  const token = auth ? JSON.parse(auth).accessToken : null;

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetchUtils.fetchJson(url, {
    ...options,
    headers,
  });
};

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { page = 1, perPage = 10 } = params.pagination || {};
    const { field = "id", order = "ASC" } = params.sort || {};
    const query = {
      skip: (page - 1) * perPage,
      take: perPage,
      sort: `${field},${order}`,
      ...params.filter,
    };
    const url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
    const { json } = await httpClient(url);
    return {
      data: json,
      total: json.length,
    };
  },

  getOne: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`);
    return {
      data: json,
    };
  },

  getMany: async (resource, params) => {
    const query = {
      ids: JSON.stringify(params.ids),
    };
    const url = `${apiUrl}/${resource}/many?${fetchUtils.queryParameters(query)}`;
    const { json } = await httpClient(url);
    return {
      data: json,
    };
  },

  //@ts-ignore
  create: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return {
      data: { ...params.data, id: json.id } as unknown as CreateResult<
        //@ts-ignore
        typeof params.data
      >["data"],
    };
  },

  update: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(params.data),
    });
    return {
      data: json,
    };
  },

  delete: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    });
    return {
      data: json,
    };
  },

  deleteMany: async (resource, params) => {
    const query = {
      ids: JSON.stringify(params.ids),
    };
    const url = `${apiUrl}/${resource}/bulk-delete?${fetchUtils.queryParameters(query)}`;
    const { json } = await httpClient(url, {
      method: "DELETE",
    });
    return {
      data: json,
    };
  },
};
