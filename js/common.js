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

// 푸터 - 올해가 몇년도 인지 자동으로 계산해서 출력하도록 
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();  //현재 날짜 정보를 가지고 있는 Date객체. 출력결과는 2023