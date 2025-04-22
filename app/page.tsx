"use client";

import ChipsInputSearch from "@/components/inputs/chips-input-search";
import ItemContainer from "@/components/item-container";
import Image from "next/image";
import React from "react";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS

 

// Explicitly define the component return type
export default function Page(): React.ReactElement {
  return (
    <React.StrictMode>
      <div
        className="px-10 lg:px-0 space-y-4 mt-12 py-8"
        // style={backgroundgrid}
      >
        <div className="w-full max-w-7xl mx-auto border-2 border-black shadow-[2px_2px_0px_1px_#000000] rounded-xl bg-white p-6">
            <div className="text-2xl">
              Hi there I am 
              <span className="pl-2 font-bold">
                Vuram Vincent
              </span>
            </div>
        </div>

        <div className="w-full px-4 max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12">
          <ItemContainer href="/3d/urban" title="Urban Design">
            <Image
              src="/3d/urban/urban.png"
              alt="vav"
              width={400}
              height={400}
              className="w-full h-auto object-cover"
            />
          </ItemContainer>

          <ItemContainer>
            <div className="w-full max-w-[250px]">
              <ChipsInputSearch />
            </div>
          </ItemContainer>
          
          <ItemContainer
            title="Safakat"
            href="/3d/safakat"
          >
            <Image
              src="/3d/safakat/safakathouse.png"
              alt="vav"
              width={400}
              height={400}
              className="w-full h-auto object-contain"
            />
          </ItemContainer>
          
          <ItemContainer title="Residence" href="/3d/residence">
            <Image
              src="/3d/residence/residence5.png"
              alt="vav"
              width={400}
              height={400}
              className="w-full h-auto object-contain"
            />
          </ItemContainer>

          <ItemContainer title="Canteen" href="/3d/canteen">
            <Image
              src="/3d/canteen/canteen.png"
              alt="masshousing"
              width={400}
              height={400}
              className="w-full h-full object-contain"
            />
          </ItemContainer>

          <ItemContainer title="Vav" href="/3d/vav">
            <Image
              src="/3d/vav/vav.png"
              alt="vav"
              width={400}
              height={400}
              className="w-full h-auto object-contain"
            />
          </ItemContainer>
          
          <ItemContainer title="Mass Housing" href="/3d/masshousing">
            <Image
              src="/3d/masshousing/masshousing.jpg"
              alt="masshousing"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </ItemContainer>

          <ItemContainer title="Flow Builder" href="/worflow-builder">
            <Image
              src="/flow-builder.png"
              alt="flow-builder"
              width={200}
              height={200}
              className="w-full h-full object-contain"
            />
          </ItemContainer>
        </div>
      </div>
    </React.StrictMode>
  );
}