import { MethodType } from "./../types/axios.d";
import { useState, useCallback } from "react";
import { ACCESS_TOKEN } from "../constants";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (
      url: string,
      method: MethodType = "GET",
      body = {},
      headers = {}
    ) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }
        if (localStorage.getItem(ACCESS_TOKEN)) {
          headers["Authorization"] =
            "Bearer " + localStorage.getItem(ACCESS_TOKEN);
        }
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }
        setLoading(false);
        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );
  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
