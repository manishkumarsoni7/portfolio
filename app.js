// ==========================================================================
// Manish Kumar Soni — Luxury Cyber-Dark Interactive Engine
// Replicating the core Three.js, Cursor, and Animations of mycreativeportfolio-pink
// ==========================================================================

const caseStudiesData = {
  "autodoc-ai": {
    number: "01",
    category: "AI Document Intelligence",
    title: "AutoDoc AI — Document Q&A Platform",
    tagline: "Intelligent document question answering and information extraction system.",
    what: "AutoDoc AI is a document intelligence platform designed to parse multi-page PDFs, technical manuals, and text files to provide instantaneous, contextual question answering.",
    problem: "Reading through long technical manuals, policy papers, and study materials is time-consuming and finding specific answers across multiple documents is frustrating.",
    solution: "Built a chunking and embedding pipeline connected to a Next.js frontend with Supabase for vector storage and session state, giving users instantaneous grounded answers with page citations.",
    features: [
      "Multi-format document parsing (PDF, TXT, MD)",
      "Contextual Q&A powered by OpenAI API with source citations",
      "Chat history persistence with Supabase PostgreSQL",
      "Clean responsive reading interface with markdown rendering"
    ],
    techStack: ["Next.js 15", "React", "Supabase", "PostgreSQL", "OpenAI API", "Tailwind CSS"],
    process: [
      { step: "01 — Understand", desc: "Researched document parsing limits and token context management." },
      { step: "02 — Design", desc: "Designed distraction-free 2-column workspace: doc reader on left, AI chat on right." },
      { step: "03 — Build", desc: "Constructed Next.js server-side API routes and client-side streaming text." },
      { step: "04 — Integrate", desc: "Connected Supabase for storing documents and conversation logs." },
      { step: "05 — Ship", desc: "Deployed to Vercel and optimized cold-start latency." }
    ],
    github: "https://github.com/manishkumarsoni7"
  },
  "devflow-studio": {
    number: "02",
    category: "Developer Tool",
    title: "DevFlow Studio — API Testing Dashboard",
    tagline: "Visual developer workflow and API event testing workspace.",
    what: "A lightweight browser API testing and workflow utility built to test HTTP endpoints and webhook responses quickly in the browser.",
    problem: "Heavy desktop API clients can be bloated for quick exploratory testing and payload formatting.",
    solution: "Created a focused browser application with instant JSON formatting, custom header presets, and historical request logs.",
    features: [
      "Custom HTTP method support (GET, POST, PUT, DELETE)",
      "JSON syntax highlighting and schema validation",
      "Local storage request history and collection exports",
      "Response time and status code inspector"
    ],
    techStack: ["React", "TypeScript", "Node.js", "REST APIs", "Tailwind CSS"],
    process: [
      { step: "01 — Understand", desc: "Identified developer needs: quick headers, readable JSON, fast iteration." },
      { step: "02 — Design", desc: "Created high-contrast dark layout with clear status badges." },
      { step: "03 — Build", desc: "Implemented state management for request headers and payloads." },
      { step: "04 — Integrate", desc: "Built serverless proxy handling for unrestricted testing." },
      { step: "05 — Ship", desc: "Shipped web app on Vercel with responsive viewports." }
    ],
    github: "https://github.com/manishkumarsoni7"
  },
  "omniui-system": {
    number: "03",
    category: "Design System",
    title: "OmniUI — Accessible Component Infrastructure",
    tagline: "Minimal, accessible UI component kit and design tokens.",
    what: "A reusable, accessible component infrastructure and design tokens for modern web applications.",
    problem: "Re-building standard buttons, modals, dropdowns, and form inputs for every project leads to inconsistent UX and accessibility gaps.",
    solution: "Constructed unstyled, composable primitives wrapped in clean dark tokens with proper focus management.",
    features: [
      "20+ accessible UI primitives (Modals, Dropdowns, Tabs, Tooltips)",
      "Full keyboard navigation and screen-reader accessibility",
      "Cohesive dark color palette with subtle borders",
      "Zero unnecessary external dependencies"
    ],
    techStack: ["React", "HTML5", "CSS3", "Tailwind CSS", "TypeScript", "WCAG AA"],
    process: [
      { step: "01 — Understand", desc: "Audited accessibility guidelines (WAI-ARIA)." },
      { step: "02 — Design", desc: "Defined token system for spacing, typography, and surfaces." },
      { step: "03 — Build", desc: "Coded individual components with strict keyboard focus locks." },
      { step: "04 — Integrate", desc: "Assembled live component documentation site." },
      { step: "05 — Ship", desc: "Published live documentation on Vercel." }
    ],
    github: "https://github.com/manishkumarsoni7"
  }
};

document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    initCustomCursor();
    initTypewriter();
    initThreeEngine();
    initScrollAnimations();
    initProjectFilters();
    initActiveNavigationStates();
});

/* 1. Loader Sequence */
function initLoader() {
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 800);
        }, 500);
    });
    // Fallback safety
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 800);
        }
    }, 2200);
}

/* 2. Custom Cursor & Spotlight Tracking */
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('cursor-follower');
    const spotlight = document.getElementById('mouse-spotlight');
    
    if (!cursor || !follower || !spotlight) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        spotlight.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    function updateFollower() {
        let dx = mouseX - followerX;
        let dy = mouseY - followerY;
        
        followerX += dx * 0.14;
        followerY += dy * 0.14;
        
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(updateFollower);
    }
    requestAnimationFrame(updateFollower);

    const interactiveElements = document.querySelectorAll('a, button, .filter-btn, .form-control, .proj-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.transform += ' scale(1.6)';
            follower.style.borderColor = 'var(--gold)';
            cursor.style.backgroundColor = 'var(--white)';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.transform = follower.style.transform.replace(' scale(1.6)', '');
            follower.style.borderColor = 'var(--accent)';
            cursor.style.backgroundColor = 'var(--gold)';
        });
    });
}

/* 3. 60 FPS Typewriter Subroutine */
function initTypewriter() {
    const words = [
        "Web Developer.",
        "AI Automation Builder.",
        "Next.js & Python Engineer.",
        "UI/UX Problem Solver."
    ];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const targetEl = document.getElementById('typewriter');
    if (!targetEl) return;
    
    function typeLoop() {
        const currentWord = words[wordIdx];
        if (isDeleting) {
            targetEl.textContent = currentWord.substring(0, charIdx - 1);
            charIdx--;
        } else {
            targetEl.textContent = currentWord.substring(0, charIdx + 1);
            charIdx++;
        }

        let typeSpeed = isDeleting ? 35 : 75;

        if (!isDeleting && charIdx === currentWord.length) {
            typeSpeed = 1900;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            typeSpeed = 400;
        }

        setTimeout(typeLoop, typeSpeed);
    }
    setTimeout(typeLoop, 800);
}

/* 4. Three.js 3D Particle Cloud & Geometric Wireframe Torus */
function initThreeEngine() {
    const container = document.getElementById('canvas-container');
    if (!container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00f2fe, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Particle Cloud
    const particleCount = window.innerWidth < 768 ? 70 : 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for(let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i+1] = (Math.random() - 0.5) * 10;
        positions[i+2] = (Math.random() - 0.5) * 5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
        color: 0x10b5d6,
        size: 0.035,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
    });

    const particleCloud = new THREE.Points(particleGeo, particleMat);
    scene.add(particleCloud);

    // Wireframe Torus
    const torusGeo = new THREE.TorusGeometry(1.6, 0.12, 10, 50);
    const torusWire = new THREE.MeshBasicMaterial({ color: 0x111111, wireframe: false });
    const torusMesh = new THREE.Mesh(torusGeo, torusWire);
    
    const edgeGeo = new THREE.EdgesGeometry(torusGeo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00b4d8, linewidth: 1, transparent: true, opacity: 0.18 });
    const wireframeOutline = new THREE.LineSegments(edgeGeo, lineMat);
    torusMesh.add(wireframeOutline);
    
    torusMesh.position.set(2.4, 0, -1);
    scene.add(torusMesh);

    let targetMouseX = 0;
    let targetMouseY = 0;

    document.addEventListener('mousemove', (event) => {
        targetMouseX = (event.clientX / window.innerWidth) - 0.5;
        targetMouseY = (event.clientY / window.innerHeight) - 0.5;
    });

    function renderLoop() {
        requestAnimationFrame(renderLoop);

        particleCloud.rotation.y += 0.0008;
        particleCloud.rotation.x += 0.0003;

        torusMesh.rotation.x += 0.003;
        torusMesh.rotation.y += 0.005;

        particleCloud.position.x += (targetMouseX * 0.4 - particleCloud.position.x) * 0.05;
        particleCloud.position.y += (-targetMouseY * 0.4 - particleCloud.position.y) * 0.05;

        torusMesh.position.x += ((targetMouseX * 1.4 + 2.4) - torusMesh.position.x) * 0.05;
        torusMesh.position.y += (-targetMouseY * 1.4 - torusMesh.position.y) * 0.05;

        renderer.render(scene, camera);
    }
    renderLoop();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* 5. Scroll Animations, Counters & Circular Skill Progress */
function initScrollAnimations() {
    const header = document.getElementById('main-header');
    const progress = document.getElementById('scroll-progress');
    const revealElements = document.querySelectorAll('.reveal-element');
    const statNumbers = document.querySelectorAll('.stat-num');
    let statsTriggered = false;

    function runStatsCounter() {
        statNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            
            function updateNum() {
                current += increment;
                if(current >= target) {
                    num.textContent = target;
                } else {
                    num.textContent = Math.ceil(current);
                    requestAnimationFrame(updateNum);
                }
            }
            requestAnimationFrame(updateNum);
        });
    }

    function runSkillsProgressAnimation() {
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            const pct = card.getAttribute('data-pct');
            const circle = card.querySelector('.progress-ring-circle');
            const text = card.querySelector('.skill-pct');
            
            const radius = circle.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            const offset = circumference - (pct / 100) * circumference;
            
            circle.style.strokeDashoffset = offset;
            
            let currPct = 0;
            function tickPct() {
                if(currPct < pct) {
                    currPct++;
                    text.textContent = currPct + '%';
                    requestAnimationFrame(tickPct);
                }
            }
            tickPct();
        });
    }

    const generalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                if(entry.target.id === 'about' && !statsTriggered) {
                    runStatsCounter();
                    statsTriggered = true;
                }
                if(entry.target.id === 'skills') {
                    runSkillsProgressAnimation();
                }
                generalObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => generalObserver.observe(el));

    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        if(totalScroll > 0) {
            const pctScrolled = (window.scrollY / totalScroll) * 100;
            if (progress) progress.style.width = pctScrolled + '%';
        }

        if(window.scrollY > 50) {
            if (header) header.classList.add('scrolled');
        } else {
            if (header) header.classList.remove('scrolled');
        }
    });
}

/* 6. Project Filter Tabs */
function initProjectFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');

            cards.forEach(card => {
                if(filterValue === 'all' || card.getAttribute('data-cat') === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => { card.style.display = 'none'; }, 350);
                }
            });
        });
    });
}

/* 7. Active Navigation Indicator */
function initActiveNavigationStates() {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let currentSec = 'home';
        sections.forEach(sec => {
            const top = sec.offsetTop - 220;
            if(window.scrollY >= top) {
                currentSec = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${currentSec}`) {
                link.classList.add('active');
            }
        });
    });
}

/* 8. Hire Me Modal Controls */
function openHire() {
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}
function closeHire() {
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}
function handleOverlayClick(e) {
    if (e.target === document.getElementById('overlay')) closeHire();
}

function handleHireSubmit(e) {
    e.preventDefault();
    const fb = document.getElementById('hire-feedback');
    if (fb) {
        fb.style.display = 'block';
        setTimeout(() => {
            closeHire();
            fb.style.display = 'none';
        }, 2500);
    }
}

/* 9. Case Study Modal Controls */
window.openCaseStudy = function(projectId) {
    const data = caseStudiesData[projectId];
    if (!data) return;

    const overlay = document.getElementById('caseStudyOverlay');
    const body = document.getElementById('case-study-body');
    if (!overlay || !body) return;

    body.innerHTML = `
        <div style="text-align:left;">
            <div style="font-family:'Space Grotesk',sans-serif; font-size:0.75rem; color:var(--gold); letter-spacing:2px; text-transform:uppercase; margin-bottom:8px;">
                ${data.number} // ${data.category}
            </div>
            <h2 style="font-family:'Cormorant Garamond',serif; font-size:2.4rem; color:var(--white); margin-bottom:6px; font-weight:400;">
                ${data.title}
            </h2>
            <p style="font-size:0.9rem; color:var(--muted); font-family:'Space Grotesk',sans-serif; margin-bottom:24px;">
                ${data.tagline}
            </p>

            <div style="background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:20px; margin-bottom:20px;">
                <h4 style="font-family:'Syne',sans-serif; font-size:0.85rem; color:var(--white); text-transform:uppercase; margin-bottom:8px;">The Problem</h4>
                <p style="font-size:0.88rem; color:var(--muted); line-height:1.6; margin-bottom:14px;">${data.problem}</p>
                <h4 style="font-family:'Syne',sans-serif; font-size:0.85rem; color:var(--gold); text-transform:uppercase; margin-bottom:8px;">The Solution</h4>
                <p style="font-size:0.88rem; color:var(--muted); line-height:1.6;">${data.solution}</p>
            </div>

            <div style="margin-bottom:20px;">
                <h4 style="font-family:'Syne',sans-serif; font-size:0.85rem; color:var(--white); text-transform:uppercase; margin-bottom:10px;">Key Features</h4>
                <ul style="list-style:none; display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                    ${data.features.map(f => `<li style="font-size:0.85rem; color:var(--muted); display:flex; align-items:center; gap:8px;"><span style="width:5px; height:5px; border-radius:50%; background:var(--gold);"></span> ${f}</li>`).join('')}
                </ul>
            </div>

            <div style="margin-bottom:24px;">
                <h4 style="font-family:'Syne',sans-serif; font-size:0.85rem; color:var(--white); text-transform:uppercase; margin-bottom:10px;">Tech Stack</h4>
                <div style="display:flex; flex-wrap:wrap; gap:6px;">
                    ${data.techStack.map(t => `<span style="font-family:'JetBrains Mono',monospace; font-size:0.75rem; color:var(--white); background:rgba(255,255,255,0.05); border:1px solid var(--border); padding:4px 10px; border-radius:6px;">${t}</span>`).join('')}
                </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border); padding-top:18px;">
                <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-premium btn-font" style="font-size:0.85rem; padding:10px 22px;">
                    <i class="fab fa-github"></i> View GitHub Repo
                </a>
                <button onclick="closeCaseStudy()" class="btn-secondary" style="font-size:0.85rem; padding:10px 20px;">
                    Close Case Study
                </button>
            </div>
        </div>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeCaseStudy = function() {
    const overlay = document.getElementById('caseStudyOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
};

window.handleCaseStudyOverlayClick = function(e) {
    if (e.target === document.getElementById('caseStudyOverlay')) closeCaseStudy();
};

/* 10. Resume Modal Controls */
window.openResumeModal = function() {
    const overlay = document.getElementById('resumeOverlay');
    if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeResumeModal = function() {
    const overlay = document.getElementById('resumeOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
};

window.handleResumeOverlayClick = function(e) {
    if (e.target === document.getElementById('resumeOverlay')) closeResumeModal();
};

window.downloadResume = function() {
    const resumeText = `=====================================================
MANISH KUMAR SONI
Web Developer & AI Builder
GitHub: https://github.com/manishkumarsoni7
LinkedIn: https://www.linkedin.com/in/manishkumarsoni7
Instagram: https://www.instagram.com/themanish.ai
=====================================================

ABOUT
Developer focused on building modern web products, AI-powered applications, and reliable frontend software.

TECHNICAL STACK
- Frontend: HTML5, CSS3, JavaScript (ES6+), React, Next.js
- Backend: Node.js, Python, REST APIs
- AI: Generative AI, AI APIs, AI Agents, Automation
- Database: Supabase, PostgreSQL
- Tools: Git, GitHub, Vercel, n8n, VS Code

SELECTED PROJECTS
1. AutoDoc AI — Document Intelligence & Q&A Platform
2. DevFlow Studio — Developer Workflow & API Testing Dashboard
3. OmniUI System — Accessible Component Kit & Design Tokens

EDUCATION
- Senior Secondary (12th): UPG +2 High School, Chaube (Completed: 2026 | Score: 422 / 500)
- Secondary (10th): UPG +2 High School, Chaube (Completed: 2024 | Score: 434 / 500)

HOW I BUILD
01 Understand -> 02 Design -> 03 Build -> 04 Integrate -> 05 Ship
=====================================================`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Manish_Kumar_Soni_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

/* 11. Contact Form Submit Handler */
window.handleContactSubmit = function(e) {
    e.preventDefault();
    const fb = document.getElementById('contact-feedback');
    const form = document.getElementById('main-contact-form');
    if (fb) {
        fb.style.display = 'block';
        if (form) form.reset();
        setTimeout(() => {
            fb.style.display = 'none';
        }, 5000);
    }
};

// Global escape key listener
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeHire();
        closeCaseStudy();
        closeResumeModal();
    }
});
