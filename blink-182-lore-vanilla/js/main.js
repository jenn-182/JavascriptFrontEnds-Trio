
// Global state 
let currentView = 'bands';
let currentBandId = null;
let currentAlbumId = null;
let bandsData = [];
let albumsData = [];
let songsData = [];
let navigationHistory = [];

// DOM elements
let contentDiv = document.getElementById('content');
let loadingDiv = document.getElementById('loading');
let breadcrumbText = document.getElementById('breadcrumb-text');
let backBtn = document.getElementById('back-btn');

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    await loadBands();
});

//  DOM manipulation 
async function loadBands() {
    showLoading();
    
    try {
        bandsData = await api.getBands();
        hideLoading();
        
        // HTML string building
        let html = '<div class="item-list">';
        
        if (bandsData.length === 0) {
            html += '<div class="empty">No bands found</div>';
        } else {
            for (let i = 0; i < bandsData.length; i++) {
                const band = bandsData[i];
                html += `
                    <div class="item" onclick="loadAlbums(${band.id})">
                        <div class="item-name">${band.name}</div>
                        <div class="item-year">Started: ${band.startYear}</div>
                    </div>
                `;
            }
        }
        
        html += '</div>';
        
        // Direct DOM manipulation
        contentDiv.innerHTML = html;
        
        // Manual state updates
        currentView = 'bands';
        updateBreadcrumb('Bands');
        updateBackButton();
        
    } catch (error) {
        hideLoading();
        showError('Failed to load bands');
    }
}

// each view
async function loadAlbums(bandId) {
    showLoading();
    
    try {
        currentBandId = bandId;
        albumsData = await api.getAlbums(bandId);
        const band = bandsData.find(b => b.id === bandId);
        
        hideLoading();
        
        // More manual HTML building...
        let html = '<div class="item-list">';
        
        if (albumsData.length === 0) {
            html += '<div class="empty">No albums found</div>';
        } else {
            for (let i = 0; i < albumsData.length; i++) {
                const album = albumsData[i];
                html += `
                    <div class="item" onclick="loadSongs(${album.id})">
                        <div class="item-name">${album.title}</div>
                        <div class="item-year">Released: ${album.releaseYear}</div>
                    </div>
                `;
            }
        }
        
        html += '</div>';
        
        contentDiv.innerHTML = html;
        
        //navigation tracking
        navigationHistory.push({view: 'bands'});
        currentView = 'albums';
        updateBreadcrumb(`${band.name} - Albums`);
        updateBackButton();
        
    } catch (error) {
        hideLoading();
        showError('Failed to load albums');
    }
}


async function loadSongs(albumId) {
    showLoading();
    
    try {
        currentAlbumId = albumId;
        songsData = await api.getSongs(albumId);
        const album = albumsData.find(a => a.id === albumId);
        
        hideLoading();

        let html = '<div class="item-list">';
        
        if (songsData.length === 0) {
            html += '<div class="empty">No songs found</div>';
        } else {
            for (let i = 0; i < songsData.length; i++) {
                const song = songsData[i];
                html += `
                    <div class="item">
                        <div class="item-name">${song.title}</div>
                        <div class="item-details">Track ${song.trackNumber} • ${song.durationInSeconds}s</div>
                    </div>
                `;
            }
        }
        
        html += '</div>';
        
        contentDiv.innerHTML = html;
        
        navigationHistory.push({view: 'albums', bandId: currentBandId});
        currentView = 'songs';
        updateBreadcrumb(`${album.title} - Songs`);
        updateBackButton();
        
    } catch (error) {
        hideLoading();
        showError('Failed to load songs');
    }
}

//state management
function goBack() {
    if (navigationHistory.length === 0) return;
    
    const previous = navigationHistory.pop();
    
    if (previous.view === 'bands') {
        loadBands();
    } else if (previous.view === 'albums') {
        loadAlbums(previous.bandId);
    }
}

//  UI updates
function updateBreadcrumb(text) {
    breadcrumbText.textContent = text;
}

function updateBackButton() {
    if (navigationHistory.length > 0) {
        backBtn.style.display = 'block';
    } else {
        backBtn.style.display = 'none';
    }
}

function showLoading() {
    loadingDiv.style.display = 'block';
    contentDiv.style.display = 'none';
}

function hideLoading() {
    loadingDiv.style.display = 'none';
    contentDiv.style.display = 'block';
}

function showError(message) {
    contentDiv.innerHTML = `<div class="error">${message}</div>`;
}
