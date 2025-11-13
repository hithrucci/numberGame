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
    gsap
      .timeline()
      .to("#result", {
        repeat: 4,
        y: -20,
        yoyo: true,
        duration: 0.2,
      })
      .to("#result", {
        y: 0,
        duration: 0.2,
      });
  } else if (computerNum < userNum) {
    imgBox.src = "img/down.png";
    gsap
      .timeline()
      .to("#result", {
        repeat: 4,
        y: 20,
        yoyo: true,
        duration: 0.2,
      })
      .to("#result", {
        y: 0,
        duration: 0.2,
      });
  } else if (computerNum == userNum) {
    imgBox.src = "img/bingo.png";
    gsap.to("#result", {
      repeat: 5,
      scale: 2,
      yoyo: true,
      duration: 0.2,
    });
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
    gsap.fromTo(
      "#result",
      {
        filter: "brightness(1)",
      },
      {
        filter: "brightness(0.1)",

        duration: 2,
      }
    );
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
  gsap.to("#result", {
    filter: "brightness(1)",
  });
}
playBtn.addEventListener("click", play);
//play()는 자동으로 함수를 호출
//클릭했을때 함수를 호출하려면 ()를 제거
let back = document.querySelector("#back");
back.addEventListener("mouseenter", () => {
  gsap.to(back, {
    x: -18,
    duration: 0.5,
    scale: 1.3,
  });
});
back.addEventListener("mouseleave", () => {
  gsap.to(back, {
    x: 0,
    duration: 0.5,
    scale: 1,
  });
});
const tutorial = document.querySelector("#tutorial");
const target = document.getElementById("typing");
const text =
  "\n1. 1부터 100까지의 수를 입력하고 START 또는 ENTER\n2. 화면 중앙의 결과 확인(UP,DOWN)\n3. 실패시 Life-1\n4. Life 모두 소진시 Game Over\n5. reset을 클릭해서 재도전!";

let i = 0;
let typingTimeout = null; // setTimeout ID 저장용

function type() {
  // 중간에 tutorial이 꺼져버렸으면 타이핑 중단
  if (!tutorial.classList.contains("on")) return;

  if (i < text.length) {
    target.textContent += text[i];

    let speed = Math.random() * 80 + 40;
    i++;
    typingTimeout = setTimeout(type, speed);
  }
}

tutorial.addEventListener("click", () => {
  tutorial.classList.toggle("on");

  // on 이 된 경우 → 타이핑 시작
  if (tutorial.classList.contains("on")) {
    // 처음부터 다시
    target.textContent = "";
    i = 0;
    type();
  } else {
    // off 된 경우 → 타이핑 중단 + 텍스트 지우기
    clearTimeout(typingTimeout);
    target.textContent = "";
  }
});
