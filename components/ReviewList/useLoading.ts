import React, { useState, useCallback, useEffect } from "react";

export const useLoading = (
  loadingRef: React.MutableRefObject<any>
): [boolean, number] => {
  const [currentPage, setCurrentPage] = useState(2);

  const [loading, setLoading] = useState(false);

  const addPage = useCallback(() => {
    setCurrentPage(currentPage + 1);
    setLoading(false);
  }, [currentPage]);

  useEffect(() => {
    if (loading === true) {
      return;
    }
    addPage();
  }, [loading]);

  useEffect(() => {
    if (loadingRef.current === null) {
      return;
    }
    const callback: IntersectionObserverCallback = entries => {
      const { isIntersecting } = entries[0];
      if (isIntersecting) {
        setLoading(true);
        addPage();
      }
    };
    const observer = new IntersectionObserver(callback, {});
    const target = loadingRef.current;
    observer.observe(target);
  }, [addPage]);

  return [loading, currentPage];
};
