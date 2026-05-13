import { useEffect, useRef, useState } from "react";

type Photo = {
  url: string;
  alt: string;
};

// tracked outside the component so it reflects true page-load time
const mountTime = Date.now();

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://worker.stixvish.com/images")
      .then((r) => r.json())
      .then((data: Photo[]) => {
        if (data.length === 0) {
          window.dispatchEvent(new CustomEvent("gallery-loaded"));
        } else {
          setPhotos(data);
        }
      })
      .catch(() => {
        window.dispatchEvent(new CustomEvent("gallery-loaded"));
      });
  }, []);

  useEffect(() => {
    if (photos.length === 0 || !innerRef.current || !sectionRef.current) return;

    const inner = innerRef.current;
    const section = sectionRef.current;
    const images = Array.from(
      inner.querySelectorAll("img")
    ) as HTMLImageElement[];
    const total = images.length;
    let loaded = 0;
    let revealTimer: ReturnType<typeof setTimeout>;
    let revealed = false;

    function reveal() {
      if (revealed) return;
      revealed = true;
      clearTimeout(fallbackTimer);
      const elapsed = Date.now() - mountTime;
      const wait = Math.max(0, 800 - elapsed);
      revealTimer = setTimeout(() => {
        inner.classList.add("photo-scroll");
        section.classList.add("smooth-entry");
      }, wait);
    }

    // 2s hard cap — if images are still loading, show anyway
    const fallbackTimer = setTimeout(reveal, 2000);

    function onLoad() {
      loaded++;
      if (loaded >= total) reveal();
    }

    function onError(e: Event) {
      (e.target as HTMLImageElement).style.display = "none";
      onLoad();
    }

    images.forEach((img) => {
      if (img.complete) onLoad();
      else {
        img.addEventListener("load", onLoad);
        img.addEventListener("error", onError);
      }
    });

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(fallbackTimer);
      images.forEach((img) => {
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onError);
      });
    };
  }, [photos]);

  const doubled = [...photos, ...photos];

  return (
    <section ref={sectionRef} className="overflow-hidden opacity-0">
      <div
        ref={innerRef}
        className="flex h-[clamp(100px,30dvw,400px)] w-max gap-4 opacity-50"
      >
        {doubled.map((photo, i) => (
          <img
            key={`${photo.url}-${i}`}
            src={photo.url}
            alt={photo.alt}
            width={500}
            height={500}
            draggable={false}
            className="h-full w-auto rounded-2xl"
          />
        ))}
      </div>
    </section>
  );
}
