import axios, { AxiosResponse } from "axios";
import { getItem } from "./StorageHelper";

export const post = async (url: any, data: any) => {
    const token = await getItem("token");
    const response: AxiosResponse = await axios({
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        },
        url: url,
        data: data,
        timeout: 1000 * 15,
    });
    return response;
}

export const get = async (url: any) => {
    const token = await getItem("token");
    console.log("......Get CAL URL", url);
    console.log("......Get CAL TOKEN", token);
    const response: AxiosResponse = await axios({
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        },
        url: url,
        timeout: 1000 * 15,
    });
    return response;
}

export const put = async (url: any, data: any, contentlength: any) => {
    const token = await getItem("token");
    console.log("......Get CAL URL", url);
    console.log("......Get CAL TOKEN", token);
    const response: AxiosResponse = await axios({
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            // "Authorization" : `Bearer ${token}`,
            "Content-Length": contentlength,
            "Content-Range": `bytes ${0}-${contentlength}/${contentlength}`
        },
        url: url,
        data: data,
    });
    return response;
}