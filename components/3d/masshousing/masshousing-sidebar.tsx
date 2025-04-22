import Image from 'next/image'
import React from 'react'


const MasshousingSidebar = () => {
  return (
    <div className='w-full flex flex-col space-y-4 text-xs pb-10 pt-12'>
          <div className="w-full h-32 relative mb-1">
            <Image 
              src="/3d/masshousing/data/mixed-use-aerial.jpg" 
              alt="Mixed use development aerial view" 
              width={300}
              height={300}
              className="rounded w-full h-auto object-contain"
            />
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-medium text-sm">LOCATION:</h3>
            <p>KHARWAR NAGAR, UDHNA, SURAT, GUJARAT</p>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-medium text-sm">SITE AREA:</h3>
            <p>94486 SQMT</p>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-medium text-sm">BRIEF:</h3>
            <p>MAIN AIM WAS TO DESIGN A MASS HOUSING FOR A COMMUNITY (1500 FAMILIES - 11624 PEOPLE) WHICH IS SELF SUSTAINING ENVIRONMENTALLY, SOCIALLY AND ECONOMICALLY</p>
          </div>
          
          <div className="border-b pb-2">
            <p>THE SITE IS SURROUNDED BY LOT OF FACTORIES AND MILLS WHICH MAKE LOT OF NOISE. APART FROM THE CREEK THE SITE DID NOT HAVE A STRONG CONTEXT WHICH COULD BE CONSIDERED WHILE DESIGNING.</p>
          </div>
          
          <div className="flex justify-between mb-2">
              <Image 
                src="/3d/masshousing/data/site.jpg" 
                alt="Site concept" 
                width={200}
                height={200}
                className="rounded w-full h-auto object-contain"
              />
            
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-medium text-sm">DESIGN:</h3>
            <p>THE ORIENTATION OF THE BUILT FORMS ARE INTROVERTED. THE BUILDING HEIGHTS INCREASE GRADUALLY FROM CENTRE TO THE SITE BOUNDARIES</p>
          </div>
          
          <div className="border-b pb-2">
            <p>SOME BUILT FORMS ARE RAISED FROM THE GROUND WHICH ARE SUPPORTED BY CORES. THESE CORES ALSO SUPPORT THE URBAN FARMING STRUCTURE.</p>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-medium text-sm">COMMERCIAL COMPLEX:</h3>
            <p>THERE IS WATER FRONT AND A PLAZA FACING THE CREEK. A COMMERCIAL COMPLEX WHICH WOULD HAVE OFFICES AND RETAIL SHOPS. THERE IS A CENTRAL MARKET STREET WHICH WOULD HAVE VEGETABLE MARKET, GROCERIES, BAKERY, DAIRY CAFES, ETC.</p>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-medium text-sm">RECREATIONAL COMPLEX:</h3>
            <p>THERE IS A RECREATIONAL COMPLEX WHICH FACES THE RIVER. IT WOULD BE HAVING LIBRARY, GYM AND CAFETERIA.</p>
          </div>
          
           
            <div className="border-b pb-2">
                <h3 className="font-medium text-sm  pb-2">PLANS:</h3>
                <Image 
                src="/3d/masshousing/data/plan.jpg" 
                alt="Plan" 
                width={300}
                height={300}
                className="w-full h-auto object-contain"
                />
            </div>
            <div className="border-b pb-2">
                <h3 className="font-medium text-sm  pb-2">UNIT PLANS:</h3>
                <Image 
                src="/3d/masshousing/data/80sqmt.jpg" 
                alt="Plan" 
                width={300}
                height={300}
                className="w-full h-auto object-contain"
                />
                <Image 
                src="/3d/masshousing/data/120sqmt.jpg" 
                alt="Plan" 
                width={300}
                height={300}
                className="w-full h-auto object-contain"
                />
            </div>
            <div className="border-b pb-2">
                <h3 className="font-medium text-sm  pb-2">SERVICE CORE:</h3>
                <Image 
                src="/3d/masshousing/data/service.jpg" 
                alt="Plan" 
                width={300}
                height={300}
                className="w-full h-auto object-contain"
                />
                <Image 
                src="/3d/masshousing/data/service-3d.jpg" 
                alt="Plan" 
                width={300}
                height={300}
                className="w-full h-auto object-contain"
                />
                 
            </div>
            <div className="border-b pb-2 space-y-1">
                <h3 className="font-medium text-sm  pb-2">3D:</h3>
                <Image 
                src="/3d/masshousing/data/3d-1.jpg" 
                alt="Plan" 
                width={300}
                height={300}
                className="w-full h-auto object-contain"
                />
                <Image 
                src="/3d/masshousing/data/3d-2.jpg" 
                alt="Plan" 
                width={300}
                height={300}
                className="w-full h-auto object-contain"
                />
                 <Image 
                src="/3d/masshousing/data/mixed-use-3d2.jpg" 
                alt="Plan" 
                width={300}
                height={300}
                className="w-full h-auto object-contain"
                />
                <Image 
                src="/3d/masshousing/data/mixed-use-3d.jpg" 
                alt="Plan" 
                width={300}
                height={300}
                className="w-full h-auto object-contain"
                />
                 <Image 
                src="/3d/masshousing/data/3d-3.jpg" 
                alt="Plan" 
                width={300}
                height={300}
                className="w-full h-auto object-contain"
                />
                 
            </div>
        </div>
  )
}

export default MasshousingSidebar