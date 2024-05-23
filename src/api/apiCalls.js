import { API_CONNECT } from "../constants/constants";

export const postAuthLogin = `${API_CONNECT}system/api/v1/auth`

export const authentification = (formData) => {
    return fetch(`${API_CONNECT}/system/api/v1/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData).toString()
      });
}