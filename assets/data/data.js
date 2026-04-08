// 當前語言，切換語言時修改此值
const LANG = 'zh';

// 靜態文字翻譯表（供 data-i18n 屬性使用）
// 用法：<span data-i18n="nav.home"></span>
const i18n = {
    zh: {
        // 'nav.home': '首頁',
    },
    en: {
        // 'nav.home': 'Home',
    }
};

// 翻譯函數：找不到 key 時原樣返回 key 作為 fallback
function t(key) {
    return (i18n[LANG] || i18n['zh'])[key] || key;
}

// Handlebars 模板數據（供 main.js 編譯模板使用）
const contentTrans = {
    menu:   { zh: {}, en: {} },
    footer: { zh: {}, en: {} }
};
