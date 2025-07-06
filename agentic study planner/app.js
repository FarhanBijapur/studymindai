// StudyMind AI - Professional Agentic Study Planner Application

// Application State
const AppState = {
    currentPage: 'landing',
    currentUser: null,
    authToken: null,
    subjects: [],
    studySessions: [],
    aiAgents: [],
    userStats: {},
    insights: [],
    upcomingSessions: [],
    currentPlannerStep: 1,
    theme: 'auto',
    pomodoroTimer: {
        isRunning: false,
        currentTime: 25 * 60,
        focusTime: 25 * 60,
        breakTime: 5 * 60,
        isBreak: false,
        interval: null
    }
};

// Sample data from application_data_json
const sampleData = {
    subjects: [
        {"id": 1, "name": "Mathematics", "difficulty": "High", "hours_allocated": 25, "progress": 65},
        {"id": 2, "name": "Physics", "difficulty": "High", "hours_allocated": 20, "progress": 45},
        {"id": 3, "name": "Chemistry", "difficulty": "Medium", "hours_allocated": 18, "progress": 78},
        {"id": 4, "name": "Biology", "difficulty": "Medium", "hours_allocated": 15, "progress": 82},
        {"id": 5, "name": "English", "difficulty": "Low", "hours_allocated": 12, "progress": 90}
    ],
    study_sessions: [
        {"date": "2024-06-01", "subject": "Mathematics", "duration": 120, "completed": true, "score": 85},
        {"date": "2024-06-01", "subject": "Physics", "duration": 90, "completed": true, "score": 72},
        {"date": "2024-06-02", "subject": "Chemistry", "duration": 105, "completed": true, "score": 88},
        {"date": "2024-06-02", "subject": "Biology", "duration": 75, "completed": false, "score": null},
        {"date": "2024-06-03", "subject": "English", "duration": 60, "completed": true, "score": 95}
    ],
    ai_agents: [
        {"name": "PlannerBot", "role": "Study Planning", "specialty": "Schedule Optimization", "confidence": 92, "active": true},
        {"name": "ReflectionAI", "role": "Progress Analysis", "specialty": "Performance Insights", "confidence": 88, "active": true},
        {"name": "AdaptiveAI", "role": "Dynamic Adjustment", "specialty": "Real-time Optimization", "confidence": 95, "active": true},
        {"name": "AnalyticsAI", "role": "Data Analysis", "specialty": "Trend Prediction", "confidence": 90, "active": true},
        {"name": "MotivationBot", "role": "Engagement", "specialty": "User Motivation", "confidence": 87, "active": true}
    ],
    user_stats: {
        "total_study_hours": 156,
        "streak_days": 12,
        "completion_rate": 78,
        "average_score": 84,
        "goals_achieved": 8,
        "total_goals": 10
    },
    recent_insights: [
        {"agent": "ReflectionAI", "insight": "Your math performance improves 23% when studied in morning sessions", "confidence": 89},
        {"agent": "AdaptiveAI", "insight": "Recommend reducing physics session length to 75 minutes for better retention", "confidence": 91},
        {"agent": "AnalyticsAI", "insight": "You're on track to complete all goals 3 days ahead of schedule", "confidence": 94}
    ],
    upcoming_sessions: [
        {"date": "2024-06-04", "time": "09:00", "subject": "Mathematics", "duration": 120, "type": "Review"},
        {"date": "2024-06-04", "time": "14:00", "subject": "Physics", "duration": 90, "type": "New Material"},
        {"date": "2024-06-05", "time": "10:00", "subject": "Chemistry", "duration": 105, "type": "Practice"},
        {"date": "2024-06-05", "time": "16:00", "subject": "Biology", "duration": 75, "type": "Revision"}
    ]
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load sample data
    AppState.subjects = sampleData.subjects;
    AppState.studySessions = sampleData.study_sessions;
    AppState.aiAgents = sampleData.ai_agents;
    AppState.userStats = sampleData.user_stats;
    AppState.insights = sampleData.recent_insights;
    AppState.upcomingSessions = sampleData.upcoming_sessions;
    
    // Initialize theme
    initializeTheme();
    
    // Show landing page by default
    showLanding();
    
    // Initialize password strength checker
    initializePasswordStrength();
    
    // Initialize charts when dashboard is loaded
    setTimeout(() => {
        initializeCharts();
    }, 1000);
    
    // Start AI agent animations
    startAgentAnimations();
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        AppState.currentPage = pageId;
    }
}

function showLanding() {
    showPage('landing-page');
}

function showLogin() {
    showPage('auth-page');
    document.getElementById('login-form').classList.add('active');
    document.getElementById('register-form').classList.remove('active');
}

function showRegister() {
    showPage('auth-page');
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('register-form').classList.add('active');
    resetRegistrationForm();
}

function showApp() {
    showPage('app');
    showDashboard();
}

// Authentication Functions
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const loginBtn = document.getElementById('login-btn');
    
    // Show loading state
    setButtonLoading(loginBtn, true);
    
    // Simulate API call
    setTimeout(() => {
        // Simulate successful login
        AppState.currentUser = {
            name: 'John Doe',
            email: email,
            initials: 'JD'
        };
        AppState.authToken = 'simulated-jwt-token-' + Date.now();
        
        setButtonLoading(loginBtn, false);
        showApp();
        showNotification('Welcome back!', 'success');
    }, 1500);
}

function nextRegStep(event, stepNumber) {
    event.preventDefault();
    
    // Hide current step
    document.querySelectorAll('.reg-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show next step
    document.getElementById(`reg-step-${stepNumber}`).classList.add('active');
    
    // Update step indicators
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelector(`[data-step="${stepNumber}"]`).classList.add('active');
    
    AppState.currentRegStep = stepNumber;
}

function prevRegStep(stepNumber) {
    nextRegStep({ preventDefault: () => {} }, stepNumber);
}

function completeRegistration(event) {
    event.preventDefault();
    
    const completeBtn = document.getElementById('complete-reg-btn');
    setButtonLoading(completeBtn, true);
    
    // Simulate registration process
    setTimeout(() => {
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        
        AppState.currentUser = {
            name: name,
            email: email,
            initials: name.split(' ').map(n => n[0]).join('').toUpperCase()
        };
        AppState.authToken = 'simulated-jwt-token-' + Date.now();
        
        setButtonLoading(completeBtn, false);
        showApp();
        showNotification('Account created successfully!', 'success');
    }, 2000);
}

function resetRegistrationForm() {
    // Reset to step 1
    document.querySelectorAll('.reg-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById('reg-step-1').classList.add('active');
    
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelector('[data-step="1"]').classList.add('active');
    
    AppState.currentRegStep = 1;
}

function logout() {
    AppState.currentUser = null;
    AppState.authToken = null;
    hideUserMenu();
    showLanding();
    showNotification('Logged out successfully', 'info');
}

// Dashboard Functions
function showDashboard() {
    // Hide all main sections
    document.querySelectorAll('.app-main').forEach(main => {
        main.classList.remove('active');
    });
    
    // Show dashboard
    document.getElementById('dashboard').classList.add('active');
    
    // Update navigation
    updateNavigation('dashboard');
    
    // Initialize charts if not already done
    setTimeout(() => {
        initializeCharts();
    }, 100);
}

function showPlanner() {
    document.querySelectorAll('.app-main').forEach(main => {
        main.classList.remove('active');
    });
    document.getElementById('planner').classList.add('active');
    updateNavigation('planner');
    
    // Populate subjects for planner
    populateSubjectsSelection();
}

function showCalendar() {
    document.querySelectorAll('.app-main').forEach(main => {
        main.classList.remove('active');
    });
    document.getElementById('calendar').classList.add('active');
    updateNavigation('calendar');
    
    // Generate calendar
    generateCalendar();
}

function showAnalytics() {
    document.querySelectorAll('.app-main').forEach(main => {
        main.classList.remove('active');
    });
    document.getElementById('analytics').classList.add('active');
    updateNavigation('analytics');
    
    // Initialize analytics charts
    setTimeout(() => {
        initializeAnalyticsCharts();
    }, 100);
}

function showSettings() {
    document.querySelectorAll('.app-main').forEach(main => {
        main.classList.remove('active');
    });
    document.getElementById('settings').classList.add('active');
    updateNavigation('settings');
    hideUserMenu();
}

function updateNavigation(activeSection) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeButton = document.querySelector(`[onclick="show${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}()"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// AI Planner Functions
function nextPlannerStep(stepNumber) {
    if (stepNumber === 3) {
        startAIAnalysis();
    }
    
    // Hide current step
    document.querySelectorAll('.wizard-content').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show next step
    document.getElementById(`planner-step-${stepNumber}`).classList.add('active');
    
    // Update step indicators
    document.querySelectorAll('.wizard-step').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelector(`[data-step="${stepNumber}"]`).classList.add('active');
    
    AppState.currentPlannerStep = stepNumber;
}

function prevPlannerStep(stepNumber) {
    nextPlannerStep(stepNumber);
}

function populateSubjectsSelection() {
    const container = document.getElementById('subjects-selection');
    if (!container) return;
    
    container.innerHTML = '';
    
    AppState.subjects.forEach(subject => {
        const subjectDiv = document.createElement('div');
        subjectDiv.className = 'subject-item';
        subjectDiv.onclick = () => toggleSubjectSelection(subject.id, subjectDiv);
        
        subjectDiv.innerHTML = `
            <div class="subject-name">${subject.name}</div>
            <div class="subject-difficulty">Difficulty: ${subject.difficulty}</div>
            <div class="subject-progress">${subject.progress}% complete</div>
        `;
        
        container.appendChild(subjectDiv);
    });
}

function toggleSubjectSelection(subjectId, element) {
    element.classList.toggle('selected');
}

function startAIAnalysis() {
    const agents = [
        { id: 'analysis-planner', duration: 2000 },
        { id: 'analysis-adaptive', duration: 3000 },
        { id: 'analysis-analytics', duration: 4000 }
    ];
    
    agents.forEach((agent, index) => {
        setTimeout(() => {
            const agentElement = document.getElementById(agent.id);
            const progressBar = agentElement.querySelector('.progress-fill');
            
            // Animate progress bar
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Show completion
                    agentElement.querySelector('.agent-status').textContent = 'Analysis complete!';
                    
                    // Show insight
                    setTimeout(() => {
                        const insights = document.querySelectorAll('.insight-item');
                        if (insights[index]) {
                            insights[index].style.opacity = '1';
                        }
                    }, 500);
                    
                    // Move to next step when all are done
                    if (index === agents.length - 1) {
                        setTimeout(() => {
                            nextPlannerStep(4);
                            generateStudyPlan();
                        }, 1500);
                    }
                }
                progressBar.style.width = progress + '%';
            }, 100);
        }, index * 500);
    });
}

function generateStudyPlan() {
    const container = document.getElementById('generated-schedule');
    if (!container) return;
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology'];
    
    container.innerHTML = '';
    
    days.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'schedule-day';
        
        const sessionsDiv = document.createElement('div');
        sessionsDiv.className = 'schedule-sessions';
        
        // Generate 2-3 sessions per day
        const sessionCount = Math.floor(Math.random() * 2) + 2;
        for (let i = 0; i < sessionCount; i++) {
            const sessionDiv = document.createElement('div');
            sessionDiv.className = 'schedule-session';
            sessionDiv.textContent = subjects[Math.floor(Math.random() * subjects.length)];
            sessionsDiv.appendChild(sessionDiv);
        }
        
        dayDiv.innerHTML = `
            <div class="schedule-date">${day}</div>
        `;
        dayDiv.appendChild(sessionsDiv);
        
        container.appendChild(dayDiv);
    });
}

function acceptPlan() {
    showNotification('Study plan accepted! Redirecting to calendar...', 'success');
    setTimeout(() => {
        showCalendar();
    }, 1500);
}

// Calendar Functions
function generateCalendar() {
    const container = document.getElementById('calendar-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const currentDate = new Date();
    
    // Generate header
    days.forEach(day => {
        const headerDiv = document.createElement('div');
        headerDiv.className = 'calendar-day';
        headerDiv.innerHTML = `
            <div class="day-header">${day}</div>
        `;
        container.appendChild(headerDiv);
    });
    
    // Generate days with sessions
    for (let day = 1; day <= 7; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        
        const sessionsDiv = document.createElement('div');
        sessionsDiv.className = 'day-sessions';
        
        // Add some sample sessions
        if (day <= 5) { // Weekdays only
            const sessionCount = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < sessionCount; i++) {
                const sessionDiv = document.createElement('div');
                sessionDiv.className = 'session-item';
                sessionDiv.textContent = AppState.subjects[Math.floor(Math.random() * AppState.subjects.length)].name;
                sessionsDiv.appendChild(sessionDiv);
            }
        }
        
        dayDiv.innerHTML = `
            <div class="day-number">${day}</div>
        `;
        dayDiv.appendChild(sessionsDiv);
        
        container.appendChild(dayDiv);
    }
}

function previousWeek() {
    showNotification('Previous week loaded', 'info');
    generateCalendar();
}

function nextWeek() {
    showNotification('Next week loaded', 'info');
    generateCalendar();
}

function addStudySession() {
    showNotification('Add session modal would open here', 'info');
}

// Chart Initialization
function initializeCharts() {
    // Progress Chart
    const progressCtx = document.getElementById('progress-chart');
    if (progressCtx && !progressCtx.chart) {
        progressCtx.chart = new Chart(progressCtx, {
            type: 'doughnut',
            data: {
                labels: AppState.subjects.map(s => s.name),
                datasets: [{
                    data: AppState.subjects.map(s => s.progress),
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Hours Chart
    const hoursCtx = document.getElementById('hours-chart');
    if (hoursCtx && !hoursCtx.chart) {
        hoursCtx.chart = new Chart(hoursCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Study Hours',
                    data: [4, 6, 5, 8, 7, 3, 2],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

function initializeAnalyticsCharts() {
    // Performance Chart
    const performanceCtx = document.getElementById('performance-chart');
    if (performanceCtx && !performanceCtx.chart) {
        performanceCtx.chart = new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Average Score',
                    data: [75, 82, 78, 84],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
    
    // Subject Distribution Chart
    const subjectCtx = document.getElementById('subject-chart');
    if (subjectCtx && !subjectCtx.chart) {
        subjectCtx.chart = new Chart(subjectCtx, {
            type: 'pie',
            data: {
                labels: AppState.subjects.map(s => s.name),
                datasets: [{
                    data: AppState.subjects.map(s => s.hours_allocated),
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
    
    // Pattern Chart
    const patternCtx = document.getElementById('pattern-chart');
    if (patternCtx && !patternCtx.chart) {
        patternCtx.chart = new Chart(patternCtx, {
            type: 'bar',
            data: {
                labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
                datasets: [{
                    label: 'Study Sessions',
                    data: [2, 8, 5, 6, 4, 1],
                    backgroundColor: '#1FB8CD'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

// Pomodoro Timer Functions
function startPomodoroTimer() {
    document.getElementById('pomodoro-modal').classList.add('active');
    resetTimer();
}

function closePomodoroTimer() {
    document.getElementById('pomodoro-modal').classList.remove('active');
    if (AppState.pomodoroTimer.interval) {
        clearInterval(AppState.pomodoroTimer.interval);
        AppState.pomodoroTimer.isRunning = false;
    }
}

function startTimer() {
    if (AppState.pomodoroTimer.isRunning) return;
    
    AppState.pomodoroTimer.isRunning = true;
    document.getElementById('timer-start').style.display = 'none';
    document.getElementById('timer-pause').style.display = 'inline-block';
    
    AppState.pomodoroTimer.interval = setInterval(() => {
        AppState.pomodoroTimer.currentTime--;
        updateTimerDisplay();
        
        if (AppState.pomodoroTimer.currentTime <= 0) {
            // Timer finished
            clearInterval(AppState.pomodoroTimer.interval);
            AppState.pomodoroTimer.isRunning = false;
            
            // Switch between focus and break
            AppState.pomodoroTimer.isBreak = !AppState.pomodoroTimer.isBreak;
            AppState.pomodoroTimer.currentTime = AppState.pomodoroTimer.isBreak ? 
                AppState.pomodoroTimer.breakTime : AppState.pomodoroTimer.focusTime;
            
            updateTimerDisplay();
            showNotification(
                AppState.pomodoroTimer.isBreak ? 'Break time!' : 'Focus time!',
                'success'
            );
            
            document.getElementById('timer-start').style.display = 'inline-block';
            document.getElementById('timer-pause').style.display = 'none';
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(AppState.pomodoroTimer.interval);
    AppState.pomodoroTimer.isRunning = false;
    document.getElementById('timer-start').style.display = 'inline-block';
    document.getElementById('timer-pause').style.display = 'none';
}

function resetTimer() {
    clearInterval(AppState.pomodoroTimer.interval);
    AppState.pomodoroTimer.isRunning = false;
    AppState.pomodoroTimer.isBreak = false;
    AppState.pomodoroTimer.currentTime = AppState.pomodoroTimer.focusTime;
    updateTimerDisplay();
    document.getElementById('timer-start').style.display = 'inline-block';
    document.getElementById('timer-pause').style.display = 'none';
}

function updateTimerDisplay() {
    const minutes = Math.floor(AppState.pomodoroTimer.currentTime / 60);
    const seconds = AppState.pomodoroTimer.currentTime % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    document.getElementById('timer-time').textContent = timeString;
    document.getElementById('timer-label').textContent = AppState.pomodoroTimer.isBreak ? 'Break Time' : 'Focus Time';
}

// Theme Functions
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'auto';
    AppState.theme = savedTheme;
    applyTheme(savedTheme);
}

function toggleTheme() {
    const themes = ['auto', 'light', 'dark'];
    const currentIndex = themes.indexOf(AppState.theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    AppState.theme = nextTheme;
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    
    // Update theme toggle button
    const themeButton = document.querySelector('.theme-toggle');
    themeButton.textContent = nextTheme === 'dark' ? '☀️' : nextTheme === 'light' ? '🌙' : '🌓';
}

function applyTheme(theme) {
    document.documentElement.removeAttribute('data-color-scheme');
    
    if (theme === 'light') {
        document.documentElement.setAttribute('data-color-scheme', 'light');
    } else if (theme === 'dark') {
        document.documentElement.setAttribute('data-color-scheme', 'dark');
    }
    // 'auto' uses system preference via CSS media queries
}

// Utility Functions
function setButtonLoading(button, isLoading) {
    const textElement = button.querySelector('.btn-text');
    const loaderElement = button.querySelector('.btn-loader');
    
    if (isLoading) {
        if (textElement) textElement.style.display = 'none';
        if (loaderElement) loaderElement.classList.remove('hidden');
        button.disabled = true;
    } else {
        if (textElement) textElement.style.display = 'inline';
        if (loaderElement) loaderElement.classList.add('hidden');
        button.disabled = false;
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-base);
        padding: var(--space-12) var(--space-16);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform var(--duration-normal) var(--ease-standard);
        max-width: 300px;
    `;
    
    // Set color based on type
    const colors = {
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)'
    };
    
    notification.style.borderLeftColor = colors[type];
    notification.style.borderLeftWidth = '4px';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function initializePasswordStrength() {
    const passwordInput = document.getElementById('reg-password');
    if (!passwordInput) return;
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strengthFill = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');
        
        let score = 0;
        let feedback = '';
        
        if (password.length >= 8) score += 25;
        if (/[a-z]/.test(password)) score += 25;
        if (/[A-Z]/.test(password)) score += 25;
        if (/[0-9]/.test(password)) score += 25;
        
        if (score < 50) {
            feedback = 'Weak password';
            strengthFill.style.background = 'var(--color-error)';
        } else if (score < 75) {
            feedback = 'Medium password';
            strengthFill.style.background = 'var(--color-warning)';
        } else {
            feedback = 'Strong password';
            strengthFill.style.background = 'var(--color-success)';
        }
        
        strengthFill.style.width = score + '%';
        strengthText.textContent = feedback;
    });
}

function startAgentAnimations() {
    // Animate thinking dots for AI agents
    setInterval(() => {
        const agents = document.querySelectorAll('.agent-card.active');
        agents.forEach(agent => {
            const activityText = agent.querySelector('.activity-text');
            if (activityText) {
                // Rotate through different activities
                const activities = [
                    'Analyzing patterns...',
                    'Optimizing schedule...',
                    'Processing data...',
                    'Generating insights...',
                    'Learning preferences...'
                ];
                const randomActivity = activities[Math.floor(Math.random() * activities.length)];
                activityText.textContent = randomActivity;
            }
        });
    }, 5000);
    
    // Update confidence levels occasionally
    setInterval(() => {
        const confidenceBars = document.querySelectorAll('.confidence-fill');
        confidenceBars.forEach(bar => {
            const currentWidth = parseInt(bar.style.width);
            const change = (Math.random() - 0.5) * 4; // Random change of -2 to +2
            const newWidth = Math.max(85, Math.min(98, currentWidth + change));
            bar.style.width = newWidth + '%';
            
            // Update text
            const confidenceText = bar.parentElement.previousElementSibling;
            if (confidenceText) {
                confidenceText.textContent = `Confidence: ${Math.round(newWidth)}%`;
            }
        });
    }, 15000);
}

function toggleUserMenu() {
    const dropdown = document.querySelector('.user-dropdown');
    dropdown.classList.toggle('hidden');
}

function hideUserMenu() {
    const dropdown = document.querySelector('.user-dropdown');
    dropdown.classList.add('hidden');
}

// Close user menu when clicking outside
document.addEventListener('click', function(event) {
    const userMenu = document.querySelector('.user-menu');
    const dropdown = document.querySelector('.user-dropdown');
    
    if (userMenu && !userMenu.contains(event.target)) {
        dropdown.classList.add('hidden');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey || event.metaKey) {
        switch(event.key) {
            case 'd':
                event.preventDefault();
                if (AppState.currentPage === 'app') showDashboard();
                break;
            case 'p':
                event.preventDefault();
                if (AppState.currentPage === 'app') showPlanner();
                break;
            case 'c':
                event.preventDefault();
                if (AppState.currentPage === 'app') showCalendar();
                break;
            case 't':
                event.preventDefault();
                toggleTheme();
                break;
        }
    }
});

// Handle form submissions to prevent page reload
document.addEventListener('submit', function(event) {
    // This will be handled by individual form handlers
    // Just ensure we don't reload the page
});

// Initialize tooltips and help system
function initializeHelp() {
    // Add tooltips to various elements
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event) {
    const text = event.target.getAttribute('data-tooltip');
    // Implementation for tooltip display
}

function hideTooltip(event) {
    // Implementation for tooltip hiding
}

// Performance monitoring
function trackUserInteraction(action, data = {}) {
    // This would send analytics data in a real application
    console.log('User interaction:', action, data);
}

// Add interaction tracking to major buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn--primary')) {
        trackUserInteraction('primary_button_click', {
            text: event.target.textContent,
            page: AppState.currentPage
        });
    }
});

// Export functions for global access
window.StudyMindAI = {
    showLogin,
    showRegister,
    showLanding,
    showDashboard,
    showPlanner,
    showCalendar,
    showAnalytics,
    showSettings,
    toggleTheme,
    startPomodoroTimer,
    handleLogin,
    logout,
    AppState
};