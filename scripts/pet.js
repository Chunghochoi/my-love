class VirtualPets {
    constructor() {
        this.hunger = 50;
        this.happiness = 50;
        this.petMale = document.getElementById('pet-male');
        this.petFemale = document.getElementById('pet-female');
        this.hungerFill = document.getElementById('hunger-fill');
        this.happinessFill = document.getElementById('happiness-fill');
        
        this.initEventListeners();
        this.startNeedsDecay();
        this.updateStats();
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
            this.happiness = Math.max(0, this.happiness - 0.8);
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
            this.petMale.classList.add('sad');
            this.petFemale.classList.add('sad');
            this.petMale.classList.remove('happy');
            this.petFemale.classList.remove('happy');
        } else if (this.hunger > 80 && this.happiness > 80) {
            this.petMale.classList.add('happy');
            this.petFemale.classList.add('happy');
            this.petMale.classList.remove('sad');
            this.petFemale.classList.remove('sad');
        } else {
            this.petMale.classList.remove('happy', 'sad');
            this.petFemale.classList.remove('happy', 'sad');
        }
    }
    
    feed() {
        this.hunger = Math.min(100, this.hunger + 25);
        this.updateStats();
        this.checkMood();
        this.showReaction('🍖', this.petMale);
        this.showReaction('🍗', this.petFemale);
        this.animateEars();
    }
    
    play() {
        if (this.hunger > 20) {
            this.happiness = Math.min(100, this.happiness + 25);
            this.hunger = Math.max(0, this.hunger - 15);
            this.updateStats();
            this.checkMood();
            this.showReaction('🎾', this.petMale);
            this.showReaction('🏐', this.petFemale);
            this.petMale.classList.add('happy-animation');
            this.petFemale.classList.add('happy-animation');
            this.animateTail();
            setTimeout(() => {
                this.petMale.classList.remove('happy-animation');
                this.petFemale.classList.remove('happy-animation');
            }, 500);
        } else {
            this.showReaction('😴', this.petMale);
            this.showReaction('😪', this.petFemale);
        }
    }
    
    pet() {
        this.happiness = Math.min(100, this.happiness + 15);
        this.updateStats();
        this.checkMood();
        this.showReaction('❤️', this.petMale);
        this.showReaction('💕', this.petFemale);
        this.animatePurr();
    }
    
    showReaction(emoji, petElement) {
        const reaction = document.createElement('div');
        reaction.className = 'pet-reaction';
        reaction.textContent = emoji;
        petElement.appendChild(reaction);
        
        reaction.style.animation = 'float-up 1.5s forwards';
        
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
        const tails = document.querySelectorAll('.pet-tail');
        setInterval(() => {
            tails.forEach(tail => {
                if (this.happiness > 70) {
                    tail.style.animation = 'wag-tail 0.5s infinite alternate';
                } else {
                    tail.style.animation = 'none';
                }
            });
        }, 1000);
    }
    
    animateTail() {
        const tails = document.querySelectorAll('.pet-tail');
        tails.forEach((tail, index) => {
            const angle = index === 0 ? -30 : 30;
            tail.style.transform = `rotate(${angle}deg)`;
            setTimeout(() => {
                tail.style.transform = `rotate(${-angle}deg)`;
            }, 200);
            setTimeout(() => {
                tail.style.transform = 'rotate(0deg)';
            }, 400);
        });
    }
    
    animatePurr() {
        this.petMale.style.transform = 'scale(1.05)';
        this.petFemale.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.petMale.style.transform = 'scale(1)';
            this.petFemale.style.transform = 'scale(1)';
        }, 200);
        
        const cheeks = document.querySelectorAll('.cheek');
        cheeks.forEach(cheek => {
            cheek.style.background = '#ffb3c6';
            setTimeout(() => {
                cheek.style.background = '#ff8e9e';
            }, 500);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new VirtualPets();
});
