document.addEventListener('DOMContentLoaded', function() {
    // Music player functionality
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    
    // Try to autoplay music (may not work due to browser policies)
    function attemptAutoplay() {
        bgMusic.volume = 0.3;
        const promise = bgMusic.play();
        
        if (promise !== undefined) {
            promise.then(_ => {
                musicToggle.innerHTML = '<i class="fas fa-music"></i> Pause Our Song';
            }).catch(error => {
                musicToggle.innerHTML = '<i class="fas fa-music"></i> Play Our Song';
            });
        }
    }
    
    // Attempt autoplay on user interaction
    document.addEventListener('click', attemptAutoplay, { once: true });
    
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.innerHTML = '<i class="fas fa-music"></i> Pause Our Song';
        } else {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i> Play Our Song';
        }
    });
    
    // Media upload functionality
    const uploadForm = document.getElementById('upload-form');
    const mediaInput = document.getElementById('media-input');
    const uploadLabel = document.querySelector('.upload-label');
    const uploadBtn = document.querySelector('.upload-btn');
    const uploadProgress = document.getElementById('upload-progress');
    const mediaGallery = document.getElementById('media-gallery');
    
    // Sweet messages functionality
    const loveNote = document.getElementById('love-note');
    const addNoteBtn = document.getElementById('add-note-btn');
    const notesList = document.getElementById('notes-list');
    
    // Load saved media and notes from localStorage
    loadMedia();
    loadNotes();
    
    uploadLabel.addEventListener('click', function(e) {
        e.preventDefault();
    });
    
    mediaInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            uploadFiles(this.files);
        }
    });
    
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (mediaInput.files.length > 0) {
            uploadFiles(mediaInput.files);
        }
    });
    
    function uploadFiles(files) {
        uploadProgress.style.display = 'block';
        uploadProgress.firstElementChild.style.width = '0%';
        
        // Simulate upload progress (in a real app, this would be an actual upload to a server)
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 5;
            uploadProgress.firstElementChild.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                setTimeout(() => {
                    uploadProgress.style.display = 'none';
                    processFiles(files);
                    mediaInput.value = '';
                }, 500);
            }
        }, 100);
    }
    
    function processFiles(files) {
        Array.from(files).forEach(file => {
            if (!file.type.match('image.*') && !file.type.match('video.*')) return;
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const mediaItem = createMediaItem(file.type, e.target.result);
                mediaGallery.appendChild(mediaItem);
                
                // Save to localStorage
                saveMediaToLocalStorage(file.type, e.target.result);
            };
            
            if (file.type.match('image.*')) {
                reader.readAsDataURL(file);
            } else if (file.type.match('video.*')) {
                // For videos, we'll just use a placeholder as we can't properly save them to localStorage
                reader.readAsDataURL(file);
            }
        });
    }
    
    function createMediaItem(type, src) {
        const mediaItem = document.createElement('div');
        mediaItem.className = 'media-item';
        
        if (type.match('image.*')) {
            const img = document.createElement('img');
            img.src = src;
            img.alt = 'Memory image';
            mediaItem.appendChild(img);
        } else if (type.match('video.*')) {
            const video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.muted = true;
            mediaItem.appendChild(video);
        }
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mediaItem.remove();
            removeMediaFromLocalStorage(src);
        });
        mediaItem.appendChild(deleteBtn);
        
        return mediaItem;
    }
    
    function saveMediaToLocalStorage(type, data) {
        let media = JSON.parse(localStorage.getItem('loveJourneyMedia')) || [];
        media.push({ type, data });
        localStorage.setItem('loveJourneyMedia', JSON.stringify(media));
    }
    
    function removeMediaFromLocalStorage(data) {
        let media = JSON.parse(localStorage.getItem('loveJourneyMedia')) || [];
        media = media.filter(item => item.data !== data);
        localStorage.setItem('loveJourneyMedia', JSON.stringify(media));
    }
    
    function loadMedia() {
        const media = JSON.parse(localStorage.getItem('loveJourneyMedia')) || [];
        media.forEach(item => {
            const mediaItem = createMediaItem(item.type, item.data);
            mediaGallery.appendChild(mediaItem);
        });
    }
    
    // Sweet messages functionality
    addNoteBtn.addEventListener('click', function() {
        const noteText = loveNote.value.trim();
        if (noteText) {
            addNote(noteText);
            loveNote.value = '';
        }
    });
    
    function addNote(text) {
        const noteItem = document.createElement('div');
        noteItem.className = 'note-item';
        noteItem.innerHTML = `
            <p>${text}</p>
            <button class="delete-note"><i class="fas fa-times"></i></button>
        `;
        
        const deleteBtn = noteItem.querySelector('.delete-note');
        deleteBtn.addEventListener('click', function() {
            noteItem.remove();
            removeNoteFromLocalStorage(text);
        });
        
        notesList.appendChild(noteItem);
        saveNoteToLocalStorage(text);
    }
    
    function saveNoteToLocalStorage(text) {
        let notes = JSON.parse(localStorage.getItem('
