import React from 'react';

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto gap-10 w-[1200px]">
      {children}
    </div>
  );
}

export default MainContainer;