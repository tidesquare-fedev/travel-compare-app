import React from 'react';
import ComparisonTable from './ComparisonTable';

function ComparisonPage({ comparisonItems, onRemoveFromCart, onGoBack, allProducts }) {
  if (comparisonItems.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">비교할 상품이 없습니다</h2>
        <button
          onClick={onGoBack}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          상품 목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">상품 비교</h1>
        <button
          onClick={onGoBack}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors"
        >
          뒤로 가기
        </button>
      </div>
      
      <ComparisonTable itemsToCompare={comparisonItems} onRemoveFromCart={onRemoveFromCart} />
    </div>
  );
}

export default ComparisonPage;
