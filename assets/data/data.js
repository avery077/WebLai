// 當前語言，切換語言時修改此值
// 可選值：'zh-Hant'（繁體中文）、'zh-Hans'（簡體中文）、'en'（英文）
const LANG = 'zh-Hant';

// 靜態文字翻譯表（供 data-i18n 屬性使用）
// 用法：<span data-i18n="nav.home"></span>
const i18n = {
    'zh-Hant': {
        // 'nav.home': '首頁',
    },
    'zh-Hans': {
        // 'nav.home': '首页',
    },
    en: {
        // 'nav.home': 'Home',
    }
};

// 翻譯函數：找不到 key 時原樣返回 key 作為 fallback
function t(key) {
    return (i18n[LANG] || i18n['zh-Hant'])[key] || key;
}

// Handlebars 模板數據（供 main.js 編譯模板使用）
const contentTrans = {
    menu:   { 'zh-Hant': {}, 'zh-Hans': {}, en: {} },
    footer: { 'zh-Hant': {}, 'zh-Hans': {}, en: {} }
};
