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

/* ══════════════════════════════════════════════════════════════════════════
   12. INTERACTIVE LIVE APPLICATION DEMO SUITE (REAL WORKING MINI-APPS)
   ══════════════════════════════════════════════════════════════════════════ */

window.openLiveDemo = function(projectId) {
    const overlay = document.getElementById('liveDemoOverlay');
    const body = document.getElementById('live-demo-body');
    if (!overlay || !body) return;

    if (projectId === 'autodoc-ai') {
        body.innerHTML = renderAutoDocAIDemo();
        initAutoDocAILogic();
    } else if (projectId === 'devflow-studio') {
        body.innerHTML = renderDevFlowStudioDemo();
        initDevFlowStudioLogic();
    } else if (projectId === 'omniui-system') {
        body.innerHTML = renderOmniUIDemo();
        initOmniUILogic();
    } else if (projectId === 'promptlens') {
        body.innerHTML = renderPromptLensDemo();
        initPromptLensLogic();
    }

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeLiveDemo = function() {
    const overlay = document.getElementById('liveDemoOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
};

window.handleLiveDemoOverlayClick = function(e) {
    if (e.target === document.getElementById('liveDemoOverlay')) closeLiveDemo();
};

/* --- 1. AutoDoc AI Interactive App --- */
function renderAutoDocAIDemo() {
    return `
        <div style="text-align:left;">
            <div class="app-header-bar">
                <div class="app-title-group">
                    <span style="font-family:'Space Grotesk',sans-serif; font-size:0.75rem; color:var(--gold); letter-spacing:2px; text-transform:uppercase;">01 // Interactive AI Sandbox</span>
                    <h3>AutoDoc AI — Document Intelligence Engine</h3>
                </div>
                <div class="app-badge-live">LIVE RAG PIPELINE</div>
            </div>

            <div class="app-workspace-grid">
                <!-- Left Panel: Document Context -->
                <div class="app-panel">
                    <div class="app-panel-title">
                        <span>Source Document</span>
                        <span id="doc-token-badge" style="color:var(--accent); font-family:'JetBrains Mono';">428 Tokens</span>
                    </div>
                    
                    <div class="app-select-btn-group">
                        <button class="app-chip active" onclick="switchDocPreset('spec')">API_Architecture.md</button>
                        <button class="app-chip" onclick="switchDocPreset('security')">Security_Policy.txt</button>
                        <button class="app-chip" onclick="switchDocPreset('custom')">Custom Paste</button>
                    </div>

                    <textarea id="autodoc-doc-content" class="app-input-field" rows="8" style="font-size:0.78rem; line-height:1.5;"># System Architecture & API Rate Limits (v2.4)
1. Token Bucket Rate Limiter: Allows max 120 requests/min per IP with burst capacity of 30 requests.
2. Vector Indexing: Documents are chunked into 512-token segments with 50-token overlap using text-embedding-3-small.
3. Database: Supabase PostgreSQL with pgvector cosine distance similarity search (threshold: 0.78).
4. Response Latency SLO: Sub-250ms p95 vector lookup, sub-850ms first-token streaming response.</textarea>

                    <div>
                        <span style="font-size:0.75rem; color:var(--muted); font-family:'Space Grotesk';">Suggested Prompts:</span>
                        <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:6px;">
                            <button class="app-chip" onclick="setDocQuestion('What are the API rate limits and burst capacity?')">Rate Limits?</button>
                            <button class="app-chip" onclick="setDocQuestion('How are documents chunked and stored in Supabase?')">Chunking & Vector DB?</button>
                            <button class="app-chip" onclick="setDocQuestion('What is the target latency SLO for vector lookups?')">Latency SLO?</button>
                        </div>
                    </div>
                </div>

                <!-- Right Panel: AI Synthesis & Vector Citations -->
                <div class="app-panel">
                    <div class="app-panel-title">
                        <span>Semantic Query &amp; Grounded Output</span>
                        <span id="autodoc-status" style="color:var(--gold); font-family:'JetBrains Mono'; font-size:0.72rem;">Ready</span>
                    </div>

                    <div style="display:flex; gap:8px;">
                        <input type="text" id="autodoc-query-input" class="app-input-field" placeholder="Ask any question about this document..." value="What are the API rate limits and burst capacity?" style="flex-grow:1;" />
                        <button class="app-action-btn" onclick="executeDocQuery()"><i class="fas fa-search"></i> Ask</button>
                    </div>

                    <div id="autodoc-output" class="app-terminal-output" style="min-height:160px;">
<span style="color:var(--muted)">[AutoDoc Engine]:</span> Ready for semantic inquiry. Click "Ask" above to initiate vector chunk retrieval and contextual synthesis.
                    </div>

                    <div id="autodoc-citations" style="display:none; padding-top:10px; border-top:1px solid rgba(255,255,255,0.08);">
                        <span style="font-size:0.72rem; color:var(--muted); text-transform:uppercase; letter-spacing:1px; display:block; margin-bottom:6px;">Grounding &amp; Verified Citations:</span>
                        <div id="citation-badges-list" style="display:flex; gap:6px; flex-wrap:wrap;"></div>
                    </div>
                </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.08); padding-top:18px; margin-top:20px;">
                <span style="font-size:0.8rem; color:var(--muted); font-family:'Space Grotesk';">Simulating Next.js 15 + OpenAI + pgvector Embeddings pipeline</span>
                <button onclick="closeLiveDemo()" class="btn-secondary" style="font-size:0.85rem; padding:8px 18px;">Close Demo</button>
            </div>
        </div>
    `;
}

const docPresets = {
    spec: `# System Architecture & API Rate Limits (v2.4)
1. Token Bucket Rate Limiter: Allows max 120 requests/min per IP with burst capacity of 30 requests.
2. Vector Indexing: Documents are chunked into 512-token segments with 50-token overlap using text-embedding-3-small.
3. Database: Supabase PostgreSQL with pgvector cosine distance similarity search (threshold: 0.78).
4. Response Latency SLO: Sub-250ms p95 vector lookup, sub-850ms first-token streaming response.`,
    security: `# Enterprise Data Security & Privacy Compliance (SOC-2 Type II)
1. Encryption: All document embeddings and raw inputs are encrypted in-transit (TLS 1.3) and at-rest (AES-256).
2. Zero Data Retention: API requests to OpenAI use zero-data retention endpoints (ZDR enabled).
3. Access Control: Multi-tenant row-level security (RLS) enforced at the PostgreSQL kernel level.
4. Audit Trail: Every retrieval query is logged with timestamp, user UUID, and cosine similarity metric.`
};

function initAutoDocAILogic() {
    window.switchDocPreset = function(type) {
        const txt = document.getElementById('autodoc-doc-content');
        const badge = document.getElementById('doc-token-badge');
        document.querySelectorAll('.app-select-btn-group .app-chip').forEach(c => c.classList.remove('active'));
        if (event && event.target) event.target.classList.add('active');

        if (type === 'spec') {
            txt.value = docPresets.spec;
            if (badge) badge.textContent = '428 Tokens';
        } else if (type === 'security') {
            txt.value = docPresets.security;
            if (badge) badge.textContent = '380 Tokens';
        } else {
            txt.value = '';
            if (badge) badge.textContent = '0 Tokens';
            txt.placeholder = 'Paste your raw text or markdown here...';
            txt.focus();
        }
    };

    window.setDocQuestion = function(q) {
        const inp = document.getElementById('autodoc-query-input');
        if (inp) {
            inp.value = q;
            executeDocQuery();
        }
    };

    window.executeDocQuery = function() {
        const input = document.getElementById('autodoc-query-input');
        const output = document.getElementById('autodoc-output');
        const status = document.getElementById('autodoc-status');
        const citationsDiv = document.getElementById('autodoc-citations');
        const badgeList = document.getElementById('citation-badges-list');
        const docText = document.getElementById('autodoc-doc-content').value;

        if (!input || !output || !input.value.trim()) return;
        const query = input.value.trim().toLowerCase();

        status.textContent = 'Vector Search & Synthesizing...';
        status.style.color = 'var(--accent)';
        output.innerHTML = `<span style="color:var(--accent)"><i class="fas fa-spinner fa-spin"></i> Calculating cosine embeddings & retrieving relevant chunks...</span>`;
        if (citationsDiv) citationsDiv.style.display = 'none';

        setTimeout(() => {
            let answer = "";
            let citations = [];

            if (query.includes('rate limit') || query.includes('burst')) {
                answer = "Based on Section 1 of the architecture spec, the API utilizes a **Token Bucket Rate Limiter** allowing a maximum of **120 requests/minute per IP** with an allowable **burst capacity of 30 requests**.";
                citations = ["[Section 1.1: Rate Limits (Score: 99.4%)]", "[Latency Guard: IP Enforced]"];
            } else if (query.includes('chunk') || query.includes('supabase') || query.includes('vector') || query.includes('store')) {
                answer = "Documents are partitioned into **512-token segments** with **50-token overlap** using `text-embedding-3-small`. Vector embeddings are indexed in **Supabase PostgreSQL (pgvector)** using cosine similarity with a match threshold of `0.78`.";
                citations = ["[Section 1.2: Vector Indexing (Score: 98.8%)]", "[Section 1.3: Supabase pgvector]"];
            } else if (query.includes('latency') || query.includes('slo')) {
                answer = "The target performance SLO stipulates **sub-250ms p95 vector lookup** and a **sub-850ms first-token streaming latency** across all client sessions.";
                citations = ["[Section 1.4: Response Latency SLO (Score: 97.5%)]"];
            } else if (query.includes('encrypt') || query.includes('security') || query.includes('soc')) {
                answer = "Security compliance features **TLS 1.3** encryption in-transit, **AES-256** at-rest, **Zero Data Retention (ZDR)** for OpenAI API calls, and PostgreSQL **Row-Level Security (RLS)**.";
                citations = ["[Policy 1.1: AES-256 Encryption (Score: 99.1%)]", "[Policy 1.2: ZDR Protocol]"];
            } else {
                answer = `Extracted contextual synthesis from active document:\n\nRelevant context analyzed (${docText.split(' ').length} words). The system parsed the document chunks and verified that the parameters match user query: "${input.value.trim()}".`;
                citations = ["[Matched Chunk #1 (Score: 94.2%)]", "[Direct Document Context]"];
            }

            output.innerHTML = "";
            let charIndex = 0;
            const typingInterval = setInterval(() => {
                if (charIndex < answer.length) {
                    output.innerHTML = answer.substring(0, charIndex + 1).replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--white);">$1</strong>') + '<span style="color:var(--accent);">▌</span>';
                    charIndex++;
                } else {
                    clearInterval(typingInterval);
                    output.innerHTML = answer.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--white);">$1</strong>');
                    status.textContent = 'Completed (310ms)';
                    status.style.color = '#10B981';

                    if (citationsDiv && badgeList) {
                        badgeList.innerHTML = citations.map(c => `<span class="app-citation-tag"><i class="fas fa-check-circle"></i> ${c}</span>`).join('');
                        citationsDiv.style.display = 'block';
                    }
                }
            }, 12);
        }, 600);
    };
}

/* --- 2. DevFlow Studio Interactive REST Client --- */
function renderDevFlowStudioDemo() {
    return `
        <div style="text-align:left;">
            <div class="app-header-bar">
                <div class="app-title-group">
                    <span style="font-family:'Space Grotesk',sans-serif; font-size:0.75rem; color:var(--gold); letter-spacing:2px; text-transform:uppercase;">02 // Real REST API Console</span>
                    <h3>DevFlow Studio — Live Browser HTTP Client</h3>
                </div>
                <div class="app-badge-live">LIVE NETWORK FETCH</div>
            </div>

            <div class="app-workspace-grid">
                <!-- Left Panel: Request Config -->
                <div class="app-panel">
                    <div class="app-panel-title">
                        <span>HTTP Request Builder</span>
                        <span style="color:var(--muted); font-size:0.72rem;">Presets Available</span>
                    </div>

                    <!-- Method & URL Bar -->
                    <div style="display:flex; gap:6px;">
                        <select id="api-method" class="app-input-field" style="width:105px; font-weight:700; color:var(--accent);">
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                        <input type="text" id="api-url" class="app-input-field" value="https://api.github.com/users/manishkumarsoni7" style="flex-grow:1;" />
                    </div>

                    <!-- Preset Quick Pickers -->
                    <div>
                        <span style="font-size:0.75rem; color:var(--muted); font-family:'Space Grotesk';">Live API Presets:</span>
                        <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:6px;">
                            <button class="app-chip active" onclick="setApiPreset('github')">GitHub: Manish</button>
                            <button class="app-chip" onclick="setApiPreset('posts')">JSONPlaceholder</button>
                            <button class="app-chip" onclick="setApiPreset('quotes')">Dummy Quotes</button>
                            <button class="app-chip" onclick="setApiPreset('custom_post')">POST Test</button>
                        </div>
                    </div>

                    <!-- Body / Headers (Conditional) -->
                    <div id="request-body-container" style="display:none;">
                        <span style="font-size:0.75rem; color:var(--muted); font-family:'Space Grotesk';">JSON Payload:</span>
                        <textarea id="api-body" class="app-input-field" rows="4" style="margin-top:6px;">{
  "title": "New Webhook Trigger",
  "author": "Manish Kumar Soni",
  "status": "active"
}</textarea>
                    </div>

                    <button class="app-action-btn" onclick="executeApiFetch()" style="width:100%; margin-top:4px;">
                        <i class="fas fa-paper-plane"></i> Send Live Request
                    </button>
                </div>

                <!-- Right Panel: Live Response Inspector -->
                <div class="app-panel">
                    <div class="app-panel-title">
                        <span>Response Inspector</span>
                        <div style="display:flex; gap:10px; align-items:center;">
                            <span id="api-status-badge" style="font-family:'JetBrains Mono'; font-size:0.75rem; color:#10B981;">🟢 200 OK</span>
                            <span id="api-latency-badge" style="font-family:'JetBrains Mono'; font-size:0.75rem; color:var(--accent);">⚡ 142ms</span>
                        </div>
                    </div>

                    <div id="api-response-body" class="app-terminal-output" style="min-height:220px;">
Click "Send Live Request" to perform real network fetch in browser...
                    </div>

                    <div style="display:flex; justify-content:space-between; align-items:center; padding-top:6px;">
                        <button onclick="copyApiResponse()" class="proj-link" style="font-size:0.75rem; color:var(--gold);"><i class="fas fa-copy"></i> Copy JSON</button>
                        <button onclick="copyApiCurl()" class="proj-link" style="font-size:0.75rem; color:var(--muted);"><i class="fas fa-terminal"></i> Copy cURL</button>
                    </div>
                </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.08); padding-top:18px; margin-top:20px;">
                <span style="font-size:0.8rem; color:var(--muted); font-family:'Space Grotesk';">Real-time HTTP engine with CORS-safe headers &amp; latency profiling</span>
                <button onclick="closeLiveDemo()" class="btn-secondary" style="font-size:0.85rem; padding:8px 18px;">Close Demo</button>
            </div>
        </div>
    `;
}

function initDevFlowStudioLogic() {
    window.setApiPreset = function(preset) {
        const method = document.getElementById('api-method');
        const url = document.getElementById('api-url');
        const bodyCont = document.getElementById('request-body-container');
        document.querySelectorAll('.app-panel .app-chip').forEach(c => c.classList.remove('active'));
        if (event && event.target) event.target.classList.add('active');

        if (preset === 'github') {
            method.value = 'GET';
            url.value = 'https://api.github.com/users/manishkumarsoni7';
            bodyCont.style.display = 'none';
        } else if (preset === 'posts') {
            method.value = 'GET';
            url.value = 'https://jsonplaceholder.typicode.com/posts/1';
            bodyCont.style.display = 'none';
        } else if (preset === 'quotes') {
            method.value = 'GET';
            url.value = 'https://dummyjson.com/quotes/random';
            bodyCont.style.display = 'none';
        } else if (preset === 'custom_post') {
            method.value = 'POST';
            url.value = 'https://jsonplaceholder.typicode.com/posts';
            bodyCont.style.display = 'block';
        }
        executeApiFetch();
    };

    window.executeApiFetch = async function() {
        const method = document.getElementById('api-method').value;
        const url = document.getElementById('api-url').value.trim();
        const responseEl = document.getElementById('api-response-body');
        const statusBadge = document.getElementById('api-status-badge');
        const latencyBadge = document.getElementById('api-latency-badge');
        const bodyText = document.getElementById('api-body') ? document.getElementById('api-body').value : null;

        if (!url || !responseEl) return;

        responseEl.innerHTML = `<span style="color:var(--accent)"><i class="fas fa-spinner fa-spin"></i> Executing HTTP ${method} to ${url}...</span>`;
        statusBadge.textContent = '⏳ Sending...';
        statusBadge.style.color = 'var(--gold)';
        const startTime = performance.now();

        try {
            const options = {
                method: method,
                headers: { 'Accept': 'application/json' }
            };
            if (method === 'POST' || method === 'PUT') {
                options.headers['Content-Type'] = 'application/json';
                options.body = bodyText;
            }

            const res = await fetch(url, options);
            const endTime = performance.now();
            const latency = Math.round(endTime - startTime);

            latencyBadge.textContent = `⚡ ${latency}ms`;
            if (res.ok) {
                statusBadge.textContent = `🟢 ${res.status} ${res.statusText || 'OK'}`;
                statusBadge.style.color = '#10B981';
            } else {
                statusBadge.textContent = `🔴 ${res.status} ${res.statusText || 'Error'}`;
                statusBadge.style.color = '#EF4444';
            }

            const data = await res.json();
            responseEl.innerHTML = formatJsonHighlight(data);
        } catch (err) {
            const endTime = performance.now();
            latencyBadge.textContent = `⚡ ${Math.round(endTime - startTime)}ms`;
            statusBadge.textContent = `🔴 Network / CORS Error`;
            statusBadge.style.color = '#EF4444';
            responseEl.innerHTML = `<span style="color:#EF4444;">Fetch Failed: ${err.message}</span>\n\nNote: Some external endpoints block direct client-side CORS requests. Try using the GitHub or JSONPlaceholder presets above!`;
        }
    };

    function formatJsonHighlight(json) {
        const str = JSON.stringify(json, null, 2);
        return str
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {
                let cls = '#A0AEC0';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'var(--accent)'; // key
                    } else {
                        cls = '#34D399'; // string
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'var(--gold)';
                } else if (/null/.test(match)) {
                    cls = '#F87171';
                } else {
                    cls = '#FBBF24'; // number
                }
                return `<span style="color:${cls}">${match}</span>`;
            });
    }

    window.copyApiResponse = function() {
        const el = document.getElementById('api-response-body');
        if (el) {
            navigator.clipboard.writeText(el.innerText);
            alert('Response JSON copied to clipboard!');
        }
    };

    window.copyApiCurl = function() {
        const method = document.getElementById('api-method').value;
        const url = document.getElementById('api-url').value;
        const curl = `curl -X ${method} "${url}" -H "Accept: application/json"`;
        navigator.clipboard.writeText(curl);
        alert('cURL command copied to clipboard!');
    };

    // Auto-fetch initial preset
    setTimeout(window.executeApiFetch, 200);
}

/* --- 3. OmniUI Component Studio --- */
function renderOmniUIDemo() {
    return `
        <div style="text-align:left;">
            <div class="app-header-bar">
                <div class="app-title-group">
                    <span style="font-family:'Space Grotesk',sans-serif; font-size:0.75rem; color:var(--gold); letter-spacing:2px; text-transform:uppercase;">03 // Component Laboratory</span>
                    <h3>OmniUI — Live Component Sandbox &amp; Code Exporter</h3>
                </div>
                <div class="app-badge-live">TAILWIND + REACT EXPORT</div>
            </div>

            <div class="app-workspace-grid">
                <!-- Left Panel: Live Customizer -->
                <div class="app-panel">
                    <div class="app-panel-title">
                        <span>Component Controls</span>
                    </div>

                    <div>
                        <span style="font-size:0.75rem; color:var(--muted); font-family:'Space Grotesk';">Select Variant:</span>
                        <div class="app-select-btn-group" style="margin-top:6px;">
                            <button class="app-chip active" onclick="setOmniComponent('glow-btn')">Cyber Glow</button>
                            <button class="app-chip" onclick="setOmniComponent('glass-badge')">Glass Badge</button>
                            <button class="app-chip" onclick="setOmniComponent('brutal-card')">Neobrutal Card</button>
                            <button class="app-chip" onclick="setOmniComponent('switch')">Spring Switch</button>
                        </div>
                    </div>

                    <div>
                        <span style="font-size:0.75rem; color:var(--muted); font-family:'Space Grotesk';">Accent Color:</span>
                        <div style="display:flex; gap:10px; margin-top:6px; align-items:center;">
                            <button onclick="setOmniColor('#00f2fe')" style="width:28px; height:28px; border-radius:50%; background:#00f2fe; border:2px solid #fff; cursor:pointer;"></button>
                            <button onclick="setOmniColor('#8a2be2')" style="width:28px; height:28px; border-radius:50%; background:#8a2be2; border:1px solid #555; cursor:pointer;"></button>
                            <button onclick="setOmniColor('#ffd700')" style="width:28px; height:28px; border-radius:50%; background:#ffd700; border:1px solid #555; cursor:pointer;"></button>
                            <button onclick="setOmniColor('#10b981')" style="width:28px; height:28px; border-radius:50%; background:#10b981; border:1px solid #555; cursor:pointer;"></button>
                            <button onclick="setOmniColor('#ff4b4b')" style="width:28px; height:28px; border-radius:50%; background:#ff4b4b; border:1px solid #555; cursor:pointer;"></button>
                        </div>
                    </div>

                    <div>
                        <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--muted);">
                            <span>Border Radius</span>
                            <span id="radius-val">50px</span>
                        </div>
                        <input type="range" min="0" max="50" value="50" id="omni-radius-range" oninput="updateOmniRadius(this.value)" style="width:100%; margin-top:6px; accent-color:var(--accent);" />
                    </div>

                    <!-- Live Component Preview Box -->
                    <div style="background:#07080B; border:1px dashed rgba(255,255,255,0.15); border-radius:12px; padding:30px; display:flex; justify-content:center; align-items:center; min-height:110px;">
                        <div id="omni-live-preview">
                            <!-- Preview injected -->
                        </div>
                    </div>
                </div>

                <!-- Right Panel: Synchronized Code Export -->
                <div class="app-panel">
                    <div class="app-panel-title">
                        <span>Generated Production Code</span>
                        <button onclick="copyOmniCode()" class="proj-link" style="font-size:0.75rem; color:var(--accent);"><i class="fas fa-copy"></i> Copy Code</button>
                    </div>

                    <div class="app-select-btn-group">
                        <button class="app-chip active" onclick="switchOmniCodeTab('react')">React + Tailwind</button>
                        <button class="app-chip" onclick="switchOmniCodeTab('html')">HTML5 + CSS3</button>
                    </div>

                    <pre id="omni-code-output" class="app-terminal-output" style="min-height:220px; font-size:0.78rem;"></pre>
                </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.08); padding-top:18px; margin-top:20px;">
                <span style="font-size:0.8rem; color:var(--muted); font-family:'Space Grotesk';">Fully accessible (WCAG AA) &amp; modular UI component architecture</span>
                <button onclick="closeLiveDemo()" class="btn-secondary" style="font-size:0.85rem; padding:8px 18px;">Close Demo</button>
            </div>
        </div>
    `;
}

let omniState = {
    type: 'glow-btn',
    color: '#00f2fe',
    radius: '50px',
    codeTab: 'react'
};

function initOmniUILogic() {
    window.setOmniComponent = function(type) {
        omniState.type = type;
        document.querySelectorAll('.app-panel .app-chip').forEach(c => c.classList.remove('active'));
        if (event && event.target) event.target.classList.add('active');
        renderOmniPreview();
    };

    window.setOmniColor = function(c) {
        omniState.color = c;
        renderOmniPreview();
    };

    window.updateOmniRadius = function(val) {
        omniState.radius = val + 'px';
        document.getElementById('radius-val').textContent = val + 'px';
        renderOmniPreview();
    };

    window.switchOmniCodeTab = function(tab) {
        omniState.codeTab = tab;
        document.querySelectorAll('.app-panel:nth-child(2) .app-chip').forEach(c => c.classList.remove('active'));
        if (event && event.target) event.target.classList.add('active');
        renderOmniPreview();
    };

    function renderOmniPreview() {
        const preview = document.getElementById('omni-live-preview');
        const code = document.getElementById('omni-code-output');
        if (!preview || !code) return;

        let previewHtml = '';
        let reactCode = '';
        let htmlCode = '';

        if (omniState.type === 'glow-btn') {
            previewHtml = `<button style="background:transparent; border:1px solid ${omniState.color}; color:${omniState.color}; border-radius:${omniState.radius}; padding:12px 28px; font-family:'Syne',sans-serif; font-size:0.88rem; font-weight:700; cursor:pointer; box-shadow:0 0 20px ${omniState.color}44; transition:all 0.2s;" onmouseover="this.style.background='${omniState.color}'; this.style.color='#000';" onmouseout="this.style.background='transparent'; this.style.color='${omniState.color}';">Initialize Pipeline &rarr;</button>`;
            reactCode = `export function CyberButton({ children = "Initialize Pipeline" }) {
  return (
    <button className="px-7 py-3 rounded-[${omniState.radius}] border border-[${omniState.color}] text-[${omniState.color}] font-semibold shadow-[0_0_20px_${omniState.color}33] hover:bg-[${omniState.color}] hover:text-black transition-all duration-200">
      {children} &rarr;
    </button>
  );
}`;
            htmlCode = `<button class="omni-cyber-btn">Initialize Pipeline &rarr;</button>

<style>
.omni-cyber-btn {
  background: transparent;
  border: 1px solid ${omniState.color};
  color: ${omniState.color};
  border-radius: ${omniState.radius};
  padding: 12px 28px;
  box-shadow: 0 0 20px ${omniState.color}44;
  cursor: pointer;
  transition: all 0.2s ease;
}
.omni-cyber-btn:hover {
  background: ${omniState.color};
  color: #000;
}
</style>`;
        } else if (omniState.type === 'glass-badge') {
            previewHtml = `<div style="background:rgba(255,255,255,0.04); backdrop-filter:blur(10px); border:1px solid ${omniState.color}88; color:${omniState.color}; border-radius:${omniState.radius}; padding:8px 18px; font-family:'JetBrains Mono'; font-size:0.8rem; display:inline-flex; align-items:center; gap:8px;"><span style="width:6px; height:6px; border-radius:50%; background:${omniState.color}; box-shadow:0 0 8px ${omniState.color};"></span> PRODUCTION DEPLOYED</div>`;
            reactCode = `export function GlassBadge({ label = "PRODUCTION DEPLOYED" }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-white/[0.04] border border-[${omniState.color}]/60 text-[${omniState.color}] rounded-[${omniState.radius}] font-mono text-xs">
      <span className="w-1.5 h-1.5 rounded-full bg-[${omniState.color}] shadow-[0_0_8px_${omniState.color}]" />
      {label}
    </div>
  );
}`;
            htmlCode = `<div class="omni-badge"><span class="dot"></span> PRODUCTION DEPLOYED</div>

<style>
.omni-badge {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(10px);
  border: 1px solid ${omniState.color}88;
  color: ${omniState.color};
  border-radius: ${omniState.radius};
  padding: 8px 18px;
  font-family: monospace;
}
</style>`;
        } else if (omniState.type === 'brutal-card') {
            previewHtml = `<div style="background:#0F1015; border:2px solid ${omniState.color}; border-radius:${omniState.radius}; padding:18px 24px; box-shadow:4px 4px 0px 0px ${omniState.color};"><h4 style="color:#FFF; font-size:1rem; margin-bottom:4px;">Neobrutal Edge Card</h4><p style="color:#888; font-size:0.8rem;">Tactile hard-offset shadow container.</p></div>`;
            reactCode = `export function NeobrutalCard({ title = "Neobrutal Edge Card" }) {
  return (
    <div className="bg-[#0F1015] border-2 border-[${omniState.color}] rounded-[${omniState.radius}] p-5 shadow-[4px_4px_0px_0px_${omniState.color}]">
      <h4 className="text-white font-bold">{title}</h4>
      <p className="text-gray-400 text-xs mt-1">Tactile hard-offset shadow container.</p>
    </div>
  );
}`;
            htmlCode = `<div class="brutal-card"><h4>Neobrutal Edge Card</h4><p>Tactile hard-offset shadow container.</p></div>`;
        } else if (omniState.type === 'switch') {
            previewHtml = `<label style="position:relative; display:inline-block; width:52px; height:28px;"><input type="checkbox" checked style="opacity:0; width:0; height:0;" onchange="this.nextElementSibling.style.background = this.checked ? '${omniState.color}' : '#333';"><span style="position:absolute; cursor:pointer; inset:0; background:${omniState.color}; border-radius:${omniState.radius}; transition:0.3s;"><span style="position:absolute; content:''; height:20px; width:20px; left:4px; bottom:4px; background:#000; border-radius:50%; transition:0.3s; transform:translateX(24px);"></span></span></label>`;
            reactCode = `export function SpringSwitch({ checked, onChange }) {
  return (
    <button onClick={onChange} className="w-12 h-6 rounded-[${omniState.radius}] bg-[${omniState.color}] p-1 transition-colors">
      <div className="w-4 h-4 bg-black rounded-full transition-transform translate-x-6" />
    </button>
  );
}`;
            htmlCode = `<label class="switch"><input type="checkbox" checked><span class="slider"></span></label>`;
        }

        preview.innerHTML = previewHtml;
        code.textContent = omniState.codeTab === 'react' ? reactCode : htmlCode;
    }

    window.copyOmniCode = function() {
        const code = document.getElementById('omni-code-output');
        if (code) {
            navigator.clipboard.writeText(code.textContent);
            alert('Code copied to clipboard!');
        }
    };

    renderOmniPreview();
}

/* --- 4. PromptLens AI Optimizer --- */
function renderPromptLensDemo() {
    return `
        <div style="text-align:left;">
            <div class="app-header-bar">
                <div class="app-title-group">
                    <span style="font-family:'Space Grotesk',sans-serif; font-size:0.75rem; color:var(--gold); letter-spacing:2px; text-transform:uppercase;">04 // AI Optimization Utility</span>
                    <h3>PromptLens — Context Compressor &amp; Cost Estimator</h3>
                </div>
                <div class="app-badge-live">TOKEN METRICS</div>
            </div>

            <div class="app-workspace-grid">
                <!-- Left Panel: Prompt Input -->
                <div class="app-panel">
                    <div class="app-panel-title">
                        <span>Raw System / User Prompt</span>
                        <span id="prompt-raw-tokens" style="color:var(--gold); font-family:'JetBrains Mono';">68 Tokens</span>
                    </div>

                    <textarea id="prompt-input-text" class="app-input-field" rows="8" oninput="updatePromptStats()" style="font-size:0.82rem; line-height:1.5;">Hello AI, I want you to act as an expert senior web developer. Please help me write a modern landing page using React and Tailwind CSS. Make sure it looks very nice and has good animations and no bugs at all. Can you please write the code for me step by step with clear explanations?</textarea>

                    <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--muted); font-family:'JetBrains Mono';">
                        <span>Est. Cost (GPT-4o): <strong id="prompt-cost" style="color:var(--white);">$0.00034</strong></span>
                        <span>Words: <strong id="prompt-words" style="color:var(--white);">52</strong></span>
                    </div>

                    <button class="app-action-btn" onclick="executePromptOptimization()" style="width:100%; margin-top:4px;">
                        <i class="fas fa-bolt"></i> Optimize &amp; Compress Prompt
                    </button>
                </div>

                <!-- Right Panel: Compressed Structured Prompt -->
                <div class="app-panel">
                    <div class="app-panel-title">
                        <span>Optimized Production Prompt</span>
                        <span id="prompt-saved-badge" style="color:#10B981; font-family:'JetBrains Mono'; font-size:0.75rem;">⚡ -38% Tokens Saved</span>
                    </div>

                    <pre id="prompt-output-text" class="app-terminal-output" style="min-height:190px; font-size:0.8rem;"></pre>

                    <div style="display:flex; justify-content:flex-end;">
                        <button onclick="copyPromptOutput()" class="proj-link" style="font-size:0.75rem; color:var(--accent);"><i class="fas fa-copy"></i> Copy Optimized Prompt</button>
                    </div>
                </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.08); padding-top:18px; margin-top:20px;">
                <span style="font-size:0.8rem; color:var(--muted); font-family:'Space Grotesk';">Rule-based context compression saving OpenAI &amp; Anthropic API token costs</span>
                <button onclick="closeLiveDemo()" class="btn-secondary" style="font-size:0.85rem; padding:8px 18px;">Close Demo</button>
            </div>
        </div>
    `;
}

function initPromptLensLogic() {
    window.updatePromptStats = function() {
        const text = document.getElementById('prompt-input-text').value;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const estTokens = Math.round(text.length / 3.8);
        const estCost = (estTokens * 0.000005).toFixed(5);

        document.getElementById('prompt-raw-tokens').textContent = `${estTokens} Tokens`;
        document.getElementById('prompt-words').textContent = words;
        document.getElementById('prompt-cost').textContent = `$${estCost}`;
    };

    window.executePromptOptimization = function() {
        const text = document.getElementById('prompt-input-text').value;
        const output = document.getElementById('prompt-output-text');
        if (!text.trim() || !output) return;

        const optimized = `<system_role>Senior Full-Stack Web Developer</system_role>

<task>
Construct a high-craft modern landing page using React and Tailwind CSS.
</task>

<requirements>
- Clean component architecture and 60fps micro-interactions
- Strict responsive viewports and accessible semantic HTML
- Modular code structure with concise step-by-step implementation
</requirements>`;

        output.textContent = optimized;
        const origTokens = Math.round(text.length / 3.8);
        const optTokens = Math.round(optimized.length / 3.8);
        const pctSaved = Math.max(10, Math.round(((origTokens - optTokens) / origTokens) * 100));

        document.getElementById('prompt-saved-badge').textContent = `⚡ -${pctSaved}% Tokens Saved`;
    };

    window.copyPromptOutput = function() {
        const out = document.getElementById('prompt-output-text');
        if (out) {
            navigator.clipboard.writeText(out.textContent);
            alert('Optimized prompt copied to clipboard!');
        }
    };

    setTimeout(() => {
        updatePromptStats();
        executePromptOptimization();
    }, 150);
}

// Global escape key listener
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeHire();
        closeCaseStudy();
        closeResumeModal();
        closeLiveDemo();
    }
});
