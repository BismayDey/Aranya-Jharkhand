import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function GhatshilaPage() {
  const dest = destinationsData.find((d) => d.id === "ghatshila");
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}
