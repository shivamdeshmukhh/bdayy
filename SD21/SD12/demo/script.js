document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".draggable");
    let activeImage = null;
    let offsetX, offsetY;

    function startDrag(e) {
        e.preventDefault();
        activeImage = e.target;
        let touch = e.touches ? e.touches[0] : e;
        offsetX = touch.clientX - activeImage.getBoundingClientRect().left;
        offsetY = touch.clientY - activeImage.getBoundingClientRect().top;
        activeImage.style.cursor = "grabbing";
        activeImage.style.position = "absolute"; // Ensure the element is positioned properly
    }

    function moveDrag(e) {
        if (!activeImage) return;
        let touch = e.touches ? e.touches[0] : e;
        activeImage.style.left = `${touch.clientX - offsetX}px`;
        activeImage.style.top = `${touch.clientY - offsetY}px`;
    }

    function stopDrag() {
        if (activeImage) activeImage.style.cursor = "grab";
        activeImage = null;
    }

    images.forEach(img => {
        img.addEventListener("mousedown", startDrag);
        img.addEventListener("touchstart", startDrag, { passive: false });
    });

    document.addEventListener("mousemove", moveDrag);
    document.addEventListener("touchmove", moveDrag, { passive: false });
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchend", stopDrag);

    document.getElementById("toggle-mode").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    setTimeout(() => {
        document.getElementById("message").style.display = "block";
        document.getElementById("bg-music").play();
    }, 2000);

    document.getElementById("close-message").addEventListener("click", () => {
        document.getElementById("message").style.display = "none";
    });

    // Floating Hearts Effect
    setInterval(() => {
        let heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "❤";
        document.body.appendChild(heart);

        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.top = `${Math.random() * 100}vh`;
        heart.style.fontSize = `${Math.random() * 25 + 15}px`;

        setTimeout(() => heart.remove(), 5000);
    }, 500);
});
