import React, { useState } from 'react';
import { travelProducts } from './data/mockData';
import ProductList from './components/product/ProductList';
import ComparisonPage from './components/comparison/ComparisonPage';

export default function App() {
  const [view, setView] = useState('productList'); // 'productList' or 'comparison'
  const [comparisonItemIds, setComparisonItemIds] = useState([]);

  const handleAddToCart = (id) => {
    if (!comparisonItemIds.includes(id)) {
      setComparisonItemIds(prev => [...prev, id]);
    }
  };

  const handleRemoveFromCart = (id) => {
    setComparisonItemIds(prev => prev.filter(itemId => itemId !== id));
  };
  
  const comparisonItems = travelProducts.filter(p => comparisonItemIds.includes(p.id));

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => setView('productList')}>✈️ 여행 상품 VS</h1>
            <nav>
                <button onClick={() => setView('productList')} className={`px-4 py-2 rounded-md font-semibold transition-colors ${view === 'productList' ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-blue-600'}`}>상품 목록</button>
                <button onClick={() => setView('comparison')} className={`px-4 py-2 rounded-md font-semibold transition-colors ${view === 'comparison' ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-blue-600'}`}>비교함</button>
            </nav>
        </div>
      </header>
      <main className="container mx-auto">
        {view === 'productList' ? (
          <ProductList
            products={travelProducts}
            onAddToCart={handleAddToCart}
            comparisonItems={comparisonItemIds}
            onGoToComparison={() => setView('comparison')}
          />
        ) : (
          <ComparisonPage
            comparisonItems={comparisonItems}
            onRemoveFromCart={handleRemoveFromCart}
            onGoBack={() => setView('productList')}
            allProducts={travelProducts}
          />
        )}
      </main>
      <footer className="text-center py-6 mt-8 bg-white border-t text-gray-500 text-sm">
        © 2025 Travel Compare Service. All rights reserved.
      </footer>
    </div>
  );
}
