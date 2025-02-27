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

  let selectedTimezone = 'UTC';
  let updateInterval;
  let selectedIndex = -1;

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
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    suggestionsContainer.innerHTML = '';
    selectedIndex = -1;

    if (searchTerm && filteredCountries.length > 0) {
      filteredCountries.forEach((country) => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.textContent = country.name;
        div.addEventListener('click', () => {
          selectedTimezone = country.timezone;
          countrySearch.value = country.name;
          suggestionsContainer.style.display = 'none';
          selectedIndex = -1;

          showLoading();
          clearInterval(updateInterval);
          updateTime();
          updateInterval = setInterval(updateTime, 1000);
        });
        suggestionsContainer.appendChild(div);
      });
      suggestionsContainer.style.display = 'block';
    } else {
      suggestionsContainer.style.display = 'none';
    }
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
  function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('light-theme');
    body.classList.toggle('light-theme');
    themeToggle.textContent = isDark ? '🌙' : '☀️';

    // Save theme preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  // Load saved theme preference
  function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      themeToggle.textContent = '☀️';
    }
  }

  themeToggle.addEventListener('click', toggleTheme);
  loadTheme();

  // Initial time update
  updateTime();
  updateInterval = setInterval(updateTime, 1000);