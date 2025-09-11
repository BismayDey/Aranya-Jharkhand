import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function BetlaNationalParkPage() {
  const dest = destinationsData.find((d) => d.id === "betla-national-park");
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}
