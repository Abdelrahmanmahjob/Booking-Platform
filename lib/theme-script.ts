export const themeScript = `
  (function() {
    const theme = localStorage.getItem('booking-platform-theme') || 'system';
    const isDark = theme === 'dark' || 
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    document.documentElement.classList.toggle('dark', isDark);
  })();
`;
