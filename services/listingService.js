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

export default instance;
