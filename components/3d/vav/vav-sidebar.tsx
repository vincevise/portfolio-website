'use client'
import React from 'react'
import Image from 'next/image'

const VavSidebar = () => {
  return (
    <div className="flex flex-col w-full overflow-y-auto space-y-4 text-sm">
    
      
      {/* Main Image */}
      <div className="mb-2">
        <Image 
          src="/3d/vav/data/first.jpg" 
          alt="Vaav" 
          width={260} 
          height={180} 
          className="w-full object-contain" 
        />
      </div>
      
      {/* Location */}
      <div className="border-b pb-2">
        <h3 className="font-bold mb-1">LOCATION</h3>
        <p>KHAMBHAT ANAND, GUJARAT, PIN: 388620 PROPERIT CATEGORY: PRECINCT</p>
      </div>
      
      {/* Property Info */}
      <div className="border-b pb-2">
  
        <div className="flex mb-1">
          <h3 className="font-bold">NAME OF THE PROPERTY : </h3>
          <p className="ml-1">RUNNMUSTERSHWAR MAHADEV TEMPLE</p>
        </div>
       
        <div className="flex">
          <h3 className="font-bold">TYPOLOGY </h3>
          <p className="ml-1">TEMPLE</p>
        </div>
        <div className="flex">
          <h3 className="font-bold">AGE/DATE </h3>
          <p className="ml-1">THE STEPWELL IS 300-400 YEARS OLD BUT THE TEMPLE THAT IT IS SITUATED IN IS ABOUT 80 YEARS OLD (1938)</p>
        </div>
      </div>
      
     
      
      {/* Map */}
      <div className="border-b pb-2 flex items-center   w-full">
      
        <Image 
          src="/3d/vav/data/site.jpg" 
          alt="Location Map" 
          width={260} 
          height={180} 
          className="w-1/2 h-auto object-contain" 
        />
         <Image 
          src="/3d/vav/data/3d.jpg" 
          alt="Location Map" 
          width={260} 
          height={180} 
          className="w-1/2 p-2 h-auto object-contain" 
        />
        
      </div>
      
      {/* Building Plans */}
      <div className="border-b pb-2">
        <h3 className="font-bold mb-1">BUILDING PLANS</h3>
        <Image 
          src="/3d/vav/data/plans.jpg" 
          alt="Section and Elevation" 
          width={260} 
          height={120} 
          className="w-full object-contain mb-2" 
        />
        <Image 
          src="/3d/vav/data/elevation.jpg" 
          alt="Section and Elevation" 
          width={260} 
          height={120} 
          className="w-full object-contain mb-2" 
        />
         
        
    
      </div>

   
      
   
    </div>
  )
}

export default VavSidebar