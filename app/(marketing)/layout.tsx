import React from 'react';

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-slate-100">
      {/* navbar */}
      <main className="bg-slate-100 pb-20 pt-40">{children}</main>
      {/* footer */}
    </div>
  );
};

export default MarketingLayout;
