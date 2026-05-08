import { useEffect, useRef, useState } from "react";

type Photo = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://worker.stixvish.com/images")
      .then((r) => r.json())
      .then(setPhotos);
  }, []);

  useEffect(() => {
    if (photos.length === 0 || !innerRef.current) return;

    const inner = innerRef.current;
    const images = Array.from(
      inner.querySelectorAll("img")
    ) as HTMLImageElement[];
    const total = images.length;
    let loaded = 0;

    function onLoad() {
      loaded++;
      if (loaded >= total) {
        inner.classList.add("photo-scroll");
        inner.classList.remove("opacity-0");
      }
    }

    images.forEach((img) => {
      if (img.complete) onLoad();
      else img.addEventListener("load", onLoad);
    });

    return () => {
      images.forEach((img) => img.removeEventListener("load", onLoad));
    };
  }, [photos]);

  const doubled = [...photos, ...photos];

  return (
    <section
      className="smooth-entry w-full overflow-hidden"
      style={{ animationDelay: "0.5s" }}
    >
      <div ref={innerRef} className="flex w-max gap-4 opacity-0">
        {doubled.map((photo, i) => (
          <img
            key={`${photo.url}-${i}`}
            src={photo.url}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            draggable={false}
            className="pointer-events-none h-[clamp(20rem,22dvw,30rem)] w-auto shrink-0 rounded-2xl object-cover"
          />
        ))}
      </div>
    </section>
  );
}
