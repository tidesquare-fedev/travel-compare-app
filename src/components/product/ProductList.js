import { CheckIcon } from '../common/Icons';

const ProductList = ({ products, selectedItems, onSelectItem }) => {
  const isSelected = (product) => selectedItems.some((item) => item.id === product.id);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center mb-8">여행 상품 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
            <div className="relative">
                <img className="w-full h-40 object-cover" src={product.imageUrl} alt={product.name} onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/300x200/cccccc/ffffff?text=Image+Error'; }}/>
                <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full text-white ${product.type === '패키지' ? 'bg-blue-500' : 'bg-orange-500'}`}>
                    {product.type}
                </span>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 flex-grow">{product.name}</h3>
              <p className="text-indigo-600 font-bold mt-2 text-xl">{product.price.toLocaleString()}원</p>
              <button
                onClick={() => onSelectItem(product)}
                disabled={!isSelected(product) && selectedItems.length >= 4}
                className={`w-full mt-4 py-2 px-4 rounded-md font-semibold text-white transition-colors duration-300 flex items-center justify-center
                  ${isSelected(product)
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed'
                  }`}
              >
                {isSelected(product) ? <CheckIcon /> : '비교하기'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
