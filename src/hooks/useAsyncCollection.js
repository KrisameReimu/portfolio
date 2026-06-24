import {useEffect, useRef, useState} from "react";

export const useAsyncCollection = ({
  load,
  reloadKey = "default",
  initialItems = [],
  enabled = true
}) => {
  const loadRef = useRef(load);
  const [items, setItems] = useState(initialItems);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRef.current = load;
  }, [load]);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return undefined;
    }

    let mounted = true;

    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const nextItems = await loadRef.current();
        if (mounted) {
          setItems(Array.isArray(nextItems) ? nextItems : []);
        }
      } catch (nextError) {
        if (mounted) {
          setItems([]);
          setError(nextError);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [enabled, reloadKey]);

  return {
    items,
    isLoading,
    error,
    setItems
  };
};

export default useAsyncCollection;
