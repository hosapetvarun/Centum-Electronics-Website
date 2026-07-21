function openDetailModal(productId) {
    const p = productsData.find(pr => pr.id === productId);
    if (!p) return;
    document.getElementById('modalImage').src = p.image || 'screws/screw1.webp';
    document.getElementById('modalImage').alt = p.name;
    document.getElementById('modal-title').textContent = p.name;
    document.getElementById('modalSku').textContent = p.sku;
    document.getElementById('modalMaterial').textContent = p.material || '—';
    document.getElementById('modalDimensions').textContent = p.dimensions || '—';
    document.getElementById('modalFinish').textContent = p.finish || '—';
    document.getElementById('modalCategory').textContent = p.category.charAt(0).toUpperCase() + p.category.slice(1);
    document.getElementById('modalApplications').textContent = p.applications || '—';
    document.getElementById('modalStock').textContent = 'In Stock';
    document.getElementById('modalStock').className = 'modal-stock';
    document.getElementById('detailModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
    document.getElementById('detailModal').classList.remove('active');
    document.body.style.overflow = '';
}

function openImagePreview(productId) {
    const p = productsData.find(pr => pr.id === productId);
    if (!p) return;
    previewProducts = productsData.filter(pr => pr.category === p.category);
    if (previewProducts.length === 0) previewProducts = [p];
    previewIndex = previewProducts.findIndex(pr => pr.id === p.id);
    if (previewIndex === -1) previewIndex = 0;
    updatePreviewImage();
    document.getElementById('imagePreviewModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updatePreviewImage() {
    const p = previewProducts[previewIndex];
    if (!p) return;
    document.getElementById('previewImage').src = p.image || 'screws/screw1.webp';
    document.getElementById('previewImage').alt = p.name;
}

function closeImagePreview() {
    document.getElementById('imagePreviewModal').classList.remove('active');
    document.body.style.overflow = '';
}

function previewPrev() {
    if (previewProducts.length === 0) return;
    previewIndex = (previewIndex - 1 + previewProducts.length) % previewProducts.length;
    updatePreviewImage();
}

function previewNext() {
    if (previewProducts.length === 0) return;
    previewIndex = (previewIndex + 1) % previewProducts.length;
    updatePreviewImage();
}

// Modal close listeners
document.getElementById('modalClose').addEventListener('click', closeDetailModal);
document.getElementById('previewClose').addEventListener('click', closeImagePreview);
document.getElementById('previewPrev').addEventListener('click', previewPrev);
document.getElementById('previewNext').addEventListener('click', previewNext);

document.getElementById('detailModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('detailModal')) closeDetailModal();
});
document.getElementById('imagePreviewModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('imagePreviewModal')) closeImagePreview();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (document.getElementById('detailModal').classList.contains('active')) closeDetailModal();
        if (document.getElementById('imagePreviewModal').classList.contains('active')) closeImagePreview();
    }
    if (document.getElementById('imagePreviewModal').classList.contains('active')) {
        if (e.key === 'ArrowLeft') previewPrev();
        if (e.key === 'ArrowRight') previewNext();
    }
});

document.getElementById('modalCopySku').addEventListener('click', () => {
    const sku = document.getElementById('modalSku').textContent;
    if (sku && sku !== '-') {
        navigator.clipboard.writeText(sku).then(() => {
            showToast('SKU copied to clipboard!');
        }).catch(() => {
            const textArea = document.createElement('textarea');
            textArea.value = sku;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast('SKU copied to clipboard!');
        });
    }
});