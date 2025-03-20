import { DataProvider, fetchUtils } from "react-admin";

const apiUrl = "http://localhost:3001/api";

interface AuthData {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: number;
    firstName: string;
    lastName: string;
    pictureUrl: string | null;
  };
}

const getStoredAuth = (): AuthData | null => {
  const auth = localStorage.getItem("fit2go_admin_auth");
  return auth ? JSON.parse(auth) : null;
};

const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  const response = await fetch(`${apiUrl}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error("Failed to refresh token");
  }

  const { access_token } = await response.json();
  return access_token;
};

// Create a custom httpClient that includes the auth token and handles refresh
const httpClient = async (url: string, options: any = {}) => {
  const auth = getStoredAuth();
  if (!auth) {
    throw new Error("No auth token available");
  }

  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${auth.accessToken}`);

  try {
    return await fetchUtils.fetchJson(url, {
      ...options,
      headers,
    });
  } catch (error: any) {
    // If the error is not a 401, throw it
    if (error.status !== 401) {
      throw error;
    }

    // Try to refresh the token
    try {
      const newAccessToken = await refreshAccessToken(auth.refreshToken);

      // Update the stored auth with the new token
      const updatedAuth = {
        ...auth,
        accessToken: newAccessToken,
      };
      localStorage.setItem("fit2go_admin_auth", JSON.stringify(updatedAuth));

      // Retry the original request with the new token
      headers.set("Authorization", `Bearer ${newAccessToken}`);
      return await fetchUtils.fetchJson(url, {
        ...options,
        headers,
      });
    } catch (refreshError) {
      // If refresh fails, clear auth and throw
      localStorage.removeItem("fit2go_admin_auth");
      throw refreshError;
    }
  }
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
        status: data.status || "pending",
        price: Number(data.price),
        userId: data.userId,
        serviceId: data.serviceId,
        businessId: data.businessId,
      };
    case "reviews":
      return {
        ...data,
        rating: Number(data.rating),
        userId: data.userId,
        serviceId: data.serviceId,
        businessId: data.businessId,
        comment: data.comment || "",
      };
    case "credit-cards":
      return {
        ...data,
        userId: data.userId,
        cardNumber: data.cardNumber,
        expiryDate: new Date(data.expiryDate).toISOString(),
        cvv: data.cvv,
        isDefault: Boolean(data.isDefault),
      };
    case "purchases":
      return {
        ...data,
        userId: data.userId,
        amount: Number(data.amount),
        type: data.type || "package", // 'package' or 'service'
        packageId: data.packageId,
        serviceId: data.serviceId,
        status: data.status || "pending",
      };
    case "refresh-tokens":
      return {
        ...data,
        userId: data.userId,
        token: data.token,
        expiresAt: new Date(data?.expiresAt).toISOString(),
        isRevoked: Boolean(data?.isRevoked),
      };
    case "otps":
      return {
        ...data,
        userId: data.userId,
        code: data.code,
        type: data.type || "email", // 'email' or 'phone'
        expiresAt: new Date(data.expiresAt).toISOString(),
        isUsed: Boolean(data.isUsed),
      };
    case "notifications":
      return {
        ...data,
        title: data.title,
        body: data.body,
        type: data.type,
        userId: data.userId,
        createdAt: new Date().toISOString(),
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

    // Handle special cases for different resources
    let url = `${apiUrl}/${resource}`;
    if (resource === "bookings") {
      url = `${apiUrl}/bookings/user/${params.filter?.userId || "all"}`;
    } else if (resource === "reviews") {
      url = `${apiUrl}/reviews/business/${params.filter?.businessId || "all"}`;
    } else if (resource === "credit-cards") {
      url = `${apiUrl}/credit-cards/user/${params.filter?.userId || "all"}`;
    } else if (resource === "purchases") {
      url = `${apiUrl}/purchases/user/${params.filter?.userId || "all"}`;
    } else if (resource === "refresh-tokens") {
      url = `${apiUrl}/refresh-tokens/user/${params.filter?.userId || "all"}`;
    } else if (resource === "otps") {
      url = `${apiUrl}/otps/user/${params.filter?.userId || "all"}`;
    }

    url += `?${fetchUtils.queryParameters(query)}`;
    const { json } = await httpClient(url);
    return {
      data: json,
      total: json.length,
    };
  },

  getOne: async (resource, params) => {
    let url = `${apiUrl}/${resource}/${params.id}`;
    if (resource === "bookings") {
      url = `${apiUrl}/bookings/${params.id}/details`;
    } else if (resource === "reviews") {
      url = `${apiUrl}/reviews/${params.id}/details`;
    } else if (resource === "credit-cards") {
      url = `${apiUrl}/credit-cards/${params.id}/details`;
    } else if (resource === "purchases") {
      url = `${apiUrl}/purchases/${params.id}/details`;
    } else if (resource === "refresh-tokens") {
      url = `${apiUrl}/refresh-tokens/${params.id}/details`;
    } else if (resource === "otps") {
      url = `${apiUrl}/otps/${params.id}/details`;
    }

    const { json } = await httpClient(url);
    return {
      data: json,
    };
  },

  getMany: async (resource, params) => {
    const query = {
      ids: JSON.stringify(params.ids),
    };
    let url = `${apiUrl}/${resource}/many`;
    if (resource === "bookings") {
      url = `${apiUrl}/bookings/bulk`;
    } else if (resource === "reviews") {
      url = `${apiUrl}/reviews/bulk`;
    } else if (resource === "credit-cards") {
      url = `${apiUrl}/credit-cards/bulk`;
    } else if (resource === "purchases") {
      url = `${apiUrl}/purchases/bulk`;
    } else if (resource === "refresh-tokens") {
      url = `${apiUrl}/refresh-tokens/bulk`;
    } else if (resource === "otps") {
      url = `${apiUrl}/otps/bulk`;
    }

    url += `?${fetchUtils.queryParameters(query)}`;
    const { json } = await httpClient(url);
    return {
      data: json,
    };
  },

  create: async (resource, params) => {
    const formattedData = formatData(resource, params.data);
    let url = `${apiUrl}/${resource}`;
    if (resource === "notifications") {
      url = `${apiUrl}/notifications/send`;
    } else if (resource === "bookings") {
      url = `${apiUrl}/bookings/create`;
    } else if (resource === "reviews") {
      url = `${apiUrl}/reviews/create`;
    } else if (resource === "credit-cards") {
      url = `${apiUrl}/credit-cards/create`;
    } else if (resource === "purchases") {
      url = `${apiUrl}/purchases/create`;
    } else if (resource === "refresh-tokens") {
      url = `${apiUrl}/refresh-tokens/create`;
    } else if (resource === "otps") {
      url = `${apiUrl}/otps/create`;
    }

    const { json } = await httpClient(url, {
      method: "POST",
      body: JSON.stringify(formattedData),
    });
    return {
      data: { ...formattedData, id: json.id },
    };
  },

  update: async (resource, params) => {
    const formattedData = formatData(resource, params.data);
    let url = `${apiUrl}/${resource}/${params.id}`;
    if (resource === "bookings") {
      url = `${apiUrl}/bookings/${params.id}/update`;
    } else if (resource === "reviews") {
      url = `${apiUrl}/reviews/${params.id}/update`;
    } else if (resource === "credit-cards") {
      url = `${apiUrl}/credit-cards/${params.id}/update`;
    } else if (resource === "purchases") {
      url = `${apiUrl}/purchases/${params.id}/update`;
    } else if (resource === "refresh-tokens") {
      url = `${apiUrl}/refresh-tokens/${params.id}/update`;
    } else if (resource === "otps") {
      url = `${apiUrl}/otps/${params.id}/update`;
    }

    const { json } = await httpClient(url, {
      method: "PATCH",
      body: JSON.stringify(formattedData),
    });
    return {
      data: json,
    };
  },

  delete: async (resource, params) => {
    let url = `${apiUrl}/${resource}/${params.id}`;
    if (resource === "bookings") {
      url = `${apiUrl}/bookings/${params.id}/cancel`;
    } else if (resource === "reviews") {
      url = `${apiUrl}/reviews/${params.id}/delete`;
    } else if (resource === "credit-cards") {
      url = `${apiUrl}/credit-cards/${params.id}/delete`;
    } else if (resource === "purchases") {
      url = `${apiUrl}/purchases/${params.id}/cancel`;
    } else if (resource === "refresh-tokens") {
      url = `${apiUrl}/refresh-tokens/${params.id}/revoke`;
    } else if (resource === "otps") {
      url = `${apiUrl}/otps/${params.id}/invalidate`;
    }

    const { json } = await httpClient(url, {
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
    let url = `${apiUrl}/${resource}/bulk-delete`;
    if (resource === "bookings") {
      url = `${apiUrl}/bookings/bulk-cancel`;
    } else if (resource === "reviews") {
      url = `${apiUrl}/reviews/bulk-delete`;
    } else if (resource === "credit-cards") {
      url = `${apiUrl}/credit-cards/bulk-delete`;
    } else if (resource === "purchases") {
      url = `${apiUrl}/purchases/bulk-cancel`;
    } else if (resource === "refresh-tokens") {
      url = `${apiUrl}/refresh-tokens/bulk-revoke`;
    } else if (resource === "otps") {
      url = `${apiUrl}/otps/bulk-invalidate`;
    }

    url += `?${fetchUtils.queryParameters(query)}`;
    const { json } = await httpClient(url, {
      method: "DELETE",
    });
    return {
      data: json,
    };
  },

  getManyReference: async (resource, params) => {
    const { page = 1, perPage = 10 } = params.pagination || {};
    const { field = "id", order = "ASC" } = params.sort || {};
    const query = {
      skip: (page - 1) * perPage,
      take: perPage,
      sort: `${field},${order}`,
      [params.target]: params.id,
      ...params.filter,
    };

    let url = `${apiUrl}/${resource}`;
    if (resource === "bookings") {
      url = `${apiUrl}/bookings/user/${params.id}`;
    } else if (resource === "reviews") {
      url = `${apiUrl}/reviews/business/${params.id}`;
    } else if (resource === "credit-cards") {
      url = `${apiUrl}/credit-cards/user/${params.id}`;
    } else if (resource === "purchases") {
      url = `${apiUrl}/purchases/user/${params.id}`;
    } else if (resource === "refresh-tokens") {
      url = `${apiUrl}/refresh-tokens/user/${params.id}`;
    } else if (resource === "otps") {
      url = `${apiUrl}/otps/user/${params.id}`;
    }

    url += `?${fetchUtils.queryParameters(query)}`;
    const { json } = await httpClient(url);
    return {
      data: json,
      total: json.length,
    };
  },

  updateMany: async (resource, params) => {
    const query = {
      ids: JSON.stringify(params.ids),
    };
    let url = `${apiUrl}/${resource}/bulk-update`;
    if (resource === "bookings") {
      url = `${apiUrl}/bookings/bulk-update`;
    } else if (resource === "reviews") {
      url = `${apiUrl}/reviews/bulk-update`;
    } else if (resource === "credit-cards") {
      url = `${apiUrl}/credit-cards/bulk-update`;
    } else if (resource === "purchases") {
      url = `${apiUrl}/purchases/bulk-update`;
    } else if (resource === "refresh-tokens") {
      url = `${apiUrl}/refresh-tokens/bulk-update`;
    } else if (resource === "otps") {
      url = `${apiUrl}/otps/bulk-update`;
    }

    url += `?${fetchUtils.queryParameters(query)}`;
    const { json } = await httpClient(url, {
      method: "PATCH",
      body: JSON.stringify(params.data),
    });
    return {
      data: json,
    };
  },
};
