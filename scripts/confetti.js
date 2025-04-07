// Confetti effect for special moments
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const colors = ['#ff6b8b', '#ff8e9e', '#ffb3c6', '#d3567a', '#ffe5ec'];
    
    // Only show confetti on special interactions
    function showConfetti() {
        // Create particles
        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 10 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 3 + 2,
                angle: Math.random() * 360,
                rotation: Math.random() * 0.2 - 0.1
            });
        }
        
        // Show canvas
        canvas.style.display = 'block';
        
        // Hide after animation
        setTimeout(() => {
            canvas.style.display = 'none';
            particles.length = 0;
        }, 3000);
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.angle);
            
            ctx.fillStyle = particle.color;
            ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
            
            ctx.restore();
            
            particle.y += particle.speed;
            particle.angle += particle.rotation;
            
            // Remove particles that are off screen
            if (particle.y > canvas.height + particle.size) {
                particles.splice(index, 1);
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Show confetti on special occasions
    document.getElementById('play-btn').addEventListener('click', showConfetti);
    document.getElementById('pet-btn').addEventListener('click', showConfetti);
    
    // Also show confetti when the page loads (first time only)
    const firstVisit = localStorage.getItem('firstVisit');
    if (!firstVisit) {
        showConfetti();
        localStorage.setItem('firstVisit', 'true');
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
