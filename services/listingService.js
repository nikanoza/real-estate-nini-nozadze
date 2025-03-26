import { instance } from "./agentService";

export const createRealEstateListing = async (listingData) => {
  try {
    console.log("Listing data being sent:", listingData);
    const response = await instance.post("/listings", listingData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating real estate listing:",
      error.response?.data || error.message
    );
    throw error;
  }
};
