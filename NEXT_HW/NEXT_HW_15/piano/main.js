play = (e) => {
    console.log(e);
    // audio 변수를 html에서 select하세요. audio변수는 누르는 키보드에 해당하는 keycode를 가지고 있는 음악파일(audio 태그)입니다.
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

    // key 변수를 html에서 select하세요. key 변수는 누르는 키보드에 해당하는 keycode를 가진 li 태그입니다.
    const key = document.querySelector(`li[data-key="${e.keyCode}"]`);

    if (audio) {
        audio.play(); //audio.play()는 음원을 재생하는 함수입니다.
        key.classList.add('play'); // 누른 key에 play 클래스를 부여합니다.
    }
};

pause = (e) => {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`li[data-key="${e.keyCode}"]`);

    if (audio) {
        audio.currentTime = 0;
        audio.pause(); //audio.pause()는 음원을 일시정지하는 함수입니다.
        key.classList.remove('play'); // 누른 key에 play 클래스를 제거합니다.
    }
};

window.addEventListener('keydown', play);
window.addEventListener('keyup', pause);
