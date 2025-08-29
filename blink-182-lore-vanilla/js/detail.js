

// manual URL parsing repeated
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        type: params.get('type'),
        id: parseInt(params.get('id'))
    };
}

//global variables
let itemData = {};
let relatedData = [];
let currentType = '';
let currentId = null;

//manual DOM selection
const loadingDiv = document.getElementById('loading');
const contentDiv = document.getElementById('content');
const errorDiv = document.getElementById('error');
const breadcrumbText = document.getElementById('breadcrumb-text');

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    const params = getUrlParams();
    currentType = params.type;
    currentId = params.id;
    
    if (!currentId) {
        showError('Item ID is required');
        return;
    }
    
    await loadDetailData();
});

// data loading function
async function loadDetailData() {
    showLoading();
    
    try {
        switch (currentType) {
            case 'band':
                itemData = await api.getBand(currentId);
                relatedData = await api.getAlbums(currentId);
                updateBreadcrumb(`${itemData.name} - Details`);
                renderBandDetail();
                break;
                
            case 'album':
                itemData = await api.getAlbum(currentId);
                relatedData = await api.getSongs(currentId);
                updateBreadcrumb(`${itemData.title} - Details`);
                renderAlbumDetail();
                break;
                
            case 'song':
                itemData = { id: currentId, title: 'Song Details', trackNumber: 1 };
                updateBreadcrumb('Song Details');
                renderSongDetail();
                break;
                
            default:
                throw new Error('Invalid detail type');
        }
        
        hideLoading();
        
    } catch (error) {
        console.error('Error loading detail:', error);
        showError(`Failed to load ${currentType} details: ${error.message}`);
    }
}

// render functions
function renderBandDetail() {
    let html = `
        <div class="detail-card">
            <h1>${itemData.name}</h1>
            <p><strong>Started:</strong> ${itemData.startYear}</p>
            <p><strong>Members:</strong> ${itemData.members || 'Loading...'}</p>
        </div>
    `;
    
    if (relatedData.length > 0) {
        html += '<h2>Albums</h2><div class="item-list">';
        for (let i = 0; i < relatedData.length; i++) {
            const album = relatedData[i];
            html += `
                <div class="item" onclick="navigateToAlbumDetail(${album.id})">
                    <div class="item-name">${album.title}</div>
                    <div class="item-year">Released: ${album.releaseYear}</div>
                </div>
            `;
        }
        html += '</div>';
    }
    
    contentDiv.innerHTML = html;
}

function renderAlbumDetail() {
    let html = `
        <div class="detail-card">
            <h1>${itemData.title}</h1>
            <p><strong>Released:</strong> ${itemData.releaseYear}</p>
            <p><strong>Band:</strong> ${itemData.bandName || 'Unknown'}</p>
        </div>
    `;
    
    if (relatedData.length > 0) {
        html += '<h2>Songs</h2><div class="item-list">';
        for (let i = 0; i < relatedData.length; i++) {
            const song = relatedData[i];
            html += `
                <div class="item" onclick="navigateToSongDetail(${song.id})">
                    <div class="item-name">${song.title}</div>
                    <div class="item-details">Track ${song.trackNumber} • ${song.durationInSeconds}s</div>
                </div>
            `;
        }
        html += '</div>';
    }
    
    contentDiv.innerHTML = html;
}

function renderSongDetail() {
    let html = `
        <div class="detail-card">
            <h1>${itemData.title}</h1>
            <p><strong>Track Number:</strong> ${itemData.trackNumber}</p>
            <p><strong>Duration:</strong> ${itemData.durationInSeconds || 'Unknown'} seconds</p>
        </div>
    `;
    
    contentDiv.innerHTML = html;
}

// Navigation buttons
function navigateToAlbumDetail(albumId) {
    window.location.href = `detail.html?type=album&id=${albumId}`;
}

function navigateToSongDetail(songId) {
    window.location.href = `detail.html?type=song&id=${songId}`;
}

function goBack() {
    //  back navigation
    if (currentType === 'band') {
        window.location.href = 'list.html?type=bands';
    } else if (currentType === 'album') {
        // We don't know which band this album belongs to!
        // This is a real problem in basic implementations
        window.location.href = 'list.html?type=bands';
    } else if (currentType === 'song') {
        // Same problem - we don't know the album!
        window.location.href = 'list.html?type=bands';
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
