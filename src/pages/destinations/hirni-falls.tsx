import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function HirniFallsPage() {
  const dest = destinationsData.find((d) => d.id === "hirni-falls");
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}
