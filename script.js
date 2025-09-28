document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const projectsGrid = document.getElementById('projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Project data source
    const projectsData = [
        {
            title: 'Nebula Clash (2D Shooter)',
            stack: 'Unity, C#, Game Design',
            tags: ['Game Dev'],
            details: [
                'Designed and developed a fully functional 2D space shooter game named "Nebula Clash" using Unity and C#.',
                'Implemented core game mechanics including player movement, enemy spawning, projectile physics, and score tracking.',
                'Managed game assets and created engaging level design, showcasing skills in rapid prototyping and iterative development.'
            ],
            url: 'https://muhammad-mutee-ullah.itch.io/nebula-clash'
        },
        {
            title: 'Multi-Client Chat Application',
            stack: 'JAVA, MySQL, Socket Programming',
            tags: ['Java'],
            details: [
                'Developed a multi-client chat application using Java socket programming, demonstrating a fundamental understanding of network protocols and concurrent handling of user connections.',
                'Integrated the application with a MySQL database for persistent storage of user profiles and chat history, utilizing JDBC for seamless communication and data retrieval.'
            ],
            url: null
        },
        {
            title: 'OOP Banking Management System',
            stack: 'JAVA (OOP), JDBC',
            tags: ['Java'],
            details: [
                'Designed and implemented a Banking Management System using Java, applying core OOP principles (Inheritance, Abstraction, Polymorphism) to create a robust and scalable architecture for transaction processing.'
            ],
            url: null
        },
        {
            title: 'Cricket Statistics Tracker',
            stack: 'C Language, File Handling',
            tags: ['C'],
            details: [
                'Developed a console-based Cricket Match Statistics Tracker, utilizing C, and implementing efficient file handling techniques (I/O operations) for persistent storage and retrieval of scores, player data, and match results.'
            ],
            url: null
        }
    ];
    
    // --- 1. Mobile Menu Toggle ---
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // --- 2. Smooth Scrolling and Mobile Menu Close ---
    document.querySelectorAll('#mobile-menu a, .main-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                // Scroll smoothly to the target section
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // --- 3. Skills Chart Initialization (Chart.js) ---
    function initializeSkillsChart() {
        // Retrieve CSS variables for dark mode compatibility
        const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-main').trim();
        const darkTextColor = getComputedStyle(document.documentElement).getPropertyValue('--color-text-dark').trim();
        const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim();

        const skillsCtx = document.getElementById('skillsChart');
        if (!skillsCtx) {
            console.error("Skills chart canvas not found.");
            return;
        }

        const skillsChart = new Chart(skillsCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Java & OOP', 'MySQL', 'HTML/CSS/JS', 'C', 'Python', 'Dart & Flutter', 'Unity & C#'],
                datasets: [{
                    label: 'Proficiency',
                    data: [90, 85, 75, 70, 65, 50, 70], // Sample data
                    backgroundColor: accentColor,
                    borderColor: '#1D4ED8',
                    borderWidth: 2,
                    borderRadius: 8,
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return context.raw + '% Proficiency';
                            }
                        },
                        backgroundColor: 'rgba(30, 41, 59, 0.95)',
                        titleFont: { size: 14, weight: 'bold' },
                        bodyFont: { size: 14 },
                        padding: 10,
                        boxPadding: 4,
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        grid: { display: true, color: gridColor },
                        ticks: {
                            callback: function (value) { return value + '%' },
                            color: darkTextColor,
                            font: { weight: '600' }
                        },
                        border: { display: false }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { color: darkTextColor, font: { weight: '700' } },
                        border: { display: false }
                    }
                }
            }
        });
    }

    // --- 4. Project Rendering and Interaction ---
    function renderProjects(filter = 'all') {
        projectsGrid.innerHTML = '';
        const filteredProjects = filter === 'all'
            ? projectsData
            : projectsData.filter(p => p.tags.includes(filter));

        if (filteredProjects.length === 0) {
             projectsGrid.innerHTML = '<p class="text-center col-span-full text-xl text-gray-500 py-10 font-medium">No projects match this filter yet. Try "All Projects".</p>';
             return;
        }

        filteredProjects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card'; 

            // Prepare details list
            const detailsList = project.details.map(d => `<li class="text-base leading-snug">${d}</li>`).join('');

            // Add project link button if URL exists
            const linkButton = project.url ? `
                <a href="${project.url}" target="_blank" class="project-link-btn">
                    View on Itch.io
                    <!-- External Link Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="ml-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                </a>` : '';


            card.innerHTML = `
                <h3 class="project-title">${project.title.split(' ').map((word, index) => index === 0 ? `<span>${word}</span>` : word).join(' ')}</h3>
                <p class="project-stack">${project.stack}</p>
                <div class="project-card-details">
                    <ul class="list-disc list-inside space-y-3 text-gray-400">
                        ${detailsList}
                    </ul>
                    ${linkButton}
                </div>
                <p class="card-expand-link">
                    <span class="indicator-text">Click to expand details</span>
                    <!-- Chevron Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon ml-2 indicator-icon" viewBox="0 0 24 24" width="16" height="16">
                        <path d="M6 9l6 6 6-6"></path>
                    </svg>
                </p>
            `;
            projectsGrid.appendChild(card);
        });
        addCardListeners();
    }

    function addCardListeners() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Prevent expansion if the click target is the button link or its child elements
                if (e.target.closest('.project-link-btn')) {
                    return;
                }

                // Close all other open cards first for a cleaner look
                document.querySelectorAll('.project-card.open').forEach(openCard => {
                    if (openCard !== card) {
                        openCard.classList.remove('open');
                        openCard.querySelector('.indicator-text').textContent = 'Click to expand details';
                    }
                });

                // Toggle the clicked card
                card.classList.toggle('open');
                const expandText = card.querySelector('.indicator-text');

                if (card.classList.contains('open')) {
                    expandText.textContent = 'Click to collapse details';
                } else {
                    expandText.textContent = 'Click to expand details';
                }
            });
        });
    }

    // --- 5. Filter Button Logic ---
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            renderProjects(filter);
            filterButtons.forEach(btn => {
                btn.classList.remove('filter-btn-active');
                btn.classList.add('filter-btn-default');
            });
            button.classList.add('filter-btn-active');
            button.classList.remove('filter-btn-default');
        });
    });

    // Initializations
    initializeSkillsChart();
    renderProjects();
});
