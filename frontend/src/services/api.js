const API_BASE_URL = 'http://localhost:5000';

export const fetchGames = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/Games`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const register = async (username, email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Registration failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
};
