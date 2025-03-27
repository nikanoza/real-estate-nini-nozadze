import { instance } from "./agentService";
export const getRegions = async () => {
  try {
    const response = await instance.get("/regions");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching regions:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const getCities = async () => {
  try {
    const response = await instance.get("/cities");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching cities:",
      error.response?.data || error.message
    );
    throw error;
  }
};
