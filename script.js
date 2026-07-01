// 1. Create falling stars
function createStars() {
    const container = document.getElementById('stars');
    for (let i = 0; i < 60; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = star.style.height = Math.random() * 3 + 'px';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.animationDuration = Math.random() * 3 + 2 + 's';
        star.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(star);
    }
}
createStars();

// 2. Countdown logic to July 01
const targetDate = new Date("July 1, 2026 23:00:00").getTime();
setInterval(() => {
    const distance = targetDate - new Date().getTime();
    document.getElementById("days").innerText = Math.floor(distance / 86400000);
    document.getElementById("hours").innerText = Math.floor((distance % 86400000) / 3600000);
    document.getElementById("minutes").innerText = Math.floor((distance % 3600000) / 60000);
    document.getElementById("seconds").innerText = Math.floor((distance % 60000) / 1000);
}, 1000);

// 3. Smooth Step Transition
function nextStep(curr, next) {
    const c = document.getElementById(curr);
    const n = document.getElementById(next);
    c.style.opacity = '0';
    setTimeout(() => {
        c.classList.add('hidden');
        n.classList.remove('hidden');
        setTimeout(() => { n.style.opacity = '1'; n.classList.add('active'); }, 50);
    }, 600);
}

// 1. Khai báo nội dung thư và biến chỉ mục
const message = "Happy birthday to the person I love! I hope you are always peaceful, happy, and have the best things.\n Even though there are times when we don’t fully understand each other, I still want to stay, patiently listen, and go through every day with you using all the tenderness I have and will always have, to make our happiest and most joyful moments. \n Thank you for being here, for letting me love you and walk alongside you.\n I just hope that every birthday of yours from now on, I will be by your side.\n I love you so much 💖";
let charIdx = 0;

// 2. Hàm xử lý hiệu ứng gõ chữ
function typeLetter() {
    if (charIdx < message.length) {
        // Thêm từng ký tự vào thẻ div có ID 'typewriter-text'
        document.getElementById("typewriter-text").innerHTML += message.charAt(charIdx);
        charIdx++;
        // Gọi lại hàm sau mỗi 50ms để tạo hiệu ứng gõ
        setTimeout(typeLetter, 50); 
    } else {
        // Sau khi chạy hết chữ, hiển thị nút chuyển sang Album
        document.getElementById("toStep5").style.display = "inline-block";
    }
}

function nextStep(curr, next) {
    document.getElementById(curr).classList.add('hidden');
    const nextSection = document.getElementById(next);
    nextSection.classList.remove('hidden');
    
    // Nếu màn hình tiếp theo là Step 4 (Lá thư), bắt đầu hiệu ứng gõ chữ
    if(next === 'step4') {
        typeLetter();
    }
}

document.getElementById('toStep2').addEventListener('click', () => nextStep('step1', 'step2'));

document.getElementById('gift-box').addEventListener('click', function() {
    document.querySelector('.gift-wrapper').classList.add('opened');
    setTimeout(() => nextStep('step2', 'step3'), 1200);
});

document.getElementById('toStep4').addEventListener('click', () => nextStep('step3', 'step4'));

//Ảnh 

// Chọn các phần tử
const modal = document.createElement('div');
modal.id = 'imageModal';
modal.className = 'modal'; // Class mặc định là ẩn và mờ
modal.innerHTML = '<img class="modal-content" id="fullImage">';
document.body.appendChild(modal);

const modalImg = document.getElementById("fullImage");

// Cải thiện vòng lặp: đảm bảo bắt được cả ảnh nằm trong các thẻ bị đè (z-index)
document.querySelector('.special-content').addEventListener('click', function(e) {
    // Kiểm tra xem cái mình nhấn vào có phải là thẻ <img> không
    const clickedImg = e.target.closest('.photo-frame img');

    if (clickedImg) {
        modalImg.src = clickedImg.src; // Gán link ảnh
        modal.classList.add('open'); // Kích hoạt hiệu ứng mở mượt mà
    }
});

// Đóng khi click vào nền đen (ngoài ảnh)
modal.addEventListener('click', function(e) {
    if (e.target !== modalImg) {
        modal.classList.remove('open'); // Gỡ bỏ class để đóng mượt mà
    }
});

// Đóng khi nhấn phím ESC
document.addEventListener('keydown', function(e) {
    if (e.key === "Escape" && modal.classList.contains('open')) {
        modal.classList.remove('open');
    }
});

