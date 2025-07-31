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
        return <div className="text-center text-gray-400">-</div>;
      }
  
      switch (featureKey) {
        case 'price':
          return <div className="text-center text-base font-semibold text-indigo-600">{`${value.toLocaleString()}원`}</div>;
        case 'reviews':
          return value && typeof value === 'object' ? (
            <div className="flex flex-col items-center">
              <div className="flex items-center text-base">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 font-semibold">{value.rating}</span>
              </div>
              <span className="text-sm text-gray-500">({value.count.toLocaleString()}개)</span>
            </div>
          ) : <div className="text-center text-gray-400">-</div>;
        case 'schedule':
            return (
                <ul className="list-disc list-inside text-sm space-y-1.5 text-left px-2">
                  {String(value || '').split(',').map((detail, index) => (
                    <li key={index} className="text-gray-700">{detail.trim()}</li>
                  ))}
                </ul>
            );
        default:
          return <div className="text-center text-sm text-gray-800">{Array.isArray(value) ? value.join(', ') : String(value)}</div>;
      }
    };
  
    return (
        <div className="overflow-x-auto shadow-xl rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white/75 backdrop-blur-sm z-20">
              <tr>
                <th scope="col" className="sticky left-0 bg-white/75 backdrop-blur-sm px-6 py-4 text-sm font-semibold text-gray-900 z-30">상품 정보</th>
                {items.map((item, index) => (
                  <th key={item.id} scope="col" className="px-6 py-4 text-center min-w-[220px]">
                    <div className="flex flex-col items-center gap-3">
                      <img src={item.imageUrl || item.image} alt={item.name} className="w-full h-28 object-cover rounded-lg" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/240x160/cccccc/ffffff?text=Image+Error'; }}/>
                      <span className="font-bold text-sm text-gray-800">{item.name}</span>
                      <button onClick={() => onRemoveItem(item.id)} className="text-gray-400 hover:text-red-600 transition-colors"><TrashIcon /></button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {featuresToShow.map((feature, featureIndex) => (
                <tr key={feature.key} className={featureIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'}>
                  <th scope="row" className={`sticky left-0 px-6 py-5 font-semibold text-gray-700 whitespace-nowrap align-top text-sm z-10 ${featureIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'}`}>{feature.label}</th>
                  {items.map((item) => (
                    <td key={item.id} className="px-6 py-5 align-top">
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