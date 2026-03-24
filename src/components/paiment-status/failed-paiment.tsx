import React from 'react';
import { useLocation } from 'react-router-dom';

const FailedPaiment: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('orderId');

  return (
    <div className="bg-white p-5 rounded-lg shadow-md max-w-md mx-auto flex flex-col items-center justify-center mt-40 mb-80">
      <h1 className="text-gray-800 text-2xl font-bold mb-4">Désole</h1>
      <p className="text-gray-600 text-[35px] mb-4">Paiement refusé</p>
      <div className="font-semibold text-[12px]">
        ORDER_ID: {orderId}
      </div>
    </div>
  );
};

export default FailedPaiment;