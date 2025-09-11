import { useParams, useNavigate } from "react-router-dom";
import destinationsData from "../../data/destinationsData";
import { motion } from "motion/react";
import DestinationFull from "../../components/DestinationFull";

export function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dest = destinationsData.find((d) => d.id === id);

  if (!dest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Destination not found</h2>
          <button
            onClick={() => navigate("/destinations")}
            className="mt-4 px-4 py-2 bg-[#18B668] text-white rounded-lg"
          >
            Back to destinations
          </button>
        </div>
      </div>
    );
  }

  return <DestinationFull dest={dest} />;
}

export default DestinationDetail;
