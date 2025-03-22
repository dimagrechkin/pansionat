"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Импорт изображений для базового слайдера
import caImage1 from "..//../public/images/carousel-1.jpeg";
import caImage2 from "..//../public/images/carousel-2.jpeg";
import caImage3 from "..//../public/images/carousel-3.jpeg";
import caImage4 from "..//../public/images/carousel-4.jpeg";
import caImage5 from "..//../public/images/carousel-5.jpeg";

// Импорт изображений для отзывов
import image4 from "..//../public/images/review-1.jpeg";
import image5 from "..//../public/images/review-2.jpeg";
import image6 from "..//../public/images/review-3.jpeg";

// Импорт переводов для отзывов

// Интерфейс для данных изображений
interface ImageData {
  src: string;
  author?: string;
  description?: string;
}

const basicImages: ImageData[] = [
  { src: caImage1 },
  { src: caImage2 },
  { src: caImage3 },
  { src: caImage4 },
  { src: caImage5 },
];

// Используем JSON для установки author и description отзывов

export default function ImageSlider({ sliderType, dict }): JSX.Element {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnFocusIn: false, stopOnMouseEnter: false })
  );

  const reviewImages: ImageData[] = [
    {
      src: image4,
      author: dict.reviews[0].author,
      description: dict.reviews[0].description,
    },
    {
      src: image5,
      author: dict.reviews[1].author,
      description: dict.reviews[1].description,
    },
    {
      src: image6,
      author: dict.reviews[2].author,
      description: dict.reviews[2].description,
    },
  ];

  const images = sliderType === "reviews" ? reviewImages : basicImages;

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full xs:w-full lg:w-2/3 mx-auto"
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Image
                    src={image.src}
                    alt={`Slider Image ${index + 1}`}
                    width={800} // updated intrinsic width
                    height={450} // updated intrinsic height
                    sizes="(max-width: 768px) 640px, (max-width: 1200px) 800px, 800px"
                    loading="lazy"
                    className="rounded-xl object-cover shadow-xl"
                  />
                  {image.author && (
                    <div className="mt-8 text-center backdrop-filter-none">
                      <h3 className="text-xl font-semibold mb-4">
                        {image.author}
                      </h3>
                      <Quote className="text-gray-600 drop-shadow" />
                      <p className="text-gray-600 pb-4 drop-shadow">
                        {image.description}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
