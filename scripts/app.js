class QuantumUI {
    static currentPage = 1;

    static nextPage() {
        if (this.validateCurrentPage()) {
            this.switchPage(this.currentPage + 1);
        }
    }

    static prevPage() {
        this.switchPage(this.currentPage - 1);
    }

    static switchPage(targetPage) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
            page.hidden = true;
        });

        this.currentPage = targetPage;
        const newPage = document.querySelector(`[data-page="${targetPage}"]`);
        newPage.hidden = false;
        newPage.classList.add('active');

        document.getElementById('backBtn').hidden = targetPage === 1;
        
        if (targetPage === 2 && !QuantumMap.map) {
            QuantumMap.init();
        }
    }

    static validateCurrentPage() {
        if (this.currentPage === 1) {
            const phone = document.getElementById('ownerPhone').value;
            if (!/^09\d{9}$/.test(phone)) {
                document.getElementById('phoneError').textContent = 'شماره موبایل معتبر نیست';
                return false;
            }
        }
        return true;
    }
}

class QuantumMap {
    static map = null;
    static marker = null;

    static init() {
        this.map = L.map('quantumMap').setView([35.6892, 51.3890], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
        this.update();
    }

    static update() {
        if (!this.map) return;

        const main = parseInt(document.getElementById('mainPlate').value) || 0;
        const sub = parseInt(document.getElementById('subPlate').value) || 0;

        const lat = 35.6892 + (main * 0.0001);
        const lng = 51.3890 + (sub * 0.0001);

        if (this.marker) this.map.removeLayer(this.marker);
        
        this.marker = L.marker([lat, lng])
            .addTo(this.map)
            .bindPopup(`پلاک کوانتومی: ${main}-${sub}`)
            .openPopup();

        this.map.setView([lat, lng], 18);
    }
}

class QuantumPayment {
    static simulate() {
        document.getElementById('paymentResult').innerHTML = `
            <div class="loading-spinner"></div>
            <p class="loading-text">در حال پردازش تراکنش کوانتومی...</p>
        `;

        setTimeout(() => {
            document.getElementById('paymentResult').innerHTML = `
                <div class="success-message">
                    ✅ پرداخت موفقیت‌آمیز بود!
                    <a href="#" onclick="QuantumPDF.generate()" class="download-link">دانلود سند PDF</a>
                </div>
            `;
        }, 2000);
    }
}

class QuantumPDF {
    static generate() {
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,...'; // شبیه‌سازی PDF
        link.download = 'سند-ملک-کوانتومی.pdf';
        link.click();
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    QuantumUI.switchPage(1);
});
