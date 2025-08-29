// list.js
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        type: params.get('type'),
        id: params.get('id')
    };
}

// Simulated API calls
let currentData = [];
let currentType = '';
let currentId = null;
let loading = true;


const loadingDiv = document.getElementById('loading');
const contentDiv = document.getElementById('content');
const errorDiv = document.getElementById('error');
const breadcrumbText = document.getElementById('breadcrumb-text');

// Initialize when page loads
document.addEventListener('DOMContentLoaded', async () => {
    const params = getUrlParams();
    currentType = params.type;
    currentId = params.id;
    
    await loadListData();
});

//data loading and rendering
async function loadListData() {
    showLoading();
    
    try {
        //  switch statement for each type
        switch (currentType) {
            case 'bands':
                currentData = await api.getBands();
                updateBreadcrumb('All Bands');
                renderBandsList();
                break;
                
            case 'albums':
                if (!currentId) throw new Error('Band ID required');
                currentData = await api.getAlbums(currentId);
                const band = await api.getBand(currentId);
                updateBreadcrumb(`${band.name} - Albums`);
                renderAlbumsList();
                break;
                
            case 'songs':
                if (!currentId) throw new Error('Album ID required');
                currentData = await api.getSongs(currentId);
                const album = await api.getAlbum(currentId);
                updateBreadcrumb(`${album.title} - Songs`);
                renderSongsList();
                break;
                
            default:
                throw new Error('Invalid list type');
        }
        
        hideLoading();
        
    } catch (error) {
        console.error('Error loading list:', error);
        showError(`Failed to load ${currentType}: ${error.message}`);
    }
}


function renderBandsList() {
    let html = '<div class="item-list">';
    
    if (currentData.length === 0) {
        html += '<div class="empty">No bands found</div>';
    } else {
        for (let i = 0; i < currentData.length; i++) {
            const band = currentData[i];
            html += `
                <div class="item" onclick="navigateToAlbums(${band.id})">
                    <div class="item-name">${band.name}</div>
                    <div class="item-year">Started: ${band.startYear}</div>
                    <div class="item-details">Click to view albums</div>
                </div>
            `;
        }
    }
    
    html += '</div>';
    contentDiv.innerHTML = html;
}

function renderAlbumsList() {
    let html = '<div class="item-list">';
    
    if (currentData.length === 0) {
        html += '<div class="empty">No albums found</div>';
    } else {
        for (let i = 0; i < currentData.length; i++) {
            const album = currentData[i];
            html += `
                <div class="item" onclick="navigateToSongs(${album.id})">
                    <div class="item-name">${album.title}</div>
                    <div class="item-year">Released: ${album.releaseYear}</div>
                    <div class="item-details">Click to view songs</div>
                </div>
            `;
        }
    }
    
    html += '</div>';
    contentDiv.innerHTML = html;
}

function renderSongsList() {
    let html = '<div class="item-list">';
    
    if (currentData.length === 0) {
        html += '<div class="empty">No songs found</div>';
    } else {
        for (let i = 0; i < currentData.length; i++) {
            const song = currentData[i];
            html += `
                <div class="item" onclick="navigateToSongDetail(${song.id})">
                    <div class="item-name">${song.title}</div>
                    <div class="item-details">Track ${song.trackNumber} • ${song.durationInSeconds}s</div>
                </div>
            `;
        }
    }
    
    html += '</div>';
    contentDiv.innerHTML = html;
}

// Navigation functions
function navigateToAlbums(bandId) {
    window.location.href = `list.html?type=albums&id=${bandId}`;
}

function navigateToSongs(albumId) {
    window.location.href = `list.html?type=songs&id=${albumId}`;
}

function navigateToSongDetail(songId) {
    window.location.href = `detail.html?type=song&id=${songId}`;
}

// Navigation buttons
function goBack() {
    if (currentType === 'albums') {
        window.location.href = 'list.html?type=bands';
    } else if (currentType === 'songs') {
        window.location.href = `list.html?type=albums&id=${currentId}`;
    } else {
        window.location.href = 'index.html';
    }
}

function goHome() {
    window.location.href = 'index.html';
}

// UI state management
function showLoading() {
    loadingDiv.style.display = 'block';
    contentDiv.style.display = 'none';
    errorDiv.style.display = 'none';
}

function hideLoading() {
    loadingDiv.style.display = 'none';
    contentDiv.style.display = 'block';
}

function showError(message) {
    loadingDiv.style.display = 'none';
    contentDiv.style.display = 'none';
    errorDiv.style.display = 'block';
    errorDiv.textContent = message;
}

function updateBreadcrumb(text) {
    breadcrumbText.textContent = text;
}
