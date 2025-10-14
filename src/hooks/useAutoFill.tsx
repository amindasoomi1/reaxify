import { Dispatch, useEffect, useRef } from "react";

type OTPCredential = {
  code: string;
  type: string;
  id: string;
};

export default function useAutoFill(callback: Dispatch<string | null>) {
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    controllerRef.current = new AbortController();
    const controller = controllerRef.current;

    navigator?.credentials
      ?.get?.({
        // eslint-disable-next-line
        // @ts-ignore
        otp: { transport: ["sms"] },
        signal: controller.signal,
      })
      .then((otp) => {
        const result = otp as OTPCredential;
        callback(result?.code || null);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      controller?.abort("signal has been aborted.");
    };
  }, []);
}
