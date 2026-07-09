
export default function loadHomePage() { 

    const content = document.getElementById('content');

    addFirstSection(content);
}

function addFirstSection(content)
{
    const firstSection = document.createElement('section');
    firstSection.classList.add('hero');
    firstSection.innerHTML = `
        <div class="hero-content">
            <h2>The Same to do list as always, but simpler</h2>
            <p>Easily to start to manage your personal task, family projects and team's work.</p>
            <button class="hero-button" onclick="loadProjects()">Get Started</button>
        </div>
    `;
    content.appendChild(firstSection);
}