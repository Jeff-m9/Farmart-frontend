import { useEffect, useState } from "react";

const images = [
  "https://services.thebmc.co.uk/Handlers/ArticleImageHandler.ashx?id=3215&index=0&w=605&h=434",
  "https://www.breedr.co/hubfs/Optimized-Sheep%20gestation.jpeg",
  "https://www.themarketfoodshop.com/?attachment_id=3244",
];

export function ImageCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slideshow Images */}
      {images.map((image, i) => (
        <img
          key={i}
          src={image}
          alt={`Slide ${i}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity brightness-50 duration-1000 ease-in-out ${
            index === i ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
    </div>
  );
}
