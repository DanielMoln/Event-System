import { axiosInstance } from "./GlobalConfigs";

export const sendGetRequest = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint, {});

    if (response.data.statusCode >= 200 && response.data.statusCode <= 299) {
      return response.data;
    }
  } catch (err) {
    if (err.response?.data?.message) {
      console.error(err.response.data.message);
    } else {
      console.error(err.message);
    }
  }
};

export const sendPostRequest = async (endpoint, body) => {
  try {
    const response = await axiosInstance.post(endpoint, body, {});

    if (response.data.statusCode >= 200 && response.data.statusCode <= 299) {
      return response.data;
    }
  } catch (err) {
    if (err.response?.data?.message) {
      console.error(err.response.data.message);
    } else {
      console.error(err.message);
    }
  }
};

export const sendCustomContentTypePostRequest = async (
  endpoint,
  body,
  contentType
) => {
  try {
    const response = await axiosInstance.post(endpoint, body, {
      headers: {
        "Content-Type": contentType,
      },
    });

    if (response.data.statusCode >= 200 && response.data.statusCode <= 299) {
      return response.data;
    }
  } catch (err) {
    if (err.response?.data?.message) {
      console.error(err.response.data.message);
    } else {
      console.error(err.message);
    }
  }
};

export const sendPutRequest = async (endpoint, body) => {
  try {
    const response = await axiosInstance.put(endpoint, body, {});

    if (response.data.statusCode >= 200 && response.data.statusCode <= 299) {
      return response.data;
    }
  } catch (err) {
    if (err.response?.data?.message) {
      console.error(err.response.data.message);
    } else {
      console.error(err.message);
    }
  }
};

export const sendDeleteRequest = async (endpoint) => {
  try {
    const response = await axiosInstance.delete(endpoint, {});

    if (response.data.statusCode >= 200 && response.data.statusCode <= 299) {
      return response.data;
    }
  } catch (err) {
    if (err.response?.data?.message) {
      console.error(err.response.data.message);
    } else {
      console.error(err.message);
    }
  }
};
