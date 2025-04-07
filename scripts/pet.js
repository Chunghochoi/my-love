class VirtualPet {
    constructor() {
        this.hunger = 50;
        this.happiness = 50;
        this.energy = 50;
        this.petElement = document.getElementById('virtual-pet');
        this.hungerFill = document.getElementById('hunger-fill');
        this.happinessFill = document.getElementById('happiness-fill');
        
        // Khởi tạo sự kiện
        this.initEventListeners();
        // Bắt đầu giảm chỉ số
        this.startNeedsDecay();
        // Cập nhật hiển thị
        this.updateStats();
        
        // Thêm hiệu ứng đuôi
        this.setupTailAnimation();
    }
    
    initEventListeners() {
        document.getElementById('feed-btn').addEventListener('click', () => this.feed());
        document.getElementById('play-btn').addEventListener('click', () => this.play());
        document.getElementById('pet-btn').addEventListener('click', () => this.pet());
    }
    
    startNeedsDecay() {
        setInterval(() => {
            this.hunger = Math.max(0, this.hunger - 1);
            this.happiness = Math.max(0, this.happiness - 0.5);
            this.updateStats();
            this.checkMood();
        }, 30000); // Giảm chỉ số mỗi 30 giây
    }
    
    updateStats() {
        this.hungerFill.style.width = `${this.hunger}%`;
        this.happinessFill.style.width = `${this.happiness}%`;
        
        // Đổi màu thanh chỉ số
        this.hungerFill.style.background = this.hunger < 30 ? '#ff4757' : 
                                        this.hunger < 70 ? '#ffa502' : '#2ed573';
        this.happinessFill.style.background = this.happiness < 30 ? '#ff4757' : 
                                           this.happiness < 70 ? '#ffa502' : '#2ed573';
    }
    
    checkMood() {
        if (this.hunger < 20 || this.happiness < 20) {
            this.petElement.classList.add('sad');
            this.petElement.classList.remove('happy');
            this.showReaction('😢');
        } else if (this.hunger > 80 && this.happiness > 80) {
            this.petElement.classList.add('happy');
            this.petElement.classList.remove('sad');
            this.showReaction('😍');
        } else {
            this.petElement.classList.remove('happy', 'sad');
        }
    }
    
    feed() {
        this.hunger = Math.min(100, this.hunger + 20);
        this.updateStats();
        this.checkMood();
        this.showReaction('🍎');
        this.animateEars();
    }
    
    play() {
        if (this.hunger > 20) {
            this.happiness = Math.min(100, this.happiness + 20);
            this.hunger = Math.max(0, this.hunger - 10);
            this.updateStats();
            this.checkMood();
            this.showReaction('🎾');
            this.petElement.classList.add('happy-animation');
            this.animateTail();
            setTimeout(() => {
                this.petElement.classList.remove('happy-animation');
            }, 500);
        } else {
            this.showReaction('😴');
        }
    }
    
    pet() {
        this.happiness = Math.min(100, this.happiness + 10);
        this.updateStats();
        this.checkMood();
        this.showReaction('❤️');
        this.animatePurr();
    }
    
    showReaction(emoji) {
        const reaction = document.createElement('div');
        reaction.className = 'pet-reaction';
        reaction.textContent = emoji;
        this.petElement.appendChild(reaction);
        
        // Hiệu ứng nổi lên
        reaction.style.animation = 'float-up 1.5s forwards';
        
        // Xóa sau khi hiệu ứng kết thúc
        setTimeout(() => {
            reaction.remove();
        }, 1500);
    }
    
    animateEars() {
        const ears = document.querySelectorAll('.ear');
        ears.forEach(ear => {
            ear.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                ear.style.transform = 'translateY(0)';
            }, 300);
        });
    }
    
    setupTailAnimation() {
        const tail = document.querySelector('.pet-tail');
        setInterval(() => {
            if (this.happiness > 70) {
                tail.style.animation = 'wag-tail 0.5s infinite alternate';
            } else {
                tail.style.animation = 'none';
            }
        }, 1000);
    }
    
    animateTail() {
        const tail = document.querySelector('.pet-tail');
        tail.style.transform = 'rotate(30deg)';
        setTimeout(() => {
            tail.style.transform = 'rotate(-30deg)';
        }, 200);
        setTimeout(() => {
            tail.style.transform = 'rotate(0deg)';
        }, 400);
    }
    
    animatePurr() {
        this.petElement.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.petElement.style.transform = 'scale(1)';
        }, 200);
        
        // Hiệu ứng má ửng hồng
        const cheeks = document.querySelectorAll('.cheek');
        cheeks.forEach(cheek => {
            cheek.style.background = '#ffb3c6';
            setTimeout(() => {
                cheek.style.background = '#ff8e9e';
            }, 500);
        });
    }
}

// Khởi tạo thú cưng khi trang web tải xong
document.addEventListener('DOMContentLoaded', () => {
    new VirtualPet();
    
    // Thêm CSS cho hiệu ứng
    const style = document.createElement('style');
    style.textContent = `
        .pet-reaction {
            position: absolute;
            font-size: 2rem;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            opacity: 0;
        }
        
        @keyframes float-up {
            0% { transform: translate(-50%, -50%); opacity: 1; }
            100% { transform: translate(-50%, -150%); opacity: 0; }
        }
        
        .sad .mouth {
            border-bottom: none;
            border-top: 4px solid var(--dark-color);
            border-radius: 30px 30px 0 0;
            width: 40px;
        }
        
        .happy .mouth {
            border-bottom: 4px solid var(--dark-color);
            border-radius: 0 0 30px 30px;
            width: 60px;
        }
        
        .pet-ears {
            position: absolute;
            top: -20px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 30px;
        }
        
        .ear {
            width: 30px;
            height: 40px;
            background-color: var(--accent-color);
            border-radius: 50% 50% 0 0;
            transition: transform 0.3s ease;
        }
        
        .left-ear {
            transform-origin: bottom right;
        }
        
        .right-ear {
            transform-origin: bottom left;
        }
        
        .cheeks {
            position: absolute;
            bottom: 20px;
            width: 100%;
            display: flex;
            justify-content: space-around;
            padding: 0 20px;
        }
        
        .cheek {
            width: 30px;
            height: 20px;
            background-color: #ff8e9e;
            border-radius: 50%;
            opacity: 0.7;
            transition: background-color 0.5s ease;
        }
        
        .nose {
            width: 15px;
            height: 10px;
            background-color: var(--dark-color);
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            margin-top: 10px;
        }
        
        .pet-body {
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            width: 160px;
            height: 120px;
            background-color: var(--accent-color);
            border-radius: 50% 50% 0 0;
            z-index: -1;
        }
        
        .pet-tail {
            position: absolute;
            right: -20px;
            bottom: 40px;
            width: 40px;
            height: 15px;
            background-color: var(--accent-color);
            border-radius: 10px;
            transform-origin: left center;
            transition: transform 0.2s ease;
        }
        
        @keyframes wag-tail {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(30deg); }
        }
    `;
    document.head.appendChild(style);
});
