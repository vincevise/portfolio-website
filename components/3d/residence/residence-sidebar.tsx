'use client'
import React from 'react'
import Image from 'next/image'

const ResidenceSidebar = () => {
  return (
    <div className="flex flex-col w-full overflow-y-auto space-y-4 text-sm">
         {/* Site Map Diagram */}
         <div className="mt-2">
          <Image 
            src="/3d/residence/data/site.jpg" 
            alt="Site Map" 
            width={260} 
            height={180} 
            className="w-full object-contain" 
          />
           <div className="flex text-xs mt-1">
              <div className="flex items-center mr-2">
                <div className="w-4 h-4 bg-[#8d8d8d] mr-1 border"></div>
                <span>NARMAD LIBRARY</span>
              </div>
              <div className="flex items-center mr-2">
                <div className="w-4 h-4 bg-[#484848] mr-1 border"></div>
                <span>COMMERCIAL</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-white mr-1 border"></div>
                <span>RESIDENTIAL</span>
              </div>
            </div>
        </div>
      {/* Location Section */}
      <div className="border-b pb-2">
        <h3 className="font-bold mb-1">LOCATION</h3>
        <p>The site is located opposite to Kavi Narmad Library, Rangila Park, Ghod Dod Road, Athwalines, Surat</p>
      </div>
      
      <div className="border-b pb-2">
        <h3 className="font-bold mb-1">SITE AREA</h3>
        <p>1905 SQMT</p>
      </div>
      
      <div className="border-b pb-2">
        <h3 className="font-bold mb-1">PROGRAM</h3>
        <p>Design a house for the family of eight</p>
        <div className="flex flex-wrap mt-1 text-xs">
          <span className="bg-gray-400 px-2 py-1 mr-1 mb-1">NARMAD LIBRARY</span>
          <span className="bg-gray-400 px-2 py-1 mr-1 mb-1">COMMERCIAL</span>
          <span className="bg-gray-400 px-2 py-1 mr-1 mb-1">RESIDENTIAL</span>
        </div>
        
       
      </div>
      
      {/* Concept Images */}
      <div className="border-b pb-2 w-3/4">
        <h3 className="font-bold mb-1">CONCEPTS</h3>
        <div className="space-y-2">
          <div>
            <p className="text-xs mb-1">WORK PLACE RESIDENCE</p>
            <Image 
              src="/3d/residence/data/concept1.jpg" 
              alt="Work Place Concept" 
              width={260} 
              height={150} 
              className=" object-contain" 
            />
          </div>
          <div>
            <p className="text-xs mb-1">COURTYARDS</p>
            <Image 
              src="/3d/residence/data/concept2.jpg" 
              alt="Courtyards Concept" 
              width={260} 
              height={150} 
              className="w-full object-contain" 
            />
          </div>
          
          {/* Public/Private Zones */}
          <div>
            <Image 
              src="/3d/residence/data/concept3.jpg" 
              alt="Public/Private Zones" 
              width={260} 
              height={150} 
              className="w-full object-contain" 
            />
            <div className="flex text-xs mt-1">
              <div className="flex items-center mr-2">
                <div className="w-3 h-3 bg-blue-300 mr-1"></div>
                <span>PUBLIC</span>
              </div>
              <div className="flex items-center mr-2">
                <div className="w-3 h-3 bg-yellow-300 mr-1"></div>
                <span>PRIVATE</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-300 mr-1"></div>
                <span>PRIVATE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-b pb-2">
        <h3 className="font-bold mb-1">SITE CONTEXT</h3>
        <p>The site is situated in a very dense urban fabric. There are lot of residential and commercial complexes.</p>
      </div>
      
      <div className="border-b pb-2">
        <h3 className="font-bold mb-1">CLIENT</h3>
        <p>The owner of the house is an artist and his wife is a classical dancer. The owner will be living with his parents, two kids, brother and his wife who are both doctors who run a clinic in the nearby commercial complex.</p>
      </div>
      
      <div className="border-b pb-2">
        <h3 className="font-bold mb-1">BRIEF</h3>
        <p>{`The brief was to provide a work space for the artist and classical dancer for conducting classes, along with all the necessary living and private spaces for the house and also a space for functions and festival gathering.`}</p>
      </div>
      
      <div className="border-b pb-2">
        <h3 className="font-bold mb-1">PLANNING</h3>
        <p>{`The planning has an essence of Richard Neutra's peculiar way of planning (Pin Wheel Design).`}</p>
        <p className="mt-1">The work space (dance class and art studio) facing towards the main road junction to get public attention followed by the house.</p>
      </div>
      
     
      <div>
        <h3 className="font-bold mb-1">SPACES</h3>
        <p>There are total 7 bedrooms (3 master bedrooms, 2 guest bedroom, 2 kids bedroom), 3 recreational spaces (gym, home theater, club house), work spaces (dance class on the dance class has foldable doors on both sides which kept open the space can be used for public gathering).</p>
      </div>
    </div>
  )
}

export default ResidenceSidebar