import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function BirsaZoologicalParkPage() {
  const dest = destinationsData.find((d) => d.id === "birsa-zoological-park");
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}
