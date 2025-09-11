import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function ParasnathHillPage() {
  const dest = destinationsData.find((d) => d.id === "parasnath-hill");
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}
