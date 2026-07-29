"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Poster-first video frame for the film pieces.
 *
 * The poster is a plain <img> in the markup so it paints from the preload
 * scanner; the clip is only given a `src` once the frame is near the viewport,
 * so a page with a video on it costs the same as a page with an image on it
 * until someone scrolls to it. Reduced motion never loads the video at all.
 *
 * Silent b-roll, so there is no audio track and no controls — the clip is
 * decoration for the poster, and `playsInline` keeps iOS from taking it
 * fullscreen.
 */
export default function ClipFrame({
  poster,
  posterMobile,
  clip,
  clipMobile,
  alt = "",
  className = "",
}) {
  const hostRef = useRef(null);
  const videoRef = useRef(null);
  const [src, setSrc] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          videoRef.current?.pause();
          return;
        }
        // Phone-class viewports get the smaller encode — same tier split the
        // scroll world uses, so the two stay in step.
        setSrc(
          window.matchMedia("(max-width: 600px), (max-height: 600px)").matches
            ? clipMobile || clip
            : clip,
        );
        videoRef.current?.play().catch(() => {});
      },
      { rootMargin: "200px" },
    );
    io.observe(host);
    return () => io.disconnect();
  }, [clip, clipMobile]);

  return (
    <div ref={hostRef} className={`cb-clip ${className}`}>
      <picture>
        <source media="(max-width: 600px)" srcSet={posterMobile || poster} />
        <img src={poster} alt={alt} className="cb-clip__poster" decoding="async" />
      </picture>
      {src && (
        <video
          ref={videoRef}
          className="cb-clip__video"
          data-ready={playing ? "true" : "false"}
          src={src}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          onPlaying={() => setPlaying(true)}
        />
      )}
    </div>
  );
}
