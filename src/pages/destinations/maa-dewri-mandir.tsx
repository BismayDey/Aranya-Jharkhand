import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function MaaDewriMandirPage() {
  const dest = destinationsData.find((d) => d.id === "maa-dewri-mandir");
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}
