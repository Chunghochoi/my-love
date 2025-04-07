document.addEventListener('DOMContentLoaded', function() {
    // ... (phần nhạc và các tính năng khác giữ nguyên)
    
    // Phần upload ảnh đã sửa
    const uploadForm = document.getElementById('upload-form');
    const mediaInput = document.getElementById('media-input');
    const uploadProgress = document.getElementById('upload-progress');
    const mediaGallery = document.getElementById('media-gallery');
    
    // Load ảnh từ localStorage
    loadMedia();
    
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
        const progressBar = uploadProgress.querySelector('div');
        progressBar.style.width = '0%';
        
        let uploadedCount = 0;
        const totalFiles = files.length;
        
        Array.from(files).forEach(file => {
            if (!file.type.match('image.*') && !file.type.match('video.*')) {
                uploadedCount++;
                updateProgress();
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const mediaItem = createMediaItem(file.type, e.target.result, file.name);
                mediaGallery.insertBefore(mediaItem, mediaGallery.firstChild);
                
                saveMediaToLocalStorage(file.type, e.target.result, file.name);
                
                uploadedCount++;
                updateProgress();
            };
            
            if (file.type.match('image.*')) {
                reader.readAsDataURL(file);
            } else if (file.type.match('video.*')) {
                reader.readAsDataURL(file);
            }
        });
        
        function updateProgress() {
            const progress = Math.round((uploadedCount / totalFiles) * 100);
            progressBar.style.width = `${progress}%`;
            
            if (uploadedCount === totalFiles) {
                setTimeout(() => {
                    uploadProgress.style.display = 'none';
                    mediaInput.value = '';
                }, 500);
            }
        }
    }
    
    function createMediaItem(type, data, filename) {
        const mediaItem = document.createElement('div');
        mediaItem.className = 'media-item';
        mediaItem.dataset.filename = filename;
        
        if (type.match('image.*')) {
            const img = document.createElement('img');
            img.src = data;
            img.alt = 'Kỷ niệm đáng nhớ';
            mediaItem.appendChild(img);
        } else if (type.match('video.*')) {
            const video = document.createElement('video');
            video.src = data;
            video.controls = true;
            video.muted = true;
            mediaItem.appendChild(video);
        }
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (confirm('Bạn có chắc muốn xóa kỷ niệm này?')) {
                mediaItem.remove();
                removeMediaFromLocalStorage(filename);
            }
        });
        mediaItem.appendChild(deleteBtn);
        
        return mediaItem;
    }
    
    function saveMediaToLocalStorage(type, data, filename) {
        let media = JSON.parse(localStorage.getItem('loveJourneyMedia')) || [];
        // Giới hạn chỉ lưu 50 ảnh gần nhất
        if (media.length >= 50) {
            media.shift();
        }
        media.push({ type, data, filename });
        localStorage.setItem('loveJourneyMedia', JSON.stringify(media));
    }
    
    function removeMediaFromLocalStorage(filename) {
        let media = JSON.parse(localStorage.getItem('loveJourneyMedia')) || [];
        media = media.filter(item => item.filename !== filename);
        localStorage.setItem('loveJourneyMedia', JSON.stringify(media));
    }
    
    function loadMedia() {
        let media = JSON.parse(localStorage.getItem('loveJourneyMedia')) || [];
        // Sắp xếp theo thứ tự mới nhất lên đầu
        media.reverse().forEach(item => {
            const mediaItem = createMediaItem(item.type, item.data, item.filename);
            mediaGallery.appendChild(mediaItem);
        });
    }
});
