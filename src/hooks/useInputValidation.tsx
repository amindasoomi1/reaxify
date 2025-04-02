import { FormContext } from "@/components/Form";
import { randomID } from "@/helpers";
import { Rules } from "@/types";
import { useCallback, useContext, useState } from "react";

type Config = {
  rules: Rules;
};

export default function useInputValidation({ rules }: Config) {
  const { setFormControl, removeFormControl } = useContext(FormContext);
  //   const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //eslint-disable-next-line
  //   const isAsync = useCallback((fn: Function) => {
  //     const AsyncFunction = async function () {}.constructor;
  //     return fn instanceof AsyncFunction;
  //   }, []);

  const validate = useCallback(
    (node: HTMLInputElement | HTMLTextAreaElement) => {
      if (!rules.length) return;
      const id = node.id;
      const value = node.value;
      for (const rule of rules) {
        // if (isAsync(rule)) setLoading(true);
        const result = rule(value);
        const isString = typeof result === "string";
        if (isString) {
          setFormControl?.(id, () => false);
          setErrorMessage(result);
          setError(true);
          //   setLoading(false);
          return;
        }
      }
      setFormControl?.(id, () => true);
      setErrorMessage(null);
      setError(false);
      //   setLoading(false);
    },
    [rules, setFormControl]
  );

  const inputRef = useCallback(
    (node: HTMLInputElement | HTMLTextAreaElement | null) => {
      if (!node) return;
      node.id ||= randomID();
      const id = node.id;
      validate(node);
      const observer = new MutationObserver(() => validate(node));
      observer.observe(node, {
        attributes: true,
        childList: true,
        subtree: true,
      });
      return () => {
        observer.disconnect();
        removeFormControl?.(id);
      };
    },
    [validate, removeFormControl]
  );

  return { ref: inputRef, error, errorMessage };
}
