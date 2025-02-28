const countries = [
    { name: 'United States', timezone: 'America/New_York' },
    { name: 'United Kingdom', timezone: 'Europe/London' },
    { name: 'Japan', timezone: 'Asia/Tokyo' },
    { name: 'Australia', timezone: 'Australia/Sydney' },
    { name: 'India', timezone: 'Asia/Kolkata' },
    { name: 'Germany', timezone: 'Europe/Berlin' },
    { name: 'Brazil', timezone: 'America/Sao_Paulo' },
    { name: 'Canada', timezone: 'America/Toronto' },
    { name: 'China', timezone: 'Asia/Shanghai' },
    { name: 'France', timezone: 'Europe/Paris' },
    { name: 'Spain', timezone: 'Europe/Madrid' },
    { name: 'Italy', timezone: 'Europe/Rome' },
    { name: 'Russia', timezone: 'Europe/Moscow' },
    { name: 'Mexico', timezone: 'America/Mexico_City' },
    { name: 'South Korea', timezone: 'Asia/Seoul' },
    { name: 'Romania', timezone: 'Europe/Bucharest' },
    { name: 'Greece', timezone: 'Europe/Athens' },
    { name: 'Poland', timezone: 'Europe/Warsaw' },
    { name: 'Netherlands', timezone: 'Europe/Amsterdam' },
    { name: 'Belgium', timezone: 'Europe/Brussels' },
    { name: 'Sweden', timezone: 'Europe/Stockholm' },
    { name: 'Norway', timezone: 'Europe/Oslo' },
    { name: 'Denmark', timezone: 'Europe/Copenhagen' },
    { name: 'Finland', timezone: 'Europe/Helsinki' },
    { name: 'Portugal', timezone: 'Europe/Lisbon' },
    { name: 'Thailand', timezone: 'Asia/Bangkok' },
    { name: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh' },
    { name: 'Indonesia', timezone: 'Asia/Jakarta' },
    { name: 'Malaysia', timezone: 'Asia/Kuala_Lumpur' },
    { name: 'Philippines', timezone: 'Asia/Manila' },
    { name: 'Singapore', timezone: 'Asia/Singapore' },
    { name: 'New Zealand', timezone: 'Pacific/Auckland' },
    { name: 'South Africa', timezone: 'Africa/Johannesburg' },
    { name: 'Egypt', timezone: 'Africa/Cairo' },
    { name: 'Turkey', timezone: 'Europe/Istanbul' },
    { name: 'Israel', timezone: 'Asia/Jerusalem' },
    { name: 'Argentina', timezone: 'America/Argentina/Buenos_Aires' },
    { name: 'Chile', timezone: 'America/Santiago' },
    { name: 'Peru', timezone: 'America/Lima' },
    { name: 'Switzerland', timezone: 'Europe/Zurich' },
    { name: 'Austria', timezone: 'Europe/Vienna' },
    { name: 'Ireland', timezone: 'Europe/Dublin' },
    { name: 'Czech Republic', timezone: 'Europe/Prague' },
    { name: 'Hungary', timezone: 'Europe/Budapest' },
    { name: 'Ukraine', timezone: 'Europe/Kiev' },
    { name: 'Croatia', timezone: 'Europe/Zagreb' },
    { name: 'Bulgaria', timezone: 'Europe/Sofia' },
    { name: 'Serbia', timezone: 'Europe/Belgrade' },
    { name: 'Slovakia', timezone: 'Europe/Bratislava' },
    { name: 'Taiwan', timezone: 'Asia/Taipei' },
    { name: 'Hong Kong', timezone: 'Asia/Hong_Kong' },
    { name: 'United Arab Emirates', timezone: 'Asia/Dubai' },
    { name: 'Saudi Arabia', timezone: 'Asia/Riyadh' },
    { name: 'Qatar', timezone: 'Asia/Qatar' },
    { name: 'Kuwait', timezone: 'Asia/Kuwait' },
    { name: 'Pakistan', timezone: 'Asia/Karachi' },
    { name: 'Bangladesh', timezone: 'Asia/Dhaka' },
    { name: 'Morocco', timezone: 'Africa/Casablanca' },
    { name: 'Nigeria', timezone: 'Africa/Lagos' },
    { name: 'Kenya', timezone: 'Africa/Nairobi' },
    { name: 'Ethiopia', timezone: 'Africa/Addis_Ababa' },
    { name: 'Mexico', timezone: 'America/Mexico_City' },
    { name: 'Colombia', timezone: 'America/Bogota' },
    { name: 'Venezuela', timezone: 'America/Caracas' },
    { name: 'Ecuador', timezone: 'America/Guayaquil' },
    { name: 'Bolivia', timezone: 'America/La_Paz' },
    { name: 'Uruguay', timezone: 'America/Montevideo' },
    { name: 'Paraguay', timezone: 'America/Asuncion' },
    { name: 'Iceland', timezone: 'Atlantic/Reykjavik' },
    { name: 'Fiji', timezone: 'Pacific/Fiji' },
    { name: 'Samoa', timezone: 'Pacific/Apia' },
    { name: 'Hawaii', timezone: 'Pacific/Honolulu' },
  ];

  const countrySearch = document.getElementById('countrySearch');
  const suggestionsContainer = document.getElementById('suggestions');
  const timeDisplay = document.getElementById('time');
  const timezoneDisplay = document.getElementById('timezone');
  const loadingIndicator = document.getElementById('loading');
  const dateDisplay = document.getElementById('date');
  const themeToggle = document.getElementById('themeToggle');

  let selectedTimezones = new Set();
  let updateInterval;
  let selectedIndex = -1;

  const themeMap = {
    'dark': '',
    'light': 'light-theme',
    'blue': 'blue-theme',
    'amber': 'amber-theme'
  };

  const themeDescriptions = {
    0: 'Dark Theme - Classic dark mode for night viewing',
    1: 'Light Theme - Clean and bright interface',
    2: 'Ocean Theme - Calming blue tones inspired by the sea',
    3: 'Amber Theme - Warm and cozy atmosphere with golden hues',
    4: 'Forest Theme - Natural green hues from the wilderness',
    5: 'Sunset Theme - Warm gradients of dusk and twilight',
    6: 'Neon Theme - Vibrant cyberpunk-inspired design'
  };

  function getTimeInTimezone(timezone) {
    try {
      const now = new Date();
      const timeOptions = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };

      const dateOptions = {
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      const formatter = new Intl.DateTimeFormat('en-US', timeOptions);
      const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);

      return {
        time: formatter.format(now),
        date: dateFormatter.format(now),
        timezone: timezone,
        success: true,
      };
    } catch (error) {
      console.error('Error formatting time:', error);
      return { success: false };
    }
  }

  function updateTime() {
    try {
      const timeData = getTimeInTimezone(selectedTimezone);

      if (timeData.success) {
        timeDisplay.textContent = timeData.time;
        dateDisplay.textContent = timeData.date;
        timezoneDisplay.textContent = timeData.timezone;
      } else {
        throw new Error('Invalid timezone');
      }
    } catch (error) {
      timeDisplay.textContent = '--:--:--';
      dateDisplay.textContent = '--';
      timezoneDisplay.textContent = 'Invalid timezone';
    }
  }

  function showLoading() {
    loadingIndicator.classList.add('active');
    setTimeout(() => {
      loadingIndicator.classList.remove('active');
    }, 500);
  }

  function selectSuggestion(index) {
    const suggestions = suggestionsContainer.children;
    if (index >= suggestions.length) index = 0;
    if (index < 0) index = suggestions.length - 1;

    // Remove previous selection
    const previousSelected =
      suggestionsContainer.querySelector('.selected');
    if (previousSelected) {
      previousSelected.classList.remove('selected');
    }

    // Add new selection
    if (suggestions[index]) {
      suggestions[index].classList.add('selected');
      selectedIndex = index;
    }
  }

  function handleKeyNavigation(e) {
    const suggestions = suggestionsContainer.children;
    if (suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        selectSuggestion(selectedIndex + 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        selectSuggestion(selectedIndex - 1);
        break;
      case 'Enter':
        e.preventDefault();
        const selectedSuggestion =
          suggestionsContainer.querySelector('.selected');
        if (selectedSuggestion) {
          selectedSuggestion.click();
        }
        break;
      case 'Escape':
        suggestionsContainer.style.display = 'none';
        selectedIndex = -1;
        break;
    }
  }

  function showSuggestions(searchTerm) {
    const filteredCountries = countries.filter(
      (country) => 
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedTimezones.has(country.timezone)
    );

    suggestionsContainer.innerHTML = '';
    selectedIndex = -1;

    if (searchTerm && filteredCountries.length > 0) {
      filteredCountries.forEach((country) => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.textContent = country.name;
        div.addEventListener('click', () => {
          addTimezone(country);
          countrySearch.value = '';
          suggestionsContainer.style.display = 'none';
          selectedIndex = -1;
        });
        suggestionsContainer.appendChild(div);
      });
      suggestionsContainer.style.display = 'block';
    } else {
      suggestionsContainer.style.display = 'none';
    }
  }

  function addTimezone(country) {
    if (selectedTimezones.has(country.timezone)) return;
    
    selectedTimezones.add(country.timezone);
    const card = createTimezoneCard(country);
    document.getElementById('selectedTimezones').appendChild(card);
    updateAllTimes();
  }

  function createTimezoneCard(country) {
    const card = document.createElement('div');
    card.className = 'timezone-card';
    card.innerHTML = `
      <button class="remove-btn" onclick="removeTimezone('${country.timezone}')">×</button>
      <div class="country-name">${country.name}</div>
      <div class="time" data-timezone="${country.timezone}">--:--:--</div>
      <div class="date" data-timezone="${country.timezone}">--</div>
      <div class="timezone">${country.timezone}</div>
    `;
    return card;
  }

  function removeTimezone(timezone) {
    selectedTimezones.delete(timezone);
    updateTimezoneGrid();
  }

  function updateTimezoneGrid() {
    const grid = document.getElementById('selectedTimezones');
    grid.innerHTML = '';
    
    selectedTimezones.forEach(timezone => {
      const country = countries.find(c => c.timezone === timezone);
      if (country) {
        const card = createTimezoneCard(country);
        grid.appendChild(card);
      }
    });
    updateAllTimes();
  }

  function updateAllTimes() {
    selectedTimezones.forEach(timezone => {
      const timeData = getTimeInTimezone(timezone);
      if (timeData.success) {
        const timeElement = document.querySelector(`.time[data-timezone="${timezone}"]`);
        const dateElement = document.querySelector(`.date[data-timezone="${timezone}"]`);
        if (timeElement && dateElement) {
          timeElement.textContent = timeData.time;
          dateElement.textContent = timeData.date;
        }
      }
    });
  }

  countrySearch.addEventListener('input', (e) => {
    showSuggestions(e.target.value);
  });

  countrySearch.addEventListener('keydown', handleKeyNavigation);

  document.addEventListener('click', (e) => {
    if (
      !suggestionsContainer.contains(e.target) &&
      e.target !== countrySearch
    ) {
      suggestionsContainer.style.display = 'none';
    }
  });

  // Theme toggle functionality
  function updateThemeDescription() {
    const themeDesc = document.getElementById('themeDescription');
    themeDesc.textContent = themeDescriptions[currentThemeIndex] || '';
  }

  function setTheme(themeName) {
    // Remove all theme classes
    Object.values(themeMap).forEach(theme => {
      if (theme) document.body.classList.remove(theme);
    });
    
    // Apply new theme
    const themeClass = themeMap[themeName];
    if (themeClass) {
      document.body.classList.add(themeClass);
    }
    
    // Update active button
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.theme === themeName) {
        btn.classList.add('active');
      }
    });
    
    // Save theme preference
    localStorage.setItem('theme', themeName);
  }

  function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }

  // Initialize theme buttons
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const themeName = btn.dataset.theme;
      setTheme(themeName);
    });
  });

  // Load saved theme
  loadTheme();

  // Initial time update
  updateTime();
  clearInterval(updateInterval);
  updateInterval = setInterval(updateAllTimes, 1000);