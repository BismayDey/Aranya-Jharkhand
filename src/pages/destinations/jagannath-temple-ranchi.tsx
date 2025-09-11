import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function JagannathTempleRanchiPage() {
  const dest = destinationsData.find((d) => d.id === "jagannath-temple-ranchi");
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}
