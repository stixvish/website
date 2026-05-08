import { useTime } from "../../hooks/useTime";

export default function TimeCard() {
  const { time, offset } = useTime("America/Chicago");

  return (
    <div className="flex h-full flex-col justify-center px-6 md:px-8">
      <h2 className="text-accent mb-2 text-[0.75rem] leading-none font-bold tracking-widest uppercase">
        chicago · {offset}
      </h2>
      <h2 className="text-5xl leading-none font-black whitespace-nowrap uppercase lg:text-[3.5vw]">
        {time}
      </h2>
    </div>
  );
}
