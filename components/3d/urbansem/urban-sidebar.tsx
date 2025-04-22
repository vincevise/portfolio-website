import Image from 'next/image'
import React from 'react'


const  UrbanSidebar = () => {
  return (
    <div className='w-full flex flex-col space-y-4 text-sm'>
         <Image alt='site' width={200} height={200} className='w-full h-auto object-contain' src={'/3d/urban/data/first.jpg'}  />
          <div className="border-b pb-2">
            <h3 className="font-semibold">SITE AREA:</h3>
            <p>3500 SQM</p>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold">ADDRESS:</h3>
            <p>CANAL ROAD, NEAR DHIRAJ SONS, BHIMRAD CANAL ROAD, SURAT.</p>
          </div>
          
          <div className="border-b pb-2">
          <Image alt='site' width={200} height={200} className='w-full h-auto object-contain mb-2' src={'/3d/urban/data/existing-site.jpg'} />
            <h3 className="font-semibold">EXISTING SITE CONDITION:</h3>
            <p className="text-xs">THE CANAL IS INACTIVE IN PRESENT STAGE. IT IS SERVING AS A DEAD DUMPYARD TIME PLACE.</p>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold">RAINFALL INFO:</h3>
            <p className="text-xs">SURAT RECEIVES AN AVERAGE ANNUAL RAINFALL OF ABOUT 1200MM PER YEAR. THE AREA COVERED BY CANAL AND THE SURROUNDING ROAD GETS A RUNOFF WATER QUANTITY OF AROUND 800,000L. THIS AMPLE AMOUNT IS NOT STORED ANYWHERE AND CANNOT BE USED BECAUSE THE WATER IS DRAINED OFF.</p>
          </div>
          
          <div className="border-b pb-2">
            <div className='w-full flex items-center gap-2 mb-2'>
                <Image alt='site' width={200} height={200} className='w-auto h-[150px] object-contain' src={'/3d/urban/data/site.jpg'} gap-2/>
                <Image alt='site' width={200} height={200} className='w-auto h-[150px] object-contain' src={'/3d/urban/data/context.jpg'}/>
            </div>
            <h3 className="font-semibold">LAND USE:</h3>
            <div className="flex mt-1">
              <div className="bg-yellow-700 w-4 h-4"></div>
              <span className="ml-1 text-xs">RESIDENTIAL AREA</span>
            </div>
            <div className="flex mt-1">
              <div className="bg-yellow-500 w-4 h-4"></div>
              <span className="ml-1 text-xs">COMMERCIAL AREA</span>
            </div>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold mb-1">PROPOSAL:</h3>
            <p className='text-xs'>WE ARE PROPOSING A PUBLIC GARDEN WHICH WILL HAVE INJECTION WELLS WHICH WILL DIRECTLY INJECT WATER TO THE GROUND WATER THUS RECHARGING THE GROUND WATER TABLE.</p>
            <p className="mt-2 text-xs">THE WATER FROM THE ROAD WILL GO THROUGH BIOSWALES WHICH WILL BIO FILTERISE THE WATER. THEN IT WILL BE COLLECTED IN THE WELL THROUGH PERCOLATED DRAINAGE PIPE. ABOVE THE WELL THERE IS AN OBSERVATORY SO THAT PEOPLE CAN LOOK INSIDE.</p>
          </div>

          <div className="border-b pb-2">
            <h3 className="font-semibold mb-1">3D</h3>
            <Image alt='site' width={200} height={200} className='w-full h-auto object-contain' src={'/3d/urban/data/3d.jpg'}/>
            <Image alt='site' width={200} height={200} className='w-full h-auto object-contain' src={'/3d/urban/data/3d2.jpg'}/>
          </div>
          <div className="border-b pb-2">
            <h3 className="font-semibold mb-1">PLANS</h3>
            
            <Image alt='site' width={200} height={200} className='w-full h-auto object-contain' src={'/3d/urban/data/plan.png'}/>
          </div>
        </div>
  )
}

export default UrbanSidebar