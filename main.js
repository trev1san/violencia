// =========================
// SOM DE CLIQUE
// =========================

function playClickSound() {
    const audio = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");
    audio.volume = 0.3;
    audio.play().catch(() => {});
}


// =========================
// SOM DO CARROSSEL
// =========================

const slideSound = new Audio("https://files.catbox.moe/aortqp.mp3");
slideSound.volume = 0.4;
slideSound.preload = "auto";


// =========================
// CARROSSEL UNIVERSAL
// =========================

document.querySelectorAll('.flashcard').forEach(card => {
    const imagens = card.querySelectorAll('.carrossel img');
    const btnProx = card.querySelector('.proximo, #proximo');
    const btnVolt = card.querySelector('.voltar, #voltar');

    if (!imagens.length) return;

    let index = 0;
    let firstLoad = true;

    function mostrar() {
        imagens.forEach((img, i) => {
            img.classList.toggle('ativa', i === index);
        });

        // som só depois da primeira interação
        if (!firstLoad) {
            slideSound.currentTime = 0;
            slideSound.play().catch(() => {});
        }

        firstLoad = false;
    }

    mostrar();

    if (btnProx) {
        btnProx.addEventListener('click', () => {
            index = (index + 1) % imagens.length;
            mostrar();
            playClickSound();
        });
    }

    if (btnVolt) {
        btnVolt.addEventListener('click', () => {
            index = (index - 1 + imagens.length) % imagens.length;
            mostrar();
            playClickSound();
        });
    }
});


// =========================
// MÚSICA GLOBAL
// =========================

const music = document.getElementById("bg-music");

function startMusic() {
    if (!music) return;

    music.volume = 0.3;
    music.loop = true;

    const savedTime = localStorage.getItem("tempoMusica");
    if (savedTime) music.currentTime = Number(savedTime);

    music.play().catch(() => {});
}

window.addEventListener("load", startMusic);

document.addEventListener("click", startMusic, { once: true });

setInterval(() => {
    if (music && !music.paused) {
        localStorage.setItem("tempoMusica", music.currentTime);
    }
}, 1000);


// =========================
// ESTATÍSTICAS ANIMADAS
// =========================

function animarNumero(id, destino, duracao) {
    const el = document.getElementById(id);
    if (!el) return;

    let atual = 0;
    const incremento = destino / (duracao / 16);

    function update() {
        atual += incremento;

        if (atual >= destino) {
            el.textContent = destino;
        } else {
            el.textContent = Math.floor(atual);
            requestAnimationFrame(update);
        }
    }

    update();
}

function animar() {
    animarNumero("c1", 6485, 1200);
    animarNumero("c2", 18, 1200);
    animarNumero("c3", 78, 1200);
    animarNumero("c4", 61, 1200);
}

window.addEventListener("load", animar);