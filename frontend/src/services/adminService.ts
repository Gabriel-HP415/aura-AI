import api from "./api";

export type AdminLoginResponse = {
  accessToken: string;
  expiresInMinutes: number;
  admin: {
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    isSuperAdmin: boolean;
    isActive: boolean;
  };
};

const adminTokenKey = "adminToken";

const adminService = {
  async login(email: string, password: string): Promise<AdminLoginResponse> {
    const res = await api.post("/admin/auth/login", { email, password });
    const data = res.data as AdminLoginResponse;
    if (data?.accessToken)
      localStorage.setItem(adminTokenKey, data.accessToken);
    return data;
  },

  logout() {
    localStorage.removeItem(adminTokenKey);
  },

  getToken() {
    return localStorage.getItem(adminTokenKey);
  },

  isAuthenticated() {
    return !!localStorage.getItem(adminTokenKey);
  },
};

export default adminService;
