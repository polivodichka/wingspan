import { useEffect, useRef } from "react";

export function useWakeLock() {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        wakeLockRef.current = await navigator.wakeLock.request("screen");

        document.addEventListener("visibilitychange", async () => {
          if (document.visibilityState === "visible") {
            wakeLockRef.current = await navigator.wakeLock.request("screen");
          }
        });
      } catch (err) {
        console.error("Wake Lock failed:", err);
      }
    };

    requestWakeLock();

    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
    };
  }, []);
}
