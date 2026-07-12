// Smooth-scroll to a home-page section, offset for the fixed navbar.
export const scrollToSection = (sectionId) => {
  const el = sectionId === 'home' ? document.body : document.getElementById(sectionId);
  if (!el) return;

  const top = sectionId === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - 90;
  window.scrollTo({ top, behavior: 'smooth' });
};
