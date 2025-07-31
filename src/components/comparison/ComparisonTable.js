import React from 'react';
import { FaStar, FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';

// Create icon components with consistent styling
const StarIcon = () => <FaStar className="text-yellow-400 inline-block mr-1" />;
const CheckIcon = () => <FaCheck className="text-green-500 inline-block mr-2" />;
const ExcludeIcon = () => <FaTimes className="text-red-500 inline-block mr-2" />;
const InfoIcon = () => <FaInfoCircle className="text-blue-500 inline-block mr-2" />;

function ComparisonTable({ itemsToCompare }) {
    const allFeatures = [
        { key: 'price', label: '가격' },
        { key: 'reviews', label: '후기' },
        { key: 'location', label: '지역/도시' },
        { key: 'duration', label: '기간/유효일' },
        { key: 'departurePoint', label: '출발지', type: '패키지' },
        { key: 'airline', label: '항공사', type: '패키지' },
        { key: 'specialPerks', label: '특별 혜택', type: '패키지' },
        { key: 'shopping', label: '쇼핑 정보', type: '패키지' },
        { key: 'tip', label: '팁 정보', type: '패키지' },
        { key: 'visa', label: '비자', type: '패키지' },
        { key: 'includes', label: '포함 내역', type: '티켓' },
        { key: 'excludes', label: '불포함 내역', type: '티켓' },
        { key: 'confirmationStatus', label: '확정 상태', type: '티켓' },
        { key: 'howToUse', label: '이용 방법', type: '티켓' },
        { key: 'schedule', label: '상세일정/정보' },
    ];
    
    const existingFeatureKeys = new Set();
    itemsToCompare.forEach(item => {
        Object.keys(item).forEach(key => existingFeatureKeys.add(key));
    });

    const featuresToDisplay = allFeatures.filter(feature => existingFeatureKeys.has(feature.key));

    const renderCell = (item, featureKey) => {
        const data = item[featureKey];

        if (data === undefined || data === null) {
            return <span className="text-gray-400">-</span>;
        }

        switch (featureKey) {
            case 'price':
                return <span className="text-blue-600 font-bold text-lg">{data.toLocaleString()}원</span>;
            case 'reviews':
                return (
                    <div className="flex items-center">
                        <StarIcon />
                        <span className="ml-1 font-bold">{data.rating}</span>
                        <span className="ml-2 text-gray-600">({data.count.toLocaleString()}개)</span>
                    </div>
                );
            case 'includes':
            case 'specialPerks':
                return (
                    <ul className="list-none space-y-2 text-sm">
                        {data.map((point, index) => (
                            <li key={index} className="flex items-start"><CheckIcon /><span>{point}</span></li>
                        ))}
                    </ul>
                );
            case 'excludes':
                 return (
                    <ul className="list-none space-y-2 text-sm">
                        {data.map((point, index) => (
                            <li key={index} className="flex items-start"><ExcludeIcon /><span>{point}</span></li>
                        ))}
                    </ul>
                );
            case 'schedule':
                return (
                    <ul className="list-none space-y-2 text-sm">
                        {data.map((point, index) => (
                            <li key={index} className="flex items-start"><InfoIcon /><span>{point}</span></li>
                        ))}
                    </ul>
                );
            default:
                return <span>{data}</span>;
        }
    };

    return (
        <div className="w-full overflow-x-auto bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold p-4 bg-gray-50 rounded-t-lg text-gray-800">상품 비교 결과</h2>
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[1000px] border-collapse text-left">
                    <thead>
                        <tr>
                            <th className="p-4 font-semibold text-gray-700 border-b-2 border-gray-200 w-1/6 bg-gray-100 sticky left-0 z-10">항목</th>
                            {itemsToCompare.map(item => (
                                <th key={item.id} className="p-4 font-semibold text-gray-700 border-b-2 border-gray-200">
                                    <div className="flex flex-col items-center text-center">
                                        <img src={item.image} alt={item.name} className="w-36 h-24 object-cover rounded-md mb-2"/>
                                        {item.name}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {featuresToDisplay.map(feature => (
                            <tr key={feature.key} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                                <td className="p-4 font-bold bg-gray-100 align-top sticky left-0 z-10">{feature.label}</td>
                                {itemsToCompare.map(item => (
                                    <td key={item.id} className="p-4 align-top">
                                        {renderCell(item, feature.key)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ComparisonTable;
