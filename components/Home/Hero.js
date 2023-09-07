import Link from "next/link";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Hero = () => {
  return (
    <div>
      {/* <div className="flex bg-[#F2F0F1]">
        <div className="flex-1 flex flex-col gap-9 justify-center items-center">
          <div className="text-6xl font-bold w-9/12">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </div>
          <div className="font-normal text-base text-[#000000a6] w-9/12">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </div>
          <div className="w-9/12">
            <Link
              href={"/"}
              className="p-2 px-4 bg-[#000] rounded-xl text-[#fff]"
            >
              Shop now
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <img src="/img.png" />
        </div>
      </div> */}
      <Carousel autoPlay>
        <div className="flex bg-[#F2F0F1]">
          <div className="flex-1 flex flex-col gap-9 justify-center items-center">
            <div className="text-6xl font-bold w-9/12 text-left">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </div>
            <div className="font-normal text-base text-[#000000a6] w-9/12 text-left">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </div>
            <div className="w-9/12 text-left">
              <Link
                href={"/"}
                className="p-2 px-4 bg-[#000] rounded-xl text-[#fff]"
              >
                Shop now
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <img src="/img.png" />
          </div>
        </div>
        <div className="flex bg-[#F2F0F1]">
          <div className="flex-1 flex flex-col gap-9 justify-center items-center">
            <div className="text-6xl font-bold w-9/12">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </div>
            <div className="font-normal text-base text-[#000000a6] w-9/12">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </div>
            <div className="w-9/12">
              <Link
                href={"/"}
                className="p-2 px-4 bg-[#000] rounded-xl text-[#fff]"
              >
                Shop now
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <img src="/img.png" />
          </div>
        </div>
        <div className="flex bg-[#F2F0F1]">
          <div className="flex-1 flex flex-col gap-9 justify-center items-center">
            <div className="text-6xl font-bold w-9/12">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </div>
            <div className="font-normal text-base text-[#000000a6] w-9/12">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </div>
            <div className="w-9/12">
              <Link
                href={"/"}
                className="p-2 px-4 bg-[#000] rounded-xl text-[#fff]"
              >
                Shop now
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <img src="/img.png" />
          </div>
        </div>
      </Carousel>

      <div className="flex justify-between bg-[#000] py-3 px-4">
        <img src="/versace.png" />
        <img src="/zara.png" />
        <img src="/gucci.png" />
        <img src="/prada.png" />
        <img src="/calvin.png" />
      </div>
    </div>
  );
};

export default Hero;
