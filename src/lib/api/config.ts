export const API_URL = "http://localhost:8000";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("jwt_token");
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const handleApiError = (error: any, errorMessage: string) => {
  console.error(errorMessage, error);
  throw new Error(errorMessage);
};