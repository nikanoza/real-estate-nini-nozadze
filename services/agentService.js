import axios from "axios";
export const TOKEN = "9e87a937-af73-4647-8520-fb85fe54ae10";

export const instance = axios.create({
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

export const getAgents = async () => {
  try {
    const response = await instance.get("/agents");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching agents:",
      error.response?.data || error.message
    );
    throw error;
  }
};
