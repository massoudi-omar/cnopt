import axios from "axios";

export const baseURL = "https://plateforme.cnopt.tn/";
export const clickToPay = "https://ipay.clictopay.com";
export const username = "0799902366";
export const password = "zdY5Kb77";

export const placeholderImage = "https://redthread.uoregon.edu/files/original/affd16fd5264cab9197da4cd1a996f820e601ee4.png";
export const nodataImage = "https://icons.veryicon.com/png/o/business/financial-category/no-data-6.png";



const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Attach token
axiosInstance.interceptors.request.use(async (config: any) => {
  //   const token = "await getToken()"
  //   console.log(token);

  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  return config;
});




export default axiosInstance;
