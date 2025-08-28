document.addEventListener('DOMContentLoaded', () => {
    positionSparkles();
    window.addEventListener('resize', positionSparkles);
});

function positionSparkles() {
    const sparkles = document.querySelectorAll('.sparkle');
    
    // Daha koyu mor renk paleti
    const colorPalette = [
        '#4B0082', // İndigo
        '#800080', // Mor
        '#551A8B', // Parlak Mor
        '#6A0DAD', // Elektrik Mor
        '#7E1E9C', // Gümüş Mor
        '#872657'  // Tay Mor
    ];

    sparkles.forEach(sparkle => {
        const size = Math.random() * 50 + 10;  
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.paddingTop = '5px';
        sparkle.style.margin = '5px';
        sparkle.style.top = `${Math.random() * window.innerHeight}px`;
        sparkle.style.left = `${Math.random() * window.innerWidth}px`;

        const blurValue = Math.random() * 10 + 2;
        const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        sparkle.style.backgroundColor = chosenColor;
        sparkle.style.filter = `blur(${blurValue}px)`;

        sparkle.style.animationDelay = `${Math.random() * 3}s`;
        
        // Animasyonun sonunda opaklık değerini ayarlayın
        sparkle.addEventListener('animationend', () => {
            const opacityValue = Math.random() * 0.4 + 0.3;  // 0.3 ile 0.7 arasında rastgele bir opacity değeri
            sparkle.style.opacity = opacityValue;
        });
    });
}
