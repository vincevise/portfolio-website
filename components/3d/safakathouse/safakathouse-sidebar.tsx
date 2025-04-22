'use client'
import React from 'react'
import Image from 'next/image'

const SafakatHouseSidebar = () => {
  return (
    <div className="flex flex-col w-full overflow-y-auto space-y-4 text-sm">
    
      
      {/* Main Image */}
      <div className="mb-2">
        <Image 
          src="/3d/safakat/data/facade-photo.jpg" 
          alt="Safakat House Facade" 
          width={260} 
          height={180} 
          className="w-full object-contain" 
        />
      </div>
      
      {/* Location */}
      <div className="border-b pb-2">
        <h3 className="font-bold mb-1">LOCATION</h3>
        <p>OPPOSITE MEWA, JAMNADAS SWEETS, NEAR VIJAYA BANK, STATION ROAD, KHAMBHAT, ANAND, GUJARAT</p>
      </div>
      
      {/* Property Info */}
      <div className="border-b pb-2">
        <div className="flex mb-1">
          <h3 className="font-bold">PROPERTY CATEGORY: </h3>
          <p className="ml-1">PRECINCT</p>
        </div>
        <div className="flex mb-1">
          <h3 className="font-bold">OWNERSHIP: </h3>
          <p className="ml-1">PAREKH SHETH</p>
        </div>
        <div className="flex">
          <h3 className="font-bold">BUILT YEAR: </h3>
          <p className="ml-1">100-110 YEARS OLD</p>
        </div>
      </div>
      
      {/* Building Description */}
      <div className="border-b pb-2">
        <p className="text-xs">
          THIS HOUSE WAS BUILT BY NAZAMUDDIN SHETH PAREKH WHO IMPORTED CUTLERY FROM JAPAN VIA THE PORT OF JAPAN NEAR KHAMBHAT.
        </p>
        <p className="text-xs mt-1">
          THE STRUCTURE IS APPROACHED DIRECTLY BY THE MAIN ROAD. THE EASTERN FACADE FACES THE MARKET.
        </p>
        <p className="text-xs mt-1">
          THE HOUSE IS IN THE VICINITY OF SOME OLD JAINA HOUSES. FEW OF THOSE HAVE BEEN NOW CONVERTED INTO SMALL SHOPS ON THE GROUND FLOOR AND RESIDENTIAL PLOT ON THE FIRST FLOOR.
        </p>
      </div>
      
      {/* Map */}
      <div className="border-b pb-2 flex items-center   w-full">
      <Image 
          src="/3d/safakat/data/location-map2.jpg" 
          alt="Location Map" 
          width={260} 
          height={180} 
          className="w-1/2 h-auto object-contain" 
        />
        <Image 
          src="/3d/safakat/data/location-map.jpg" 
          alt="Location Map" 
          width={260} 
          height={180} 
          className="w-1/2 h-auto object-contain" 
        />
        
      </div>
      
      {/* Building Plans */}
      <div className="border-b pb-2">
        <h3 className="font-bold mb-1">BUILDING PLANS</h3>
        <Image 
          src="/3d/safakat/data/section-elevation.jpg" 
          alt="Section and Elevation" 
          width={260} 
          height={120} 
          className="w-full object-contain mb-2" 
        />
        <p className="text-xs text-center mb-1">{`SECTION AA' | FRONT ELEVATION`}</p>
        
        <Image 
          src="/3d/safakat/data/floor-plans.jpg" 
          alt="Floor Plans" 
          width={260} 
          height={180} 
          className="w-full object-contain mt-2 mb-2" 
        />
        <p className="text-xs text-center">GROUND FLOOR | FIRST FLOOR PLAN</p>
        
        <div className="mt-3">
          <p className="text-xs">
            THERE IS A FOUNTAIN IN THE MIDDLE OF THE COURTYARD, UNDER WHICH LIES A HUGE WATER TANK TO PRESERVE RAIN WATER.
          </p>
        </div>
      </div>
      
      {/* Architectural Description */}
      <div className="border-b pb-2">
        <h3 className="font-bold mb-1">ARCHITECTURAL DESCRIPTION</h3>
        <p className="text-xs">
          RESEMBLES COLONIAL STYLE ARCHITECTURE AND ADAPTED TO THE LOCAL LIFESTYLE OF THE PEOPLE. BUILT USING TEAK WOOD, BRICK, TIMBER AND STEEL. SINCE THE EASTERN FACADE FACES THE MARKET/STREET, THE FRONT OF THE HOUSE IS FOLLOWED BY A FLIGHT OF STAIRS WHICH COURTYARD.
        </p>
        <p className="text-xs mt-1">
          THERE ARE ROOMS ON BOTH SIDES OF THE STAIRS. THE HOUSE IS DIVIDED INTO LEVELS THAT ARE CONNECTED BY STAIRCASE ON THE LOWER LEVEL AND THEIR BALCONIES ARE ALSO CONNECTED.
        </p>
      </div>
      
      {/* Additional Images */}
      <div className="border-b pb-2">
        <h3 className="font-bold mb-1">ARCHITECTURAL DETAILS</h3>
        <div className="grid grid-cols-2 gap-1">
          <Image 
            src="/3d/safakat/data/detail-1.jpg" 
            alt="Detail Photo 1" 
            width={125} 
            height={100} 
            className="w-full object-cover" 
          />
          <Image 
            src="/3d/safakat/data/detail-2.jpg" 
            alt="Detail Photo 2" 
            width={125} 
            height={100} 
            className="w-full object-cover" 
          />
          <Image 
            src="/3d/safakat/data/detail-3.jpg" 
            alt="Detail Photo 3" 
            width={125} 
            height={100} 
            className="w-full object-cover" 
          />
          <Image 
            src="/3d/safakat/data/detail-4.jpg" 
            alt="Detail Photo 4" 
            width={125} 
            height={100} 
            className="w-full object-cover" 
          />
        </div>
      </div>
      
      {/* 3D Models */}
      <div className="border-b pb-2">
        <h3 className="font-bold mb-1">3D MODELS</h3>
        <div className="grid grid-cols-2 gap-1">
          <Image 
            src="/3d/safakat/data/3d-model-1.jpg" 
            alt="3D Model 1" 
            width={125} 
            height={90} 
            className="w-full object-cover" 
          />
          <Image 
            src="/3d/safakat/data/3d-model-2.jpg" 
            alt="3D Model 2" 
            width={125} 
            height={90} 
            className="w-full object-cover" 
          />
        </div>
      </div>
      
      {/* Materials */}
      <div>
        <h3 className="font-bold mb-1">MATERIALS</h3>
        <p className="text-xs">
          CAST IRON BALUSTRADE WERE USED IN BALCONIES AND STAIRCASE WHICH WERE IMPORTED FROM EUROPE AND MOST OF THE WOODEN STRUCTURE WERE TEAK WOOD WHICH WAS IMPORTED FROM AFRICA.
        </p>
      </div>
    </div>
  )
}

export default SafakatHouseSidebar