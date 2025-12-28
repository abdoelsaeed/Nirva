import axiosClient from "./axiosClient";

// Note: axiosClient's response interceptor already returns response.data
// so here `res` is the backend's data object.
export async function signUp(userdata) {
  try {
    const res = await axiosClient.post(`users`, userdata);
    // شكل الـ response:
    // { token, status, data: { user } }
    if (res?.status === "success" && res.token && res.data?.user) {
      // خزّن التوكن باسم jwt في localStorage
      try {
        localStorage.setItem("jwt", res.token);
      } catch (e) {
        console.warn("Could not store jwt in localStorage", e);
      }
      return {
        token: res.token,
        user: res.data.user,
      };
    }
    throw new Error(res?.message || "Invalid response format");
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
}

export async function login(credentials) {
  try {
    const res = await axiosClient.post(`users/login`, credentials);
    // Debug: log raw response shape
    
    // شكل الـ response:
    // { token, status, data: { user } }
    if (res?.status === "success" && res.token && res.data?.user) {
      // خزّن التوكن باسم jwt في localStorage
      try {
        localStorage.setItem("jwt", res.token);
      } catch (e) {
        console.warn("Could not store jwt in localStorage", e);
      }
      return {
        token: res.token,
        user: res.data.user,
      };
    }
    throw new Error(res?.message || "Invalid response format");
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
}
export async function getMe() {
  try {
    const res = await axiosClient.get("users/me");
    // شكل الـ response:
    // { status, data: { user } }
    if (res?.status === "success" && res.data?.user) {
      return res.data.user;
    }
    throw new Error(res?.message || "Invalid response format");
  } catch (error) {
    console.error("getMe Error:", error);
    throw error;
  }
}

export async function createUser(data) {
  try {
    const res = await axiosClient.post("users/create-user", data);

    // اطبع كل شيء للتأكد
    

    // مباشرة أعد الـ user object
    return res.data.data;
  } catch (error) {
    if (error?.response) {
      console.error("createUser Error - server responded:", {
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error?.request) {
      console.error(
        "createUser Error - no response (request made):",
        error.request
      );
    } else {
      console.error("createUser Error - something else:", error.message);
    }
    throw error;
  }
}
