import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function TagoreHillPage() {
  const dest = destinationsData.find((d) => d.id === "tagore-hill");
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}
