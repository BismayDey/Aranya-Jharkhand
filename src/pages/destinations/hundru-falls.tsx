import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function HundruFallsPage() {
  const dest = destinationsData.find((d) => d.id === "hundru-falls");
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}
