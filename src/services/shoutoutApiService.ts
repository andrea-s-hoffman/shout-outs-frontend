import axios from "axios";
import Shoutout from "../models/Shoutout";
import TopFive from "../models/TopFive";

const baseUrl: string = import.meta.env.VITE_API_URL ?? "BASE URL NOT FOUND";

export const getAllShoutouts = async (to?: string): Promise<Shoutout[]> => {
  return (
    await axios.get(`${baseUrl}/shoutouts`, {
      params: {
        to: to,
      },
    })
  ).data;
};

export const addAShoutout = async (newSO: Shoutout): Promise<Shoutout> => {
  return (await axios.post(`${baseUrl}/shoutouts`, newSO)).data;
};

export const deleteAShoutout = async (id: string): Promise<void> => {
  return (await axios.delete(`${baseUrl}/shoutouts/${encodeURIComponent(id)}`))
    .data;
};

export const getTopFive = async (): Promise<TopFive[]> => {
  return (await axios.get(`${baseUrl}/top-five`)).data;
};
