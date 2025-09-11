import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function DimnaLakePage() {
  const dest = destinationsData.find((d) => d.id === "dimna-lake");
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}
