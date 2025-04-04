import { instance } from "./agentService";

export const createRealEstateListing = async (listingData) => {
  try {
    console.log("Listing data being sent:", listingData);
    const response = await instance.post("/real-estates", listingData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating real estate listing:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const getListings = async () => {
  const response = await instance.get("/real-estates");
  return response.data;
};
export const getListingById = async (id) => {
  try {
    const response = await instance.get(`/real-estates/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching listing with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};
export const deleteListingById = async (id) => {
  try {
    const response = await instance.delete(`/real-estates/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting listing with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};
