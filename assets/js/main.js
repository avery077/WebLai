// main.js 由 pageEnhancer 在所有依賴（jQuery、Handlebars、data.js）載入後執行
// 此時 DOM 已就緒，無需再包 DOMContentLoaded 或 $(document).ready()
main();

function main() {
    fetch('/assets/template/menu.html')
        .then(res => res.text())
        .then(template => {
            const data = contentTrans['menu'][LANG];
            document.getElementById('menu').innerHTML = Handlebars.compile(template)(data);
            applyI18n(document.getElementById('menu'));
        });

    fetch('/assets/template/footer.html')
        .then(res => res.text())
        .then(_template => {
            // footer 載入後的處理邏輯（預留）
        });
}

// 將 data-i18n 屬性的元素翻譯為當前語言
// 用法：<span data-i18n="key.name"></span>
// 不傳 container 則掃描整個 document
function applyI18n(container) {
    (container || document).querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
}
