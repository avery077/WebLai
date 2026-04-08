(function() {
    // 部署時更新此版本號以強制瀏覽器刷新快取，避免每次頁面載入都重新下載
    const VERSION = '1.0.0';

    loadHeader();

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    function loadHeader() {
        fetch('/assets/template/header.html')
            .then(res => res.text())
            .then(html => {
                const doc = new DOMParser().parseFromString(html, 'text/html');
                const scripts = Array.from(doc.querySelectorAll('script[src]'));

                // 按 data-group 分組：同組平行載入，組間依序執行
                const groups = {};
                scripts.forEach(s => {
                    const g = s.dataset.group || '1';
                    if (!groups[g]) groups[g] = [];
                    groups[g].push(s.src + `?v=${VERSION}`);
                });

                return Object.keys(groups).sort().reduce(async (prev, groupKey) => {
                    await prev;
                    return Promise.all(groups[groupKey].map(loadScript));
                }, Promise.resolve());
            })
            .catch(err => console.error('載入 header 失敗:', err));
    }

    document.addEventListener('DOMContentLoaded', () => {
        const images = document.querySelectorAll('img');

        if (images.length === 0) {
            revealPage();
            return;
        }

        let loadedCount = 0;
        function onSettle() {
            if (++loadedCount === images.length) revealPage();
        }

        images.forEach(img => {
            if (img.complete) {
                onSettle();
            } else {
                img.addEventListener('load', onSettle);
                img.addEventListener('error', onSettle);
            }
        });
    });

    function revealPage() {
        document.body.style.opacity = '1';
    }

})();
