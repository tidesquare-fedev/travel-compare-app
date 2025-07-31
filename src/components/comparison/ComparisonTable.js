import React, { useMemo } from 'react';
import { TrashIcon } from '../common/Icons';
import { allFeatures } from '../../data/data';

const ComparisonTable = ({ items, onRemoveItem }) => {
    const featuresToShow = useMemo(() => {
      if (items.length === 0) return [];
      const typesInComparison = new Set(items.map(item => item.type));
      return allFeatures.filter(feature => !feature.type || typesInComparison.has(feature.type));
    }, [items]);
    
    const renderCellContent = (item, featureKey) => {
      const value = item[featureKey];
      
      if (value === undefined || value === null) {
        return <div className="text-center">-</div>;
      }
  
      switch (featureKey) {
        case 'price':
          return <div className="text-center text-sm font-semibold text-indigo-600">{`${value.toLocaleString()}원`}</div>;
        case 'reviews':
          return value && typeof value === 'object' ? (
            <div className="flex flex-col items-center">
              <div className="flex items-center text-sm">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 font-semibold">{value.rating}</span>
              </div>
              <span className="text-xs text-gray-500">({value.count.toLocaleString()}개)</span>
            </div>
          ) : <div className="text-center">-</div>;
        case 'schedule':
          if (!value) return <div className="text-center">-</div>;
          
          // Handle both string and array formats
          const scheduleItems = Array.isArray(value) 
            ? value 
            : typeof value === 'string' 
              ? value.split(',').map(item => item.trim())
              : [];
              
          return scheduleItems.length > 0 ? (
            <ul className="list-disc list-inside text-xs space-y-1 text-left">
              {scheduleItems.map((detail, index) => (
                <li key={index} className="break-words">{detail}</li>
              ))}
            </ul>
          ) : (
            <div className="text-center">-</div>
          );
        default:
          return <div className="text-center text-sm">{Array.isArray(value) ? value.join(', ') : String(value)}</div>;
      }
    };
  
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-500">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-tl-lg align-top">상품 정보</th>
              {items.map((item, index) => (
                <th key={item.id} scope="col" className={`px-6 py-3 text-center ${index === items.length - 1 ? 'rounded-tr-lg' : ''}`}>
                  <div className="flex flex-col items-center">
                    <img src={item.imageUrl || item.image} alt={item.name} className="w-24 h-16 object-cover rounded-md mb-2" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/240x160/cccccc/ffffff?text=Image+Error'; }}/>
                    <span className="font-semibold text-sm">{item.name}</span>
                    <button onClick={() => onRemoveItem(item.id)} className="mt-2 text-red-500 hover:text-red-700"><TrashIcon /></button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featuresToShow.map((feature) => (
              <tr key={feature.key} className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap align-top text-sm">{feature.label}</th>
                {items.map((item) => (
                  <td key={item.id} className="px-6 py-4 align-top">
                    {renderCellContent(item, feature.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default ComparisonTable;