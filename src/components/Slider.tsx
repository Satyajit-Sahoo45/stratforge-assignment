import { useEffect, useState } from "react";
import { Circle, CircleDot } from "lucide-react";

interface ImageSliderProps {
  Images: string[];
}

export const ImageSlider = ({ Images }: ImageSliderProps) => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      showNextImage();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [imageIndex]);

  function showNextImage() {
    setImageIndex((index) => {
      if (index === Images.length - 1) return 0;
      return index + 1;
    });
  }

  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return Images.length - 1;
      return index - 1;
    });
  }

  return (
    <section className="relative w-full h-96 max-w-xl mx-auto overflow-hidden">
      <div className="flex w-full h-full overflow-hidden">
        {Images.map((url: string, index: number) => (
          <img
            key={url}
            src={url}
            alt={`Slide ${index}`}
            aria-hidden={imageIndex !== index}
            className="object-cover w-full h-full flex-shrink-0 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(${-100 * imageIndex}%)` }}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
        {Images.map((_, index: number) => (
          <button
            key={index}
            className="w-4 h-4 cursor-pointer transition-transform duration-100 ease-in-out hover:scale-110 focus-visible:scale-110"
            onClick={() => setImageIndex(index)}
          >
            {index === imageIndex ? (
              <CircleDot
                aria-hidden
                className="w-full h-full stroke-white fill-black"
              />
            ) : (
              <Circle
                aria-hidden
                className="w-full h-full stroke-white fill-black"
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};
