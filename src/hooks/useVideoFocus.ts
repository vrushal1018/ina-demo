"use client";

import { useEffect, useRef } from "react";

interface UseVideoFocusOptions {
  /**
   * Intersection threshold (0.0 to 1.0) required to trigger playing.
   * Default: 0.1 (plays when 10% of the video is visible)
   */
  threshold?: number | number[];
  /**
   * Margin around the root viewport.
   * Default: "100px" to pre-start slightly before fully in view.
   */
  rootMargin?: string;
  /**
   * Whether to pause when the browser window or tab loses focus/visibility.
   * Default: true
   */
  pauseOnBlur?: boolean;
}

/**
 * Custom hook to run a video ONLY when the user is actively viewing its component.
 * Pauses playback when scrolled out of viewport or when tab/window loses focus,
 * dramatically eliminating CPU/GPU decoding lag and battery drain.
 */
export function useVideoFocus(options: UseVideoFocusOptions = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { threshold = 0.1, rootMargin = "100px", pauseOnBlur = true } = options;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Autoplay compliance attributes for desktop & mobile (iOS WebKit / Android Chrome)
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");

    let isVisibleInViewport = false;
    let isWindowActive = typeof document !== "undefined" ? !document.hidden : true;

    const safePlay = () => {
      if (!video) return;
      if (video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay policy restrictions (e.g. mobile battery saver or un-interacted document)
          });
        }
      }
    };

    const safePause = () => {
      if (!video) return;
      if (!video.paused) {
        video.pause();
      }
    };

    const updatePlayState = () => {
      if (isVisibleInViewport && isWindowActive) {
        safePlay();
      } else {
        safePause();
      }
    };

    // Mobile fallback: When the mobile user touches or scrolls, attempt to play if visible
    const handleUserGesture = () => {
      if (isVisibleInViewport && isWindowActive && video.paused) {
        safePlay();
      }
    };
    window.addEventListener("touchstart", handleUserGesture, { passive: true });
    window.addEventListener("scroll", handleUserGesture, { passive: true });
    window.addEventListener("click", handleUserGesture, { passive: true });

    // IntersectionObserver to detect when the video component is within the viewport
    let observer: IntersectionObserver | null = null;
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            isVisibleInViewport = entry.isIntersecting;
            updatePlayState();
          }
        },
        { threshold, rootMargin }
      );
      observer.observe(video);
    } else {
      isVisibleInViewport = true;
      updatePlayState();
    }

    // Tab visibility handling
    const handleVisibilityChange = () => {
      isWindowActive = !document.hidden;
      updatePlayState();
    };

    // Window focus / blur handling
    const handleFocus = () => {
      isWindowActive = true;
      updatePlayState();
    };

    const handleBlur = () => {
      if (pauseOnBlur) {
        isWindowActive = false;
        updatePlayState();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    if (pauseOnBlur) {
      window.addEventListener("focus", handleFocus);
      window.addEventListener("blur", handleBlur);
    }

    return () => {
      if (observer) observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("touchstart", handleUserGesture);
      window.removeEventListener("scroll", handleUserGesture);
      window.removeEventListener("click", handleUserGesture);
      if (pauseOnBlur) {
        window.removeEventListener("focus", handleFocus);
        window.removeEventListener("blur", handleBlur);
      }
      safePause();
    };
  }, [threshold, rootMargin, pauseOnBlur]);

  return videoRef;
}

export default useVideoFocus;
