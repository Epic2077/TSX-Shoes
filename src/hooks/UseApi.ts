import { useCallback, useEffect, useState } from "react";

export function useApi<T>(fn: () => Promise<T>) {
  const [state, setState] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const callApi = useCallback(() => {
    setLoading(true);
    setError(false);
    fn()
      .then((data) => {
        setState(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fn]);

  useEffect(() => {
    callApi();
  }, [callApi]);

  return {
    data: state,
    isLoading: loading,
    isError: error,
    refetch: callApi,
  };
}
