import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

// Small helper to enumerate files from the public/Gallery folder.
// We assume the public/Gallery directory contains images named 1.jpg, 2.jpg, ...
// and may also include mp4 files. If filenames differ, this can be adjusted.
const galleryFiles = [
  // Try a few common image names present in the public/Gallery folder from repo
  "/Gallery/1.jpg",
  "/Gallery/2.jpg",
  "/Gallery/5.jpg",
  "/Gallery/6.jpg",
  "/Gallery/8.jpg",
  "/Gallery/99.jpg",
  "/Gallery/3.mp4",
  "/Gallery/4.mp4",
  "/Gallery/7.mp4",
];

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => setIndex(i);
  const close = () => setIndex(null);
  const next = (e?: any) => {
    e?.stopPropagation();
    if (index === null) return;
    setIndex((index + 1) % galleryFiles.length);
  };
  const prev = (e?: any) => {
    e?.stopPropagation();
    if (index === null) return;
    setIndex((index - 1 + galleryFiles.length) % galleryFiles.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Gallery</h1>
        <p className="text-white/70 mt-2">
          A curated set of photos and videos from Aaranya Jharkhand.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {galleryFiles.map((src, i) => {
          const isVideo = src.endsWith(".mp4");
          return (
            <motion.button
              key={src}
              onClick={() => open(i)}
              whileHover={{ scale: 1.03 }}
              className="overflow-hidden rounded-xl bg-black/20 p-0"
            >
              {isVideo ? (
                <video
                  src={src}
                  className="w-full h-48 object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img
                  src={src}
                  alt={`gallery-${i}`}
                  className="w-full h-48 object-cover"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {index !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={close}
        >
          <div className="relative max-w-[90%] max-h-[90%] w-full">
            <button
              onClick={close}
              className="absolute right-2 top-2 p-2 rounded-full bg-white/10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={next}
              className="absolute right-12 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>

            <div className="w-full h-full flex items-center justify-center">
              {galleryFiles[index].endsWith(".mp4") ? (
                <video
                  src={galleryFiles[index]}
                  controls
                  autoPlay
                  className="max-h-[80vh] max-w-full rounded-lg shadow-lg"
                />
              ) : (
                <img
                  src={galleryFiles[index]}
                  alt={`large-${index}`}
                  className="max-h-[80vh] max-w-full rounded-lg shadow-lg object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
