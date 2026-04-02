/* ============================================
   BIBLE SIMULATOR — APP LOGIC
   ============================================ */

// --- STATE ---
const state = {
  activeNav: 'scenarios', // 'scenarios', 'passages', 'compass', or 'tapestry'
  currentScreen: 'home-screen',
  
  // Scenarios State
  currentScenario: null,
  chosenAnswer: null,
  completedScenarios: JSON.parse(localStorage.getItem('bs_completed') || '[]'),
  journalEntries: JSON.parse(localStorage.getItem('bs_journal') || '{}'),

  // Passages State
  currentPassage: null,
  selectedBankWord: null, // the word currently selected from the bank
  slots: [], // tracks filled state for current passage
};

// --- DOM REFS ---
const screens = {
  'home-screen': document.getElementById('home-screen'),
  'scenario-screen': document.getElementById('scenario-screen'),
  'revelation-screen': document.getElementById('revelation-screen'),
  'reflection-screen': document.getElementById('reflection-screen'),
  'passages-home-screen': document.getElementById('passages-home-screen'),
  'passage-play-screen': document.getElementById('passage-play-screen'),
  'compass-home-screen': document.getElementById('compass-home-screen'),
  'compass-play-screen': document.getElementById('compass-play-screen'),
  'tapestry-screen': document.getElementById('tapestry-screen'),
};

const particlesContainer = document.getElementById('particles-container');

// --- APP INIT & NAV ---
function initApp() {
  buildHomeScreen();
  buildPassagesScreen();
  buildCompassScreen();
  buildTapestryScreen();

  // Bottom Nav
  document.getElementById('nav-scenarios').addEventListener('click', () => switchNav('scenarios', 'home-screen'));
  document.getElementById('nav-passages').addEventListener('click', () => switchNav('passages', 'passages-home-screen'));
  document.getElementById('nav-compass').addEventListener('click', () => switchNav('compass', 'compass-home-screen'));
  document.getElementById('nav-tapestry').addEventListener('click', () => switchNav('tapestry', 'tapestry-screen'));

  // Scenario Buttons
  document.getElementById('back-from-scenario').addEventListener('click', () => transitionTo('home-screen'));
  document.getElementById('back-from-revelation').addEventListener('click', () => transitionTo('scenario-screen'));
  document.getElementById('back-from-reflection').addEventListener('click', () => {
    transitionTo('home-screen');
    setTimeout(buildHomeScreen, 400);
  });
  document.getElementById('btn-reflect').addEventListener('click', () => {
    renderReflectionScreen(state.currentScenario);
    transitionTo('reflection-screen');
  });
  const journalEl = document.getElementById('journal-textarea');
  if (journalEl) journalEl.addEventListener('input', saveJournal);

  // Passage Buttons
  document.getElementById('back-from-passage').addEventListener('click', () => {
    transitionTo('passages-home-screen');
    setTimeout(buildPassagesScreen, 400);
  });
  document.getElementById('passage-solve-btn').addEventListener('click', checkPassageAnswers);
  document.getElementById('passage-reset-btn').addEventListener('click', () => renderPassagePlayScreen(state.currentPassage));

  // Compass Buttons
  document.getElementById('back-from-compass').addEventListener('click', () => transitionTo('compass-home-screen'));

  // Pop-up Toast Interval
  setInterval(showWisdomToast, 25000); // Trigger every 25s
  setTimeout(showWisdomToast, 5000);   // Show first one after 5s

  // Show default screen
  screens['home-screen'].classList.add('active');
}



// --- SCREEN TRANSITIONS ---
function transitionTo(name) {
  if (state.currentScreen === name) return;
  
  const current = screens[state.currentScreen];
  const next = screens[name];

  if(current) {
    current.style.opacity = '0';
    current.style.transform = 'translateY(-20px)';
    current.style.pointerEvents = 'none';
  }

  setTimeout(() => {
    if(current) {
      current.classList.remove('active');
      current.style.opacity = '';
      current.style.transform = '';
      current.style.pointerEvents = '';
    }

    state.currentScreen = name;
    next.classList.add('active');
    next.style.pointerEvents = '';
  }, 320);
}

// ============================================
//   SCENARIOS LOGIC
// ============================================

function buildHomeScreen() {
  const grid = document.getElementById('theme-grid');
  grid.innerHTML = '';

  SCENARIOS.forEach((s, i) => {
    const completed = state.completedScenarios.includes(s.id);
    const card = document.createElement('div');
    card.className = `theme-card fade-up delay-${Math.min(i + 1, 6)} ${completed ? 'completed' : ''}`;
    card.style.setProperty('--card-accent', s.color);
    card.style.setProperty('--card-color-a', hexToRgba(s.color, 0.08));
    card.style.setProperty('--card-color-b', hexToRgba(s.color, 0.02));
    card.innerHTML = `
      <div class="completion-badge">✓</div>
      <span class="card-icon">${s.icon}</span>
      <div class="card-theme">${s.theme}</div>
      <div class="card-book">${s.bookTitle}</div>
      <span class="card-pill">${s.book}</span>
    `;
    card.addEventListener('click', () => openScenario(s.id));
    grid.appendChild(card);
  });

  updateStatsBar();
}

function updateStatsBar() {
  document.getElementById('stat-completed').textContent = state.completedScenarios.length;
  document.getElementById('stat-total').textContent = SCENARIOS.length;
}

function openScenario(id) {
  const s = SCENARIOS.find(sc => sc.id === id);
  if (!s) return;
  state.currentScenario = s;
  state.chosenAnswer = null;
  
  document.getElementById('scenario-icon').textContent = s.icon;
  document.getElementById('scenario-theme-name').textContent = s.theme;
  document.getElementById('scenario-story').textContent = s.modern_story;

  const choicesGrid = document.getElementById('choices-grid');
  choicesGrid.innerHTML = '';

  s.choices.forEach((c) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.id = `choice-${c.id}`;
    btn.innerHTML = `<span class="choice-letter">${c.id}</span><span>${c.text}</span>`;
    btn.addEventListener('click', () => selectChoice(c.id));
    choicesGrid.appendChild(btn);
  });

  transitionTo('scenario-screen');
}

function selectChoice(choiceId) {
  state.chosenAnswer = choiceId;
  const btn = document.getElementById(`choice-${choiceId}`);
  if (btn) {
    btn.style.background = 'rgba(201,168,76,0.2)';
    btn.style.borderColor = 'rgba(201,168,76,0.6)';
    btn.style.transform = 'translateX(8px)';
  }

  setTimeout(() => {
    renderRevelationScreen(state.currentScenario, choiceId);
    transitionTo('revelation-screen');
  }, 400);
}

function renderRevelationScreen(s, choiceId) {
  const rev = s.revelations[choiceId];
  const chosen = s.choices.find(c => c.id === choiceId);
  const badge = document.getElementById('alignment-badge');
  const bc = {
    wisdom:   { icon: '✨', label: 'The Wisdom Path' },
    positive: { icon: '✅', label: 'A Good Instinct' },
    neutral:  { icon: '🔍', label: 'A Natural Response' },
    negative: { icon: '⚡', label: 'A Human Reaction' },
  }[rev.alignment] || { icon: '🔍', label: 'A Natural Response' };
  
  badge.className = `alignment-badge ${rev.alignment}`;
  badge.innerHTML = `<span>${bc.icon}</span> ${bc.label}`;
  
  const titleMap = {
    wisdom: 'The Biblical Way', positive: 'A Godly Instinct',
    neutral: 'A Common Response', negative: 'What the Bible Warns'
  };
  document.getElementById('revelation-title').textContent = titleMap[rev.alignment] || 'The Lesson';
  document.getElementById('revelation-subtitle').textContent = `From ${s.bookTitle} — ${s.book}`;
  document.getElementById('chosen-answer-display').innerHTML = `<strong>You chose:</strong> ${chosen.text}`;
  document.getElementById('verse-ref').textContent = rev.verse;
  document.getElementById('verse-text').textContent = rev.text;
  document.getElementById('lesson-text').textContent = rev.lesson;
}

function renderReflectionScreen(s) {
  document.getElementById('gem-icon').textContent = s.icon;
  document.getElementById('gem-title').textContent = s.gem;
  document.getElementById('reflection-prompt').textContent = s.reflection_prompt;
  document.getElementById('journal-textarea').value = state.journalEntries[s.id] || '';

  if (!state.completedScenarios.includes(s.id)) {
    state.completedScenarios.push(s.id);
    localStorage.setItem('bs_completed', JSON.stringify(state.completedScenarios));
    spawnParticles();
  }
}

function saveJournal() {
  const s = state.currentScenario;
  if (!s) return;
  state.journalEntries[s.id] = document.getElementById('journal-textarea').value;
  localStorage.setItem('bs_journal', JSON.stringify(state.journalEntries));
}


// ============================================
//   PASSAGES LOGIC
// ============================================

function buildPassagesScreen() {
  const grid = document.getElementById('passages-grid');
  grid.innerHTML = '';
  
  const completedPassages = JSON.parse(localStorage.getItem('bs_passages_completed') || '[]');

  PASSAGES.forEach((p, i) => {
    const completed = completedPassages.includes(p.id);
    const card = document.createElement('div');
    card.className = `theme-card fade-up delay-${Math.min(i + 1, 6)} ${completed ? 'completed' : ''}`;
    card.style.setProperty('--card-accent', p.color);
    card.style.setProperty('--card-color-a', hexToRgba(p.color, 0.08));
    card.style.setProperty('--card-color-b', hexToRgba(p.color, 0.02));
    card.innerHTML = `
      <div class="completion-badge">✓</div>
      <span class="card-icon">${p.icon}</span>
      <div class="card-theme">${p.title}</div>
      <div class="card-book">${p.theme}</div>
      <span class="card-pill">${p.reference}</span>
    `;
    card.addEventListener('click', () => openPassage(p.id));
    grid.appendChild(card);
  });
}

function openPassage(id) {
  const p = PASSAGES.find(x => x.id === id);
  if (!p) return;
  renderPassagePlayScreen(p);
  transitionTo('passage-play-screen');
}

function renderPassagePlayScreen(p) {
  state.currentPassage = p;
  state.selectedBankWord = null;
  state.slots = new Array(p.words.length).fill(null);
  
  document.getElementById('passage-title').textContent = p.title;
  document.getElementById('passage-ref').textContent = p.reference;
  
  document.getElementById('passage-solve-btn').style.display = 'none';

  // Build the text area with blanks
  const textArea = document.getElementById('passage-text-area');
  let html = p.text;
  let slotIndex = 0;
  
  // Replace {word} with span tags
  html = html.replace(/\{([^}]+)\}/g, (match, word) => {
    const span = `<span class="blank-slot" data-index="${slotIndex}">______</span>`;
    slotIndex++;
    return span;
  });
  textArea.innerHTML = html;

  // Add listeners to slots
  document.querySelectorAll('.blank-slot').forEach(slot => {
    slot.addEventListener('click', (e) => handleSlotClick(e.target));
  });

  // Build Word Bank (shuffled)
  const allWords = [...p.words, ...p.decoys];
  allWords.sort(() => Math.random() - 0.5); // simple shuffle
  
  const wordBank = document.getElementById('word-bank');
  wordBank.innerHTML = '';
  
  allWords.forEach(word => {
    const btn = document.createElement('button');
    btn.className = 'word-btn';
    btn.textContent = word;
    btn.addEventListener('click', () => handleBankWordClick(btn, word));
    wordBank.appendChild(btn);
  });
}

function handleBankWordClick(btn, word) {
  // If already used, do nothing
  if (btn.classList.contains('used')) return;
  
  // Deselect previous
  document.querySelectorAll('.word-btn').forEach(b => b.classList.remove('selected'));
  
  // If clicking same word, just deselect
  if (state.selectedBankWord === word) {
    state.selectedBankWord = null;
    return;
  }
  
  // Select new
  btn.classList.add('selected');
  state.selectedBankWord = word;
}

function handleSlotClick(slot) {
  const idx = slot.getAttribute('data-index');
  const currentWordInSlot = state.slots[idx];
  
  // If a bank word is selected, we want to place it
  if (state.selectedBankWord) {
    // If slot had a word, return it to bank
    if (currentWordInSlot) {
      unuseWordInBank(currentWordInSlot);
    }
    
    // Fill slot
    slot.textContent = state.selectedBankWord;
    slot.classList.add('filled');
    state.slots[idx] = state.selectedBankWord;
    
    // Mark word as used in bank
    useWordInBank(state.selectedBankWord);
    
    // Clear selection
    state.selectedBankWord = null;
    document.querySelectorAll('.word-btn').forEach(b => b.classList.remove('selected'));
    
    // Check if all slots full
    if (state.slots.every(w => w !== null)) {
      document.getElementById('passage-solve-btn').style.display = 'inline-flex';
    }
    
  } else {
    // No word selected. If slot has word, remove it back to bank
    if (currentWordInSlot) {
      unuseWordInBank(currentWordInSlot);
      slot.textContent = "______";
      slot.classList.remove('filled', 'correct', 'incorrect');
      state.slots[idx] = null;
      document.getElementById('passage-solve-btn').style.display = 'none';
    }
  }
}

function useWordInBank(word) {
  document.querySelectorAll('.word-btn').forEach(b => {
    if (b.textContent === word && !b.classList.contains('used')) {
      b.classList.add('used');
    }
  });
}

function unuseWordInBank(word) {
  let unmarked = false;
  document.querySelectorAll('.word-btn').forEach(b => {
    if (!unmarked && b.textContent === word && b.classList.contains('used')) {
      b.classList.remove('used');
      unmarked = true;
    }
  });
}

function checkPassageAnswers() {
  const p = state.currentPassage;
  const correctWords = p.words;
  let allCorrect = true;
  
  document.querySelectorAll('.blank-slot').forEach(slot => {
    const idx = parseInt(slot.getAttribute('data-index'), 10);
    slot.classList.remove('correct', 'incorrect');
    if (state.slots[idx] === correctWords[idx]) {
      slot.classList.add('correct');
    } else {
      slot.classList.add('incorrect');
      allCorrect = false;
    }
  });
  
  if (allCorrect) {
    spawnParticles();
    document.getElementById('passage-solve-btn').textContent = "Excellent!";
    
    let completed = JSON.parse(localStorage.getItem('bs_passages_completed') || '[]');
    if (!completed.includes(p.id)) {
      completed.push(p.id);
      localStorage.setItem('bs_passages_completed', JSON.stringify(completed));
    }
  } else {
    const card = document.querySelector('.passage-card');
    card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 400);

    document.getElementById('passage-solve-btn').textContent = "Try Again";
    setTimeout(() => {
      document.getElementById('passage-solve-btn').textContent = "Check Answers";
    }, 2000);
  }
}

// ============================================
//   COMPASS LOGIC
// ============================================

function buildCompassScreen() {
  const grid = document.getElementById('compass-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  COMPASS_DATA.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = `theme-card fade-up delay-${Math.min(i + 1, 6)}`;
    card.style.setProperty('--card-accent', c.color);
    card.style.setProperty('--card-color-a', hexToRgba(c.color, 0.08));
    card.style.setProperty('--card-color-b', hexToRgba(c.color, 0.02));
    card.innerHTML = `
      <span class="card-icon">${c.icon}</span>
      <div class="card-theme">${c.emotion}</div>
    `;
    card.addEventListener('click', () => openCompass(c.id));
    grid.appendChild(card);
  });
}

function openCompass(id) {
  const c = COMPASS_DATA.find(x => x.id === id);
  if (!c) return;
  
  document.getElementById('compass-title').textContent = `Feeling ${c.emotion}`;
  document.getElementById('compass-ref').textContent = c.ref;
  document.getElementById('compass-verse').textContent = c.verse;
  document.getElementById('compass-prescription').textContent = c.prescription;
  document.getElementById('compass-prayer').textContent = `"${c.prayer}"`;
  
  const badge = document.getElementById('compass-badge');
  badge.style.color = c.color;
  badge.style.borderColor = c.color;
  document.getElementById('compass-icon').textContent = c.icon;
  
  transitionTo('compass-play-screen');
}


// ============================================
//   TAPESTRY LOGIC (LEGACY)
// ============================================

function buildTapestryScreen() {
  const list = document.getElementById('tapestry-list');
  const empty = document.getElementById('tapestry-empty');
  if (!list || !empty) return;

  list.innerHTML = '';
  
  const idsInJournal = Object.keys(state.journalEntries).filter(id => state.journalEntries[id].trim().length > 0);

  if (idsInJournal.length === 0) {
    empty.style.display = 'block';
    list.style.display = 'none';
  } else {
    empty.style.display = 'none';
    list.style.display = 'flex';

    idsInJournal.forEach((id, i) => {
      const s = SCENARIOS.find(sc => sc.id === id);
      if (!s) return;

      const card = document.createElement('div');
      card.className = `tapestry-card fade-up delay-${Math.min(i + 1, 6)}`;
      card.innerHTML = `
        <div class="tapestry-header">
          <div class="tapestry-theme-info">
            <span class="tapestry-icon">${s.icon}</span>
            <span class="tapestry-theme">${s.theme}</span>
          </div>
          <div class="tapestry-ref">${s.bookTitle}</div>
        </div>
        <div class="tapestry-entry">"${state.journalEntries[id]}"</div>
      `;
      list.appendChild(card);
    });
  }
}

// Ensure tapestry refreshes whenever the nav is switched
function switchNav(navId, screenId) {
  if (state.activeNav === navId && state.currentScreen === screenId) return;
  state.activeNav = navId;
  
  // Refresh content if switching into it
  if (navId === 'tapestry') buildTapestryScreen();
  if (navId === 'scenarios') buildHomeScreen();

  // Update nav UI
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById(`nav-${navId}`).classList.add('active');
  
  transitionTo(screenId);
}


// ============================================
//   UTILITIES
// ============================================

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function spawnParticles() {
  const colors = ['#c9a84c', '#e4c97a', '#fff7d6', '#f5c842', '#a07828'];
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = (20 + Math.random() * 60) + 'vw';
    p.style.top = (30 + Math.random() * 40) + 'vh';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.width = (4 + Math.random() * 6) + 'px';
    p.style.height = p.style.width;
    p.style.animationDelay = (Math.random() * 0.6) + 's';
    p.style.animationDuration = (0.8 + Math.random() * 0.8) + 's';
    particlesContainer.appendChild(p);
    setTimeout(() => p.remove(), 2000);
  }
}

// --- WISDOM TOASTS ---
const TOAST_VERSES = [
  { ref: "Proverbs 16:24", text: "Gracious words are a honeycomb, sweet to the soul and healing to the bones." },
  { ref: "Psalm 119:105", text: "Your word is a lamp for my feet, a light on my path." },
  { ref: "Matthew 11:28", text: "Come to me, all you who are weary and burdened, and I will give you rest." },
  { ref: "Isaiah 40:31", text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles." },
  { ref: "John 14:27", text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives." },
  { ref: "Proverbs 3:3", text: "Let love and faithfulness never leave you; bind them around your neck." },
  { ref: "Psalm 46:10", text: "Be still, and know that I am God." }
];

function showWisdomToast() {
  // Only show if user is on the main screens
  const mainScreens = ['home-screen', 'passages-home-screen', 'compass-home-screen', 'tapestry-screen'];
  if (!mainScreens.includes(state.currentScreen)) return;

  const container = document.getElementById('wisdom-toast-container');
  if (!container) return;

  const verse = TOAST_VERSES[Math.floor(Math.random() * TOAST_VERSES.length)];

  const toast = document.createElement('div');
  toast.className = 'wisdom-toast';
  toast.innerHTML = `
    <div class="toast-ref">${verse.ref}</div>
    <div class="toast-text">"${verse.text}"</div>
  `;

  // Dismiss on click
  toast.addEventListener('click', () => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 600);
  });

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
  });

  // Auto remove after 9 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 600);
    }
  }, 9000);
}

// Bootstrap
document.addEventListener('DOMContentLoaded', initApp);
