import axios from "axios";
import { URL_BE } from "./config";
/**
 * @author Fajrul
 * @return { obj }
 * Custom Header axios,
 * create from
 * 
 */

export const Request = () => {
  return axios.create({
    baseURL: URL_BE,
    mimeType: "multipart/form-data",
  });
};

