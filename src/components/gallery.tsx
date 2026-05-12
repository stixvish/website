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

    function onLoad() {
      loaded++;
      if (loaded >= total) {
        // ensure name animation (0.2s delay + 0.5s duration) has finished
        const elapsed = Date.now() - mountTime;
        const wait = Math.max(0, 800 - elapsed);
        revealTimer = setTimeout(() => {
          inner.classList.add("photo-scroll");
          section.classList.add("smooth-entry");
          // let gallery animation play before ticker fires
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent("gallery-loaded"));
          }, 500);
        }, wait);
      }
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
      images.forEach((img) => {
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onError);
      });
    };
  }, [photos]);

  const doubled = [...photos, ...photos];

  return (
    <section ref={sectionRef} className="mt-4 overflow-hidden opacity-0">
      <div
        ref={innerRef}
        className="flex h-[clamp(200px,35dvw,350px)] w-max gap-4"
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
