export const API_URL = "http://localhost:8000";

export const setAuthToken = (token: string) => {
  localStorage.setItem("jwt_token", token);
  console.log("JWT token stored in localStorage");
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("jwt_token");
  console.log("Getting auth headers with JWT token");
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const handleApiError = (error: any, errorMessage: string) => {
  console.error(errorMessage, error);
  throw new Error(errorMessage);
};