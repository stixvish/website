import Spotify from "./cards/spotify";
import Gaming from "./cards/gaming";
import Letterboxd from "./cards/letterboxd";

export default function Cards() {
  return (
    <section
      className="smooth-entry mt-4 flex gap-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory xl:justify-center xl:overflow-visible xl:snap-none xl:px-0"
      style={{ animationDelay: "1s" }}
    >
      <Spotify />
      <Gaming />
      <Letterboxd />
    </section>
  );
}
