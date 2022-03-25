## 📑 프로젝트 소개

WANTED & CODESTATES 프리온보딩 코스

오드컨셉 개인 과제 입니다.

<br>

### < 오드 컨셉 >

PROJECT PERIOD: 2022.03.21 ~ 2022.03.25

<br>

[배포링크](https://wanted-codestates-project-5.netlify.app/)

<br>

## ✨ 주요 기능
### ✅ 구현 사항

1️⃣번 과제
- 키워드/ 상품코드/ 이미지 URL로 data에서 검색이 가능하게 구현 했습니다.
- 검색창에 검색어가 없으면 검색이 불가능 합니다.
- 검색할 수 없는 검색어를 예외처리 하였습니다.
- 키워드로 검색을 하면 grid view로 키워드를 포함하고 있는 상품들을 검색결과로 보여주게 구현했습니다.
- 상품코드/ 이미지 URL로 검색을 하면 특정 상품을 왼쪽에 크게 보여주고, 오른쪽에는 키워드 검색과 동일하게 grid-view로 관련 상품들을 보여주게 구현했습니다.
- 관련 상품은 카테고리1의 값이 일치하는 상품으로 로직을 짰습니다.
- grid-view의 상품 이미지를 클릭하면 새창에 이미지를 보여줍니다.
- 반응형으로 구성해 화면의 너비에 따라 보여주는 상품의 가로 갯수가 다릅니다.
- localstorage에 검색했던 키워드와 관련상품을 저장해, 같은 키워드를 검색하면 API 요청을 하지 않고 localstorage에서 불러옵니다.
- 검색했던 기록들을 상단에 보여주어 사용자가 어떤 검색을 하였는지 기록을 보여줍니다.
- 상단의 'PIXEL'로고를 누르면 검색 페이지로 다시 돌아옵니다.


2️⃣번 과제
- HTML5 canvas를 이용하여 이미지 위에 영역을 드래그가 가능하게 구현했습니다.
- 영역 드래그 행위가 끝나면 영역의 이름을 저장하고 list로 보이게 구현했습니다.
- 영역이름이 적힌 list에 checkbox를 이용해서 list에서 선택한 영역이 어떤 영역인지 구별이 가게 구현했습니다.
- list 별로 수정/ 삭제가 가능하게 만들었습니다.
- 드래그를 하는 도중 영역밖으로 나가면 드래그 했던 영역이 사라지도록 예외처리를 했습니다.
- 영역 이름을 저장하지 않으면 그렸던 영역이 사라지게 예외처리를 했습니다.
- localstorage에 영역의 이름과 위치를 저장해 새로고침을 하여도 영역이 남아있게 구현했습니다.



### 🧔 메인
1️⃣번 과제
| <img width="1440" alt="스크린샷 2022-03-25 오전 11 40 37" src="https://user-images.githubusercontent.com/79011228/160043985-696c5cf6-36ac-4b70-92bd-91761f568f5e.png"> | <img width="1440" alt="스크린샷 2022-03-25 오전 11 41 52" src="https://user-images.githubusercontent.com/79011228/160044126-e8155e88-a955-4172-a71b-fd6605547422.png"> |
|--|--|
|<img width="1440" alt="스크린샷 2022-03-25 오전 11 42 07" src="https://user-images.githubusercontent.com/79011228/160044159-dbff19ef-65c0-464d-a7a0-c7cb79322c59.png">|<img width="1440" alt="스크린샷 2022-03-25 오전 11 42 57" src="https://user-images.githubusercontent.com/79011228/160044242-45757f37-7c93-4b00-b587-72e56a026e14.png">|

2️⃣번 과제
|||
|--|--|
|<img width="1440" alt="스크린샷 2022-03-25 오전 11 43 39" src="https://user-images.githubusercontent.com/79011228/160044321-091c23fd-8712-484b-9331-8934cf89cb17.png">|<img width="1440" alt="스크린샷 2022-03-25 오전 11 44 21" src="https://user-images.githubusercontent.com/79011228/160044396-f3a3db6e-738c-41b2-8520-816cf5bcf37b.png">|


## 🛠 사용 기술

front-end

- react
- typescript
- emotion/styled
- lodash (debounce)
- mui (skeleton / pagination)

dev-ops

![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
