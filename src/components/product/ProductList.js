function ProductList({ products, onAddToCart, comparisonItems, onGoToComparison }) {
    const buttonBaseStyle = "w-full mt-4 h-12 px-4 rounded-lg font-normal text-base leading-[1.4] transition-colors duration-300 flex items-center justify-center";
    const enabledStyle = "bg-[#01C5FD] hover:bg-[#00b4e6] text-black";
    const disabledStyle = "bg-gray-300 text-gray-500 cursor-not-allowed";
  
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">여행 상품 목록</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <span className="text-xs font-semibold text-blue-500 bg-blue-100 py-1 px-2 rounded-full self-start">{product.type}</span>
                <h2 className="text-xl font-semibold text-gray-900 mt-2 flex-grow">{product.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{product.location}</p>
                <p className="text-lg text-blue-600 font-bold mt-2">{product.price.toLocaleString()}원</p>
                <button
                  onClick={() => onAddToCart(product.id)}
                  disabled={comparisonItems.includes(product.id)}
                  className={`${buttonBaseStyle} ${
                    comparisonItems.includes(product.id) ? disabledStyle : enabledStyle
                  }`}
                >
                  {comparisonItems.includes(product.id) ? '비교함에 있음' : '비교함에 담기'}
                </button>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={onGoToComparison}
          className={`fixed bottom-8 right-8 h-12 px-5 rounded-full shadow-lg flex items-center transition-transform duration-300 hover:scale-110 z-10 font-normal text-base leading-[1.4] ${enabledStyle}`}
        >
          비교함 가기
          <span className="ml-2 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {comparisonItems.length}
          </span>
        </button>
      </div>
    );
  }

  export default ProductList;