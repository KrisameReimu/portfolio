import {useEffect} from "react";
import {applyDocumentMeta} from "../utils/documentMeta";

export const usePageMeta = meta => {
  useEffect(() => {
    if (!meta) return;
    applyDocumentMeta(meta);
  }, [meta]);
};

export default usePageMeta;
