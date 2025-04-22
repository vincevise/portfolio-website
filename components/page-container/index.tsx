import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?:string
};

const PageContainer = ({ children, title }: Props) => {
  return (
    <div className="w-screen h-screen p-8">
      <div className="w-full h-[calc(100vh-96px)] mt-10 overflow-hidden  rounded-xl border-2 border-black  shadow-[2px_2px_0px_1px_#000000] relative">
        {title && 
            <div className='inline-block absolute left-3 top-3 bg-white border border-gray-600 text-sm rounded-md px-4 py-1 z-[40]'>
                    {title}
            </div>
        }
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
