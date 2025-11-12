//요소가져오기
let result = document.querySelector("#result"),
  chance = document.querySelector("#chance"),
  user = document.querySelector("#user"),
  playBtn = document.querySelector("#play"),
  resetBtn = document.querySelector("#reset"),
  imgBox = document.querySelector("#result img"),
  msg = document.querySelector("#msg");
let chances = 5;

//random수
let computerNum;
function randomNum() {
  computerNum = Math.floor(Math.random() * 100 + 1);
}
randomNum();
function play() {
  let userNum = user.value;
  console.log(userNum);
  console.log(computerNum);
  if (userNum < 1 || userNum > 100) {
    alert("잘못입력하셨습니다.");
    return;
  }
  if (computerNum > userNum) {
    imgBox.src = "img/up.png";
  } else if (computerNum < userNum) {
    imgBox.src = "img/down.png";
  } else if (computerNum == userNum) {
    imgBox.src = "img/bingo.png";
    playBtn.disabled = true;
  } else {
    alert("잘못입력하셨습니다.");
    return;
  }
  chances--;
  switch (chances) {
    case 4:
      chance.innerHTML = ` Life : <i class="fa-solid fa-heart"></i><i class="fa-solid fa-heart"></i
        ><i class="fa-solid fa-heart"></i><i class="fa-solid fa-heart"></i
        ><i class="fa-solid fa-heart-crack" style="color: #666"></i>`;
      break;

    case 3:
      chance.innerHTML = ` Life : <i class="fa-solid fa-heart"></i><i class="fa-solid fa-heart"></i
        ><i class="fa-solid fa-heart"></i><i class="fa-solid fa-heart-crack" style="color: #666"></i><i class="fa-solid fa-heart-crack" style="color: #666"></i>`;
      break;
    case 2:
      chance.innerHTML = ` Life : <i class="fa-solid fa-heart"></i><i class="fa-solid fa-heart"></i><i class="fa-solid fa-heart-crack" style="color: #666"></i><i class="fa-solid fa-heart-crack" style="color: #666"></i><i class="fa-solid fa-heart-crack" style="color: #666"></i>`;
      break;
    case 1:
      chance.innerHTML = ` Life : <i class="fa-solid fa-heart"></i><i class="fa-solid fa-heart-crack" style="color: #666"></i><i class="fa-solid fa-heart-crack" style="color: #666"></i><i class="fa-solid fa-heart-crack" style="color: #666"></i><i class="fa-solid fa-heart-crack" style="color: #666"></i>`;
      break;
  }

  if (chances < 1) {
    playBtn.disabled = true;
    playBtn.style.color = "#666";
    chance.innerHTML = ` Life : 
    <i class="fa-solid fa-heart-crack" style="color: #666"></i><i class="fa-solid fa-heart-crack" style="color: #666"></i><i class="fa-solid fa-heart-crack" style="color: #666"></i><i class="fa-solid fa-heart-crack" style="color: #666"></i><i class="fa-solid fa-heart-crack" style="color: #666"></i>`;
    imgBox.src = "img/gameover.png";
  }
}

user.addEventListener("focus", () => {
  user.value = "";
  user.placeholder = "";
});
user.addEventListener("blur", () => {
  user.placeholder = "1부터 100까지의 수를 입력";
});

//초기화
resetBtn.addEventListener("click", reset);
function reset() {
  // result.textContent = "";
  playBtn.style.color = "#00ff2f";
  imgBox.src = "img/title2.png";
  chances = 5;
  chance.innerHTML = ` Life : <i class="fa-solid fa-heart"></i><i class="fa-solid fa-heart"></i
        ><i class="fa-solid fa-heart"></i><i class="fa-solid fa-heart"></i
        ><i class="fa-solid fa-heart"></i
        >`;
  playBtn.disabled = false;
  randomNum();
  user.value = "";
}
playBtn.addEventListener("click", play);
//play()는 자동으로 함수를 호출
//클릭했을때 함수를 호출하려면 ()를 제거
