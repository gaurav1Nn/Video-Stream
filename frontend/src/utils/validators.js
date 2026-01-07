export const validateVideoFile = (file) => {
    const allowedTypes = ['video/mp4', 'video/quicktime', 'video/webm'];
    const allowedExtensions = ['.mp4', '.mov', '.webm'];
    const maxSize = 100 * 1024 * 1024; // 100MB

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();

    if (!allowedTypes.includes(file.type) || !allowedExtensions.includes(fileExtension)) {
        return {
            valid: false,
            error: 'Invalid file type. Only MP4, MOV, and WebM videos are allowed.',
        };
    }

    // Check file size
    if (file.size > maxSize) {
        return {
            valid: false,
            error: 'File size exceeds 100MB limit.',
        };
    }

    return { valid: true };
};

export const validateTitle = (title) => {
    if (!title || title.trim().length === 0) {
        return {
            valid: false,
            error: 'Title is required.',
        };
    }

    if (title.length < 3) {
        return {
            valid: false,
            error: 'Title must be at least 3 characters.',
        };
    }

    if (title.length > 100) {
        return {
            valid: false,
            error: 'Title must not exceed 100 characters.',
        };
    }

    return { valid: true };
};

export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};
