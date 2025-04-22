'use client'
import Image from 'next/image'
import React from 'react'

 

const CanteenSidebar = ( ) => {
  return (
    <div className='w-full flex flex-col space-y-4 text-sm'>
        <Image
                width={300}
                height={300}
                className='w-full h-auto object-contain'
                src={'/3d/canteen/data/site.jpg'}
                alt='Concept'
                layout="responsive"
            />
             <div className="flex ">
              <div className="bg-[#EF4444] w-4 h-4"></div>
              <span className="ml-1 text-xs">SITE</span>
              <div className="bg-[#8D8D8D] w-4 h-4 ml-2"></div>
              <span className="ml-1 text-xs">COLLEGE</span>
            </div>
          <div className="border-b pb-2">
            <h3 className="font-medium">LOCATION:</h3>
            <p>UKA TARSADIA UNIVERSITY, BARDOLI-MAHUVA ROAD, BARDOLI, GUJARAT</p>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-medium">SITE AREA:</h3>
            <p>936 SQMT</p>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-medium">BRIEF:</h3>
            <p>DESIGN A CANTEEN FOR OUR COLLEGE</p>
            <p className="mt-2 text-xs">THE PROGRAM TO DESIGN A CANTEEN FOR THE STUDENTS OF ARCHITECTUE COLLEGE IN OUR UNIVERSITY. THE EXISTING CANTEEN HAD A VERY LIMITED SPACE</p>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-medium">CONCEPT:</h3>
            <Image
                width={300}
                height={300}
                className='w-full h-auto object-contain'
                src={'/3d/canteen/data/concept.jpg'}
                alt='Concept'
                layout="responsive"
            />
            <div className="flex mt-1">
              <div className="bg-yellow-300 w-4 h-4"></div>
              <span className="ml-1 text-xs">FOOT BRIDGE</span>
              <div className="bg-red-500 w-4 h-4 ml-2"></div>
              <span className="ml-1 text-xs">AMPHITHEATER</span>
              <div className="bg-blue-500 w-4 h-4 ml-2"></div>
              <span className="ml-1 text-xs">CANTEEN</span>
            </div>
          </div>
          
          <div className="text-xs border-b pb-2">
            <p>THE DESIGN REVOLVED AROUND THE IDEA ALONG WITH GIVING A SPACE WHERE WE CAN EAT THERE ARE OPPORTUNITIES FOR RECREATIONAL ACTIVITIES, A PLACE FOR RANDEVOUS, ALSO TO CONDUCT INFORMAL LECTURES OR CLASSES.</p>
          </div>
          
          <div className="text-xs border-b pb-2">
            <p>THE PLANNING IS ORIENTATION OF 3 L SHAPE: AMPHITHEATER, FOOT BRIDGE AND CANTEEN. THE ARRANGEMENT EVENTUALLY MADE A COURTYARD AT THE CENTRE</p>
          </div>
          
          <div className="text-xs">
            <p>ON THE GROUND FLOOR THERE IS THE CANTEEN KITCHEN, SITTING SPACES AND AMPHITHEATER. SECOND FLOOR IS A FOOT BRIDGE IT HAS BENCHES AND ALSO THERE IS BENCH WHICH RUNS ALONG THE PERIPHERY WHICH IS SUPPORTED BY THE COLLONADE STRUCTURE AND THE RAILING ACT AS A BACKREST.</p>
          </div>
        </div>
  )
}

export default CanteenSidebar