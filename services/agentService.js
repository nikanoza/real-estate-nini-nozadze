import axios from "axios";
export const TOKEN = "9e7e98ba-e770-4f02-b29f-76edc0a3ed5a";

const instance = axios.create({
  baseURL: "https://api.real-estate-manager.redberryinternship.ge/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const addAgent = async (agentData) => {
  try {
    console.log("FormData being sent:", agentData);
    const response = await instance.post("/agents", agentData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding agent:", error.response?.data || error.message);
    throw error;
  }
};
export default instance;
