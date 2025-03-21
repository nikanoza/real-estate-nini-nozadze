import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.real-estate-manager.redberryintership.ge/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
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
