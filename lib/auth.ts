// Authentification simple pour l'admin
export function isAuthenticated(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin0000@';
  return password === adminPassword;
}

export function requireAuth() {
  // Vérifier si l'utilisateur est connecté
  if (typeof window !== 'undefined') {
    const isLoggedIn = localStorage.getItem('admin-auth') === 'true';
    if (!isLoggedIn) {
      window.location.href = '/admin';
      return false;
    }
    return true;
  }
  return false;
}