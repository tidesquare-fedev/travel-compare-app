// ComparisonPage.jsx
import React from 'react';
import ComparisonTable from './ComparisonTable';
import { ArrowLeftIcon } from '../common/Icons';

const ComparisonPage = ({ selectedItems = [], onRemoveItem = () => {}, onReset = () => {}, onNavigate }) => {
  return (
    <div className="w-full">
      <div className="mb-8">
        <button onClick={onNavigate} className="flex items-center text-gray-600 hover:text-indigo-600 font-semibold">
          <ArrowLeftIcon />
          상품 목록으로 돌아가기
        </button>
      </div>
      {selectedItems.length === 0 ? (
        <div className="text-center py-10 px-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">비교할 상품이 없습니다.</h2>
            <p className="text-gray-500 mt-2">상품 목록에서 상품을 추가해주세요.</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">상품 비교</h2>
            <button onClick={onReset} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
              선택 초기화
            </button>
          </div>
          <div className="bg-white shadow-lg rounded-lg">
            <ComparisonTable items={selectedItems} onRemoveItem={onRemoveItem} />
          </div>
        </>
      )}
    </div>
  );
};

export default ComparisonPage;