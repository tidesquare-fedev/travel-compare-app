import React from 'react';
import ProductList from '../components/product/ProductList';
import { ComparisonIcon } from '../components/common/Icons';
import { allFeatures } from '../data/data';


const MainPage = ({ products, selectedItems, onSelectItem, onNavigate }) => {
  return (
    <div className="relative">
      <ProductList 
        products={products}
        selectedItems={selectedItems}
        onSelectItem={onSelectItem}
      />
      {selectedItems.length > 0 && (
        <div className="sticky bottom-8 flex justify-end pr-8 mt-6">
          <button
            onClick={onNavigate}
            className="flex items-center justify-center bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition-transform duration-300 transform hover:scale-105"
            style={{ height: '56px', padding: '0 24px' }}
          >
            <ComparisonIcon />
            <span className="ml-2">비교하기 ({selectedItems.length})</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MainPage;