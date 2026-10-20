// Background Icon động
const icons = ['🐱', '🌷', '❤️', '🌸', '✨', '☁️', '💖'];
const container = document.getElementById('iconContainer');

function createIcon() {
    const iconDiv = document.createElement('div');
    iconDiv.classList.add('floating-icon');
    iconDiv.innerText = icons[Math.floor(Math.random() * icons.length)];
    iconDiv.style.left = Math.random() * 100 + 'vw';
    iconDiv.style.fontSize = (Math.random() * 17 + 18) + 'px';
    const duration = Math.random() * 5 + 6;
    iconDiv.style.animationDuration = duration + 's';
    container.appendChild(iconDiv);
    setTimeout(() => { iconDiv.remove(); }, duration * 1000);
}
setInterval(createIcon, 250);
for (let i = 0; i < 20; i++) { setTimeout(createIcon, Math.random() * 4000); }

// Nhập mã pin
let enteredPin = "";
const correctPin = "0803";
const dots = document.querySelectorAll('.heart-indicator span');
const errorMsg = document.getElementById('errorMsg');

function pressNum(num) {
    if (num === 'back') {
        enteredPin = enteredPin.slice(0, -1);
    } else if (num === 'ok') {
        checkPin();
        return;
    } else {
        if (enteredPin.length < 4) { enteredPin += num; }
    }

    dots.forEach((dot, index) => {
        if (index < enteredPin.length) { dot.classList.add('active'); }
        else { dot.classList.remove('active'); }
    });

    if (enteredPin.length === 4) { setTimeout(checkPin, 200); }
}

function checkPin() {
    if (enteredPin === correctPin) {
        document.getElementById('lockScreen').classList.add('hidden');
        document.getElementById('mainScreen').classList.remove('hidden');
    } else {
        errorMsg.innerText = "Mật mã chưa đúng, thử lại nha! ❤️";
        setTimeout(() => {
            enteredPin = "";
            dots.forEach(dot => dot.classList.remove('active'));
            errorMsg.innerText = "";
        }, 1000);
    }
}

// Danh sách lời chúc
const wishes = [
    {
        title: "Gửi nàng một ngày thật đẹp 🌷",
        text: "Chúc bạn một ngày 20/10 ngập tràn hoa thơm, nắng ấm và những điều dịu dàng nhất. Mong bạn luôn được yêu thương bằng sự chân thành, được trân trọng vì chính con người mình và luôn có đủ niềm vui để mỉm cười mỗi ngày. Chúc mọi điều đẹp đẽ sẽ luôn tìm đến bạn!"
    },
    {
        title: "Cảm ơn vì bạn đã đến với thế giới này 💕",
        text: "Cảm ơn bạn vì đã mang đến cho cuộc sống này biết bao điều ấm áp, dù đôi khi chính bạn cũng có những ngày mệt mỏi. Nhân ngày 20/10, mong bạn tạm gác lại những lo toan, dành thời gian chiều chuộng bản thân và nhận về thật nhiều yêu thương."
    }
];

let currentWishIndex = 0;
let typingTimer = null;

// Xử lý khi click vào bó hoa: Vừa nổ icon vừa bật popup thiệp
function handleBouquetClick(event) {
    createBurstEffect(event);
    openPopup();
}

// Hiệu ứng nổ icon bay ra xung quanh vị trí click
function createBurstEffect(event) {
    const burstContainer = document.getElementById('burstContainer');
    const burstIcons = ['❤️', '🌸', '✨', '🌷', '💖', '🐱'];
    
    // Lấy tọa độ vị trí click chuột hoặc chạm
    const rect = document.getElementById('bouquetBtn').getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Tạo ra 12 icon bay tản ra các hướng
    for (let i = 0; i < 12; i++) {
        const icon = document.createElement('div');
        icon.classList.add('burst-icon');
        icon.innerText = burstIcons[Math.floor(Math.random() * burstIcons.length)];
        
        icon.style.left = x + 'px';
        icon.style.top = y + 'px';

        // Tính toán khoảng cách bay ngẫu nhiên theo góc tròn
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 120 + 60;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        icon.style.setProperty('--tx', tx + 'px');
        icon.style.setProperty('--ty', ty + 'px');

        burstContainer.appendChild(icon);

        // Xóa icon sau khi chạy xong hiệu ứng
        setTimeout(() => {
            icon.remove();
        }, 800);
    }
}

function openPopup() {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const textElement = document.getElementById('typedText');

    const wish = wishes[currentWishIndex];
    modalTitle.innerText = wish.title;
    textElement.innerHTML = ""; 
    modalOverlay.classList.remove('hidden');

    // Hiệu ứng gõ chữ từ từ
    let i = 0;
    function typeWriter() {
        if (i < wish.text.length) {
            textElement.innerHTML += wish.text.charAt(i);
            i++;
            typingTimer = setTimeout(typeWriter, 25);
        }
    }
    typeWriter();
}

// Nút bấm "Lời chúc khác >" bên trong popup
function nextWish() {
    clearTimeout(typingTimer);
    currentWishIndex = (currentWishIndex + 1) % wishes.length;
    openPopup();
}

function closePopup() {
    clearTimeout(typingTimer);
    document.getElementById('modalOverlay').classList.add('hidden');
}