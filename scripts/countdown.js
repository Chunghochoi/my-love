// Ngày bắt đầu yêu nhau - 31/12/2023 lúc 00:13:00
const anniversaryDate = new Date(2023, 11, 31, 0, 13, 0);

function updateCountdown() {
    const now = new Date();
    const diff = now - anniversaryDate;
    
    // Tính toán các đơn vị thời gian
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);
    
    // Hiển thị lên trang web
    document.getElementById('years').textContent = years;
    document.getElementById('days').textContent = days % 365;
    document.getElementById('hours').textContent = hours % 24;
    document.getElementById('minutes').textContent = minutes % 60;
    document.getElementById('seconds').textContent = seconds % 60;
}

// Cập nhật mỗi giây
setInterval(updateCountdown, 1000);

// Chạy ngay lần đầu
updateCountdown();
