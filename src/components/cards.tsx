import { useEffect, useRef } from "react";
import Spotify from "./cards/spotify";
import Gaming from "./cards/gaming";
import Letterboxd from "./cards/letterboxd";

export default function Cards() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onGalleryLoaded() {
      sectionRef.current?.classList.add("smooth-entry");
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("cards-loaded"));
      }, 500);
    }
    window.addEventListener("gallery-loaded", onGalleryLoaded);
    return () => window.removeEventListener("gallery-loaded", onGalleryLoaded);
  }, []);

  return (
    <section ref={sectionRef} className="mt-4 flex gap-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory xl:justify-center xl:overflow-visible xl:snap-none xl:px-0 opacity-0">
      <Spotify />
      <Gaming />
      <Letterboxd />
    </section>
  );
}
