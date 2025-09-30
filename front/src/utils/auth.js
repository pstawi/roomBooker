const decodeToken = (token) => {
    try {
        // Le token JWT est divisé en trois parties séparées par des points
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        return null;
    }
};

export const getCurrentUserId = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decoded = decodeToken(token);

    console.log('Decoded token:', decoded);
    return decoded ? decoded.id : null;
};