const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");

//.search 요소를 가지고 있는 아무거나 선택해도 focus가 적용됨
searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});


//요소에 focus가 되면 placeholder가 생기고 해제되면 placeholder 사라짐
searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

// 스크롤을 따라 내리다보면 어느 순간 배지가 자연스럽게 사라지도록
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');
//window는 브라우저 창을 가리킨다고 할 수 있다 (=사용자가 보는 화면 자체)
window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    //배지 숨기기
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    //to-up 버튼 보이기
    gsap.to(toTopEl,.2,{
      x:0
    });
  }
  else {
    //배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    //to top 버튼 숨기기
    gsap.to(toTopEl,.2, {
      x: 100
    });
  }
}, 300));



toTopEl.addEventListener('click', function(){
  gsap.to(window, .7, {
    scrollTo: 0 
    //0.7초 동안 화면(스크롤)의 위치를 0픽셀 지점으로 옮겨준다
    //이때 scrollTo 옵션은 scrollToPlugin을 가져왔기 때문에 사용 가능한 것이다 
  });
});



// 배너의 요소들 순차적으로 보이게 하기
const fadeEls = document.querySelectorAll(".visual .fade-in");
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, //순차적으로 delay값을 주기 위해 index+1
    opacity: 1
  });
});

// swiper
// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',  //슬라이드가 위로 넘어감
  autoplay: true,//자동으로 슬라이드를 재생
  loop: true //반복 재생 여부를 설정
});

// 이미지 슬라이드 
new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수
  spaceBetween: 10, //슬라이드 사이 여백
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: '.promotion .swiper-pagination',  //페이지 번호 요소 선택자
    clickable: true //사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',  //이전 슬라이드 보는 버튼
    nextEl: '.promotion .swiper-next'  //다음 슬라이드 보는 버튼
  }
});

// 다중 요소 슬라이드 부분
new Swiper('.awards .swiper-container',{
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

// 토글 promotion 열고 닫기 
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion  // 특정 변수의 값을 지속적으로 반댓값으로 전환시켜주는 코드
  if (isHidePromotion) {
    //숨김처리!
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리!
    promotionEl.classList.remove('hide');

  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector, //인자1. 선택자
    random(1.5, 2.5), //인자2. 애니메이션 동작시간
    { //인자 3. 옵션
      y: size, //y축으로 얼만큼 움직일 것인가?
      repeat: -1, //무한반복
      yoyo: true, //한번 내려왔다면 다시 위아래로
      ease: Power1.easeInOut,
      delay: random(0, delay)
    });
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

// scrollmagic
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller()); 
    //new ScrollMagic.Controller()은 스크롤매직에서 추가한 옵션들을 내부의 컨트롤러들에 내용을 할당해서 실제로 동작할 수 있는 구조를 만드는데에 사용
  //scene()는 스크롤매직 자바스크립트 라이브러리를 통해서 특정한 요소를 감시하는 옵션을 지정해줌
  //scene함수를 통해서 우리가 제어하려고 하는 특정한 섹션들이 화면에 보이는지 여부를 감시할 수 있다
  //setClassToggle의 class는 html의 클래스 속성을 toggle형태로 제어해준다 
});

// 푸터 - 올해가 몇년도 인지 자동으로 계산해서 출력하도록 
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();  //현재 날짜 정보를 가지고 있는 Date객체. 출력결과는 2023
