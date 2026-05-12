import { useSpotify } from "../hooks/useSpotify";

export default function Spotify() {
  const { data, error, loading } = useSpotify();

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading Spotify data.</p>
      ) : data ? (
        <div />
      ) : null}
    </>
  );
}
