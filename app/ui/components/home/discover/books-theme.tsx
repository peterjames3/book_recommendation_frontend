
import Image from "next/image";
import type { FC } from "react";

interface StudentImageProps {
  src: string;
  alt: string;

  rounded: string;
}

const BookImage: FC<StudentImageProps> = ({
  src,
  alt,

  rounded,
}) => {
  return (
    <div
      className={`  ${rounded}`}
      // initial={{ opacity: 0, y: 30 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.5 }}
    >
      <Image
        src={src}
        alt={alt}
        width={200}
        height={300}
        className="w-full  h-full object-fit rounded-lg"
      />
    </div>
  );
};

export default BookImage;