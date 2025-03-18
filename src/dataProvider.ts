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

// Helper function to format data based on resource type
const formatData = (resource: string, data: any) => {
  switch (resource) {
    case "business":
      return {
        ...data,
        categories: Array.isArray(data.categories) ? data.categories.map((cat: any) => (typeof cat === "object" ? cat.id : cat)) : [],
        openingHours: data.openingHours || {
          monday: "09:00-17:00",
          tuesday: "09:00-17:00",
          wednesday: "09:00-17:00",
          thursday: "09:00-17:00",
          friday: "09:00-17:00",
          saturday: "09:00-17:00",
          sunday: "09:00-17:00",
        },
        latitude: data.latitude || 0,
        longitude: data.longitude || 0,
      };
    case "services":
      return {
        ...data,
        price: Number(data.price),
        isActive: Boolean(data.isActive),
      };
    case "packages":
      return {
        ...data,
        price: Number(data.price),
        credits: Number(data.credits),
        isActive: Boolean(data.isActive),
      };
    case "bookings":
      return {
        ...data,
        startTime: new Date(data.startTime).toISOString(),
        endTime: new Date(data.endTime).toISOString(),
      };
    case "reviews":
      return {
        ...data,
        rating: Number(data.rating),
      };
    case "credit-cards":
      return {
        ...data,
        expiryDate: new Date(data.expiryDate).toISOString(),
      };
    case "purchases":
      return {
        ...data,
        amount: Number(data.amount),
      };
    default:
      return data;
  }
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
    const formattedData = formatData(resource, params.data);
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(formattedData),
    });
    return {
      //@ts-ignore
      data: { ...formattedData, id: json.id } as unknown as CreateResult<typeof params.data>["data"],
    };
  },

  update: async (resource, params) => {
    const formattedData = formatData(resource, params.data);
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(formattedData),
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
