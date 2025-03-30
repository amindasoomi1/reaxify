import { Dispatch, useEffect, useRef } from "react";

type Credential = { code: string; type: string; id: string };

export default function useAutoFill(callback: Dispatch<string | null>) {
  const controllerRef = useRef(new AbortController());
  useEffect(() => {
    const controller = controllerRef.current;
    navigator?.credentials
      ?.get?.({
        otp: { transport: ["sms"] },
        signal: controller.signal,
      } as CredentialRequestOptions)
      .then((otp) => {
        const result = otp as Credential;
        callback(result?.code || null);
      });
    return () => {
      controller?.abort("signal has been aborted.");
    };
  }, [callback]);
}
