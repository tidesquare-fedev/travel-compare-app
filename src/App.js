import React, { useState, useEffect } from 'react';
import { travelProducts } from './data/mockData';
import MainPage from './pages/MainPage';
import ComparisonPage from './components/comparison/ComparisonPage';

function App() {
  // --- 상태 관리 ---
  const [products, setProducts] = useState([]); // API로부터 받아온 상품 목록
  const [selectedItems, setSelectedItems] = useState([]);
  const [page, setPage] = useState('main');
  
  // 로딩 및 오류 상태 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 데이터 Fetching ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const mockApiResponse = [
          { id: 1, type: '패키지', name: '[괌 대한항공 저녁출발] 괌 리가로얄 5일', imageUrl: 'https://placehold.co/300x200/818CF8/FFFFFF?text=Guam+Package', price: 1291663, reviews: { rating: 4.5, count: 120 }, location: '괌', duration: '3박 5일', departurePoint: '인천', airline: '대한항공', specialPerks: '공항-호텔 픽업/샌딩 포함', shopping: '2회 (면세점, 기념품샵)', tip: '가이드/기사 경비 불포함', visa: 'K-ESTA 필요', schedule: '1일차: 인천 출발, 2일차: 괌 도착 및 호텔 휴식, 3일차: 전일 자유시간, 4일차: 사랑의 절벽 및 시내 관광, 5일차: 괌 출발 및 인천 도착' },
          { id: 2, type: '티켓', name: '[공식] 오사카 유니버설 스튜디오 재팬 1일 이용권', imageUrl: 'https://placehold.co/300x200/FDBA74/FFFFFF?text=USJ+Ticket', price: 86000, reviews: { rating: 4.8, count: 10500 }, location: '일본, 오사카', duration: '구매 후 90일 내 사용', includes: '스튜디오 패스 (1일)', excludes: '익스프레스 패스, 식음료', confirmationStatus: '즉시 확정', howToUse: '모바일 바우처 제시 후 입장', schedule: '개장 시간: 09:00 ~ 21:00 (일자별 변동), 추천 어트랙션: 해리포터, 미니언 파크' },
          { id: 3, type: '패키지', name: '[도쿄 3박4일] 시부야 스카이 & 디즈니랜드', imageUrl: 'https://placehold.co/300x200/60A5FA/FFFFFF?text=Tokyo+Package', price: 899000, reviews: { rating: 4.7, count: 88 }, location: '일본, 도쿄', duration: '3박 4일', departurePoint: '부산', airline: '에어부산', specialPerks: '디즈니랜드 1일 이용권 포함', shopping: '1회 (시내 면세점)', tip: '가이드/기사 경비 포함', visa: '무비자', schedule: '1일차: 나리타 도착, 2일차: 디즈니랜드 전일, 3일차: 시부야 스카이 및 자유시간, 4일차: 아사쿠사 관광 후 공항 이동' },
          { id: 4, type: '티켓', name: '파리 루브르 박물관 우선 입장권', imageUrl: 'https://placehold.co/300x200/C084FC/FFFFFF?text=Louvre+Ticket', price: 25000, reviews: { rating: 4.9, count: 22130 }, location: '프랑스, 파리', duration: '지정일, 지정 시간 사용', includes: '루브르 박물관 영구 컬렉션 입장', excludes: '특별 전시, 오디오 가이드', confirmationStatus: '예약 후 24시간 내 확정', howToUse: '예약 확정서 및 여권 제시', schedule: '지정한 시간 30분 전 도착 권장, 필수 관람작: 모나리자, 밀로의 비너스, 사모트라케의 니케' },
          { id: 5, type: '패키지', name: '[다낭 3박5일] 바나힐 & 호이안 야경투어', imageUrl: 'https://placehold.co/300x200/34D399/FFFFFF?text=Da+Nang', price: 750000, reviews: { rating: 4.6, count: 254 }, location: '베트남, 다낭', duration: '3박 5일', departurePoint: '인천', airline: '비엣젯항공', specialPerks: '전신 마사지 1회 포함', shopping: '2회 (라텍스, 잡화점)', tip: '가이드/기사 경비 포함', visa: '무비자', schedule: '1일차: 인천 출발, 2일차: 바나힐 국립공원, 3일차: 호이안 구시가지 및 야경투어, 4일차: 자유시간 및 공항 이동, 5일차: 인천 도착' },
          { id: 6, type: '티켓', name: '방콕 마하나콘 스카이워크 입장권', imageUrl: 'https://placehold.co/300x200/FBBF24/FFFFFF?text=Bangkok', price: 32000, reviews: { rating: 4.8, count: 8750 }, location: '태국, 방콕', duration: '지정일 사용', includes: '전망대 및 유리 트레이 입장', excludes: '루프탑 바 음료', confirmationStatus: '즉시 확정', howToUse: '모바일 바우처 제시', schedule: '운영 시간: 10:00 - 24:00, 마지막 입장 23:00' },
          { id: 7, type: '패키지', name: '[스위스 일주] 융프라우 & 마테호른 7박 9일', imageUrl: 'https://placehold.co/300x200/F87171/FFFFFF?text=Swiss', price: 3490000, reviews: { rating: 4.9, count: 92 }, location: '스위스', duration: '7박 9일', departurePoint: '인천', airline: '루프트한자', specialPerks: '융프라우 VIP 패스, 고르너그라트 산악열차', shopping: '없음', tip: '가이드/기사 경비 포함', visa: '무비자(ETIAS 예정)', schedule: '취리히, 루체른, 인터라켄, 체르마트 등 주요 도시 방문 및 알프스 관광' },
          { id: 8, type: '티켓', name: '뉴욕 브로드웨이 라이온킹 뮤지컬', imageUrl: 'https://placehold.co/300x200/60A5FA/FFFFFF?text=New+York', price: 180000, reviews: { rating: 5.0, count: 15000 }, location: '미국, 뉴욕', duration: '지정일, 지정 시간', includes: '오케스트라석 또는 메자닌석', excludes: '교통편, 식사', confirmationStatus: '예약 후 48시간 내 확정', howToUse: 'E-티켓 제시', schedule: '공연 시간 약 2시간 30분, 인터미션 1회 포함' },
          { id: 9, type: '패키지', name: '[제주 2박3일] 완전자유 렌터카 여행', imageUrl: 'https://placehold.co/300x200/A78BFA/FFFFFF?text=Jeju', price: 299000, reviews: { rating: 4.4, count: 530 }, location: '대한민국, 제주', duration: '2박 3일', departurePoint: '김포', airline: '제주항공', specialPerks: '중형 렌터카 48시간 포함', shopping: '없음', tip: '자유여행 상품', visa: '내국인 불필요', schedule: '항공 및 렌터카 외 모든 일정 자유' },
      ];
      setProducts(mockApiResponse);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- 핸들러 함수들 (기존과 동일) ---
  const handleSelectItem = (product) => {
    setSelectedItems((prevItems) => {
      const isAlreadySelected = prevItems.some((item) => item.id === product.id);
      if (isAlreadySelected) {
        return prevItems.filter((item) => item.id !== product.id);
      } else {
        if (prevItems.length < 4) {
          return [...prevItems, product];
        }
        alert("최대 4개까지만 비교할 수 있습니다.");
        return prevItems;
      }
    });
  };

  const handleRemoveItem = (productId) => {
    setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };
  
  const handleResetSelection = () => {
    setSelectedItems([]);
  };

  const navigate = (targetPage) => {
    setPage(targetPage);
  };

  // --- 렌더링 로직 ---
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">로딩 중...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">오류: {error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 relative">
        {page === 'main' && (
          <MainPage 
            products={products}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onNavigate={() => navigate('comparison')}
          />
        )}
        {page === 'comparison' && (
          <ComparisonPage 
            selectedItems={selectedItems}
            onRemoveItem={handleRemoveItem}
            onReset={handleResetSelection}
            onNavigate={() => navigate('main')}
          />
        )}
      </div>
    </div>
  );
}

export default App;