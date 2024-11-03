// DOM이 변경될 때를 감지하기 위해 MutationObserver 사용
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
            addClickEventListener();
        }
    });
});

// 옵션을 설정하여 전체 페이지에서 DOM 변경 사항 감시
observer.observe(document.body, { childList: true, subtree: true });

// 클릭 이벤트 리스너 추가 함수
function addClickEventListener() {
    document.removeEventListener("click", handleClickEvent);
    document.addEventListener("click", handleClickEvent);
}

// 클릭 이벤트 핸들러
function handleClickEvent(event) {
    // 유튜브 영상 플레이어 영역만 감지
    const videoPlayer = event.target.closest('ytd-video-renderer') || event.target.closest('video');
    if (videoPlayer) {
        // 클릭된 위치의 좌표로 랜덤 아이콘 표시
        showRandomIcon(event.pageX, event.pageY);
    }
}

// 아이콘을 랜덤하게 표시하는 함수
function showRandomIcon(clickX, clickY) {
    // 아이콘 이미지 경로 (이미지 파일은 `icons/` 폴더에 있어야 합니다)
    const iconSrc = chrome.runtime.getURL('/icons/icon16.png');  // 크롬 확장에서 경로 설정
    const icon = document.createElement('img');
    icon.src = iconSrc;
    icon.style.position = 'absolute';
    icon.style.zIndex = '9999';
    icon.style.width = '50px';  // 아이콘 크기
    icon.style.height = '50px'; // 아이콘 크기

    // 클릭된 좌표를 기반으로 랜덤한 위치 변경
    const offsetX = Math.floor(Math.random() * 100) - 50; // X축에서 -50~+50 사이 랜덤 오프셋
    const offsetY = Math.floor(Math.random() * 100) - 50; // Y축에서 -50~+50 사이 랜덤 오프셋

    icon.style.left = `${clickX + offsetX}px`;
    icon.style.top = `${clickY + offsetY}px`;

    // 페이지에 아이콘 추가
    document.body.appendChild(icon);

    // 5초 후에 아이콘 제거
    setTimeout(() => {
        document.body.removeChild(icon);
    }, 5000);
}

// 페이지 로드 시 초기 이벤트 리스너 추가
addClickEventListener();
