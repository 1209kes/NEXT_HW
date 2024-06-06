document.addEventListener('DOMContentLoaded', function () {
    const smallContainers = document.querySelectorAll('.small_container > div');
    const largeContainer = document.querySelector('.large_container');

    // 작은 컨테이너에 마우스를 올렸을 때 배경색 변화
    smallContainers.forEach((container, index) => {
        container.addEventListener('mouseover', function () {
            if (index === 0) {
                // About에 마우스를 올렸을 때
                container.style.backgroundColor = 'coral'; // 배경색을 코랄색으로 변경
            } else if (index === 1) {
                // Products에 마우스를 올렸을 때
                container.style.backgroundColor = 'lightgreen'; // 배경색을 노란색으로 변경
            } else if (index === 2) {
                // Technology에 마우스를 올렸을 때
                container.style.backgroundColor = 'lightblue'; // 배경색을 연두색으로 변경
            } else if (index === 3) {
                // Downloads에 마우스를 올렸을 때
                container.style.backgroundColor = 'plum'; // 배경색을 보라색으로 변경
            }
        });
        container.addEventListener('mouseout', function () {
            container.style.backgroundColor = ''; // 마우스를 뗐을 때 원래 색으로 변경
        });

        container.addEventListener('click', function () {
            // 클릭한 작은 컨테이너의 인덱스에 따라 내용 변경
            largeContainer.innerHTML = '';

            const h1 = document.createElement('h1');
            const h3 = document.createElement('h3');

            if (index === 0) {
                // 첫 번째 작은 컨테이너(abouts)를 클릭했을 때
                h1.textContent = 'About';
                h3.textContent = 'Custom Software Development Company';
            } else if (index === 1) {
                // 두 번째 작은 컨테이너(products)를 클릭했을 때
                h1.textContent = 'Products';
                h3.textContent = 'Our Latest Products';
            } else if (index === 2) {
                // 세 번째 작은 컨테이너(technology)를 클릭했을 때
                h1.textContent = 'Technology';
                h3.textContent = 'Supreme Space Cap Jjang Tech';
            } else if (index === 3) {
                // 네 번째 작은 컨테이너(downloads)를 클릭했을 때
                h1.textContent = 'Downloads';
                h3.textContent = 'Documents about the Latest Tech and Products';
            }

            largeContainer.appendChild(h1);
            largeContainer.appendChild(h3);
            // 클릭한 작은 컨테이너의 배경색을 가져와서 큰 컨테이너의 배경색으로 설정
            largeContainer.style.backgroundColor = window.getComputedStyle(container).backgroundColor;
        });
    });
});
