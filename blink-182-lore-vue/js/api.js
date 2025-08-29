// API configuration and functions
const API_BASE = 'http://localhost:8081/api';

// API utility functions
const api = {
    // Fetch all bands
    async getBands() {
        try {
            const response = await fetch(`${API_BASE}/bands`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching bands:', error);
            return [];
        }
    },

    // Fetch albums for a specific band
    async getAlbums(bandId) {
        try {
            const response = await fetch(`${API_BASE}/bands/${bandId}/albums`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching albums:', error);
            return [];
        }
    },

    // Fetch songs for a specific album
    async getSongs(albumId) {
        try {
            const response = await fetch(`${API_BASE}/albums/${albumId}/songs`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching songs:', error);
            return [];
        }
    },

    // Fetch album details
    async getAlbum(albumId) {
        try {
            const response = await fetch(`${API_BASE}/albums/${albumId}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching album:', error);
            return null;
        }
    },

    // Fetch band details
    async getBand(bandId) {
        try {
            const response = await fetch(`${API_BASE}/bands/${bandId}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching band:', error);
            return null;
        }
    }
};