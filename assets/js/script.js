// Função para alternar entre tema claro e escuro
function toggleMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Atualiza o estado do checkbox para refletir o tema atual
    document.querySelector('.switch input').checked = newTheme === 'dark';
}

// Verificar tema salvo no localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    // Define o estado inicial do checkbox corretamente
    document.querySelector('.switch input').checked = savedTheme === 'dark';
    
    // Inicializar animações
    initializeAnimations();

    const menuButton = document.querySelector('.menu-button');
    const menu = document.querySelector('.menu');
    const menuItems = document.querySelectorAll('.menu-item');

    menuButton.addEventListener('click', () => {
        menu.classList.toggle('active');
        menuButton.classList.toggle('active');
    });

    // Fechar menu ao clicar em um item
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('active');
            menuButton.classList.remove('active');
        });
    });
});

// Função para inicializar animações
function initializeAnimations() {
    // Animação dos botões CTA
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    ctaButtons.forEach((btn, index) => {
        btn.style.animationDelay = `${0.5 + index * 0.2}s`;
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
        setTimeout(() => {
            btn.style.transition = 'all 0.5s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 500 + index * 200);
    });
}

// Animação suave do scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação do header ao rolar
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Animação dos elementos ao entrar na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.projeto-card, .section-header, .sobre-content, .contato-content').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
});

// Formulário de contato
const form = document.querySelector('.contato-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simular envio do formulário
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        setTimeout(() => {
            // Aqui você pode adicionar a lógica real para enviar o formulário
            alert('Mensagem enviada com sucesso!');
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Efeito de hover nos cards de projeto
document.querySelectorAll('.projeto-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Adicionar classe active ao link do menu atual
const sections = document.querySelectorAll('section');
const menuLinks = document.querySelectorAll('.menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Cursor personalizado
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.width = '16px';
        cursor.style.height = '16px';
        cursorFollower.style.width = '60px';
        cursorFollower.style.height = '60px';
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.style.width = '8px';
        cursor.style.height = '8px';
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
    });
});

// Ruído de fundo
const noiseCanvas = document.getElementById('noise-canvas');
const ctx = noiseCanvas.getContext('2d');

function resize() {
    noiseCanvas.width = window.innerWidth;
    noiseCanvas.height = window.innerHeight;
}

resize();
window.addEventListener('resize', resize);

function noise(ctx) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const imageData = ctx.createImageData(w, h);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 15;
    }
    
    ctx.putImageData(imageData, 0, 0);
}

function loop() {
    noise(ctx);
    requestAnimationFrame(loop);
}

loop();

// Gradient sphere animation
const sphere = document.querySelector('.gradient-sphere');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    
    gsap.to(sphere, {
        x: mouseX * 50,
        y: mouseY * 50,
        rotation: mouseX * 10,
        scale: 1 + Math.abs(mouseX * 0.1),
        duration: 1,
        ease: 'power2.out'
    });
});

// Noise effect for profile image
const profileCanvas = document.getElementById('profile-noise-canvas');
if (profileCanvas) {
  const profileCtx = profileCanvas.getContext('2d');
  let profileNoiseData = new Uint8Array(profileCanvas.width * profileCanvas.height);

  function generateProfileNoise() {
    for (let i = 0; i < profileNoiseData.length; i++) {
      profileNoiseData[i] = Math.random() * 255;
    }
  }

  function drawProfileNoise() {
    const imageData = profileCtx.createImageData(profileCanvas.width, profileCanvas.height);
    for (let i = 0; i < profileNoiseData.length; i++) {
      const stride = i * 4;
      imageData.data[stride] = profileNoiseData[i];
      imageData.data[stride + 1] = profileNoiseData[i];
      imageData.data[stride + 2] = profileNoiseData[i];
      imageData.data[stride + 3] = 255;
    }
    profileCtx.putImageData(imageData, 0, 0);
    generateProfileNoise();
    requestAnimationFrame(drawProfileNoise);
  }

  function initProfileNoise() {
    profileCanvas.width = 100;
    profileCanvas.height = 100;
    generateProfileNoise();
    drawProfileNoise();
  }

  initProfileNoise();
}

// Otimizar animações
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Aplicar aos eventos de scroll
window.addEventListener('scroll', debounce(() => {
    // Seu código de scroll aqui
}, 16));

// Melhorar feedback visual
const addLoadingState = (button) => {
    button.classList.add('loading');
    button.disabled = true;
};

const removeLoadingState = (button) => {
    button.classList.remove('loading');
    button.disabled = false;
};
