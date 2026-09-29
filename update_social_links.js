const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update Footer Connect Column
const oldFooterConnect = `                <!-- Connect Column -->
                <div class="footer-col-follow reveal-fade-up" style="transition-delay: 300ms;">
                    <p class="footer-col-title">Connect</p>
                    <ul class="footer-links-list">
                        <li><a href="https://github.com/manishkumarsoni7" target="_blank" rel="noreferrer noopener">GitHub</a></li>
                        <li><a href="https://linkedin.com" target="_blank" rel="noreferrer noopener">LinkedIn</a></li>
                        <li><a href="https://twitter.com" target="_blank" rel="noreferrer noopener">Twitter / X</a></li>
                    </ul>
                </div>`;

const newFooterConnect = `                <!-- Connect Column -->
                <div class="footer-col-follow reveal-fade-up" style="transition-delay: 300ms;">
                    <p class="footer-col-title">Connect</p>
                    <ul class="footer-links-list">
                        <li><a href="https://github.com/manishkumarsoni7" target="_blank" rel="noreferrer noopener">GitHub ↗</a></li>
                        <li><a href="https://www.linkedin.com/in/manishkumarsoni7" target="_blank" rel="noreferrer noopener">LinkedIn ↗</a></li>
                        <li><a href="https://www.instagram.com/themanish.ai" target="_blank" rel="noreferrer noopener">Instagram ↗</a></li>
                    </ul>
                </div>`;

html = html.replace(oldFooterConnect, newFooterConnect);

// 2. Update Modal Menu Bottom Block
const oldModalSocial = `                <div style="display:flex; gap:1.5rem;">
                    <a href="https://github.com/manishkumarsoni7" target="_blank" rel="noreferrer noopener" style="color:var(--text-muted); font-size:0.875rem; text-transform:uppercase; letter-spacing:0.16em;">GitHub</a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer noopener" style="color:var(--text-muted); font-size:0.875rem; text-transform:uppercase; letter-spacing:0.16em;">LinkedIn</a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer noopener" style="color:var(--text-muted); font-size:0.875rem; text-transform:uppercase; letter-spacing:0.16em;">Twitter</a>
                </div>`;

const newModalSocial = `                <div style="display:flex; flex-wrap:wrap; gap:1.5rem;">
                    <a href="https://github.com/manishkumarsoni7" target="_blank" rel="noreferrer noopener" style="color:var(--text-muted); font-size:0.875rem; text-transform:uppercase; letter-spacing:0.16em; transition:color 0.3s ease;" onmouseover="this.style.color='#00f2fe'" onmouseout="this.style.color='var(--text-muted)'">GitHub</a>
                    <a href="https://www.linkedin.com/in/manishkumarsoni7" target="_blank" rel="noreferrer noopener" style="color:var(--text-muted); font-size:0.875rem; text-transform:uppercase; letter-spacing:0.16em; transition:color 0.3s ease;" onmouseover="this.style.color='#00f2fe'" onmouseout="this.style.color='var(--text-muted)'">LinkedIn</a>
                    <a href="https://www.instagram.com/themanish.ai" target="_blank" rel="noreferrer noopener" style="color:var(--text-muted); font-size:0.875rem; text-transform:uppercase; letter-spacing:0.16em; transition:color 0.3s ease;" onmouseover="this.style.color='#00f2fe'" onmouseout="this.style.color='var(--text-muted)'">Instagram</a>
                </div>`;

html = html.replace(oldModalSocial, newModalSocial);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated all social links to GitHub, LinkedIn, and Instagram with real URLs!');
