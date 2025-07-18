import axios from "axios";

const ACCESS_KEY = "B5CZNl3Of4JWlSCXgup1MTlBl80PndzF0CP9NAQY2uM"; 

const api = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    "Accept-Version": "v1"
  }
});

export const fetchImages = async (query, page = 1) => {
  const response = await api.get("/search/photos", {
    params: {
      query,
      page,
      per_page: 12,
      client_id: ACCESS_KEY
    }
  });
  return response.data;
};
