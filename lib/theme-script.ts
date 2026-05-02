export const themeScript = `
  (function() {
    try {
      var storageKey = 'booking-platform-theme';
      var savedTheme = localStorage.getItem(storageKey);
      var theme;
      if (savedTheme) {
        theme = savedTheme;
      } else {
        theme = 'dark';
      }
      var root = document.documentElement;
      
      if (theme === 'system') {
        var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    } catch (e) {}
  })();
`;
