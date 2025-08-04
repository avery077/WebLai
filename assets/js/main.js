if (document.readyState === 'complete' || document.readyState === 'interactive') {
    preload();
} else {
    document.addEventListener('DOMContentLoaded', preload);
}

function preload() {
    if (typeof jQuery === 'undefined') {
        console.log("jQuery 未載入，請檢查路徑或網絡");
        const script = document.createElement('script');
        script.src = '../assets/plugins/jquery.min.js';
        script.onload = () => {
            console.log("jQuery 動態載入成功");
            main();
        };
        script.onerror = () => {
            console.log("jQuery 載入失敗，請檢查路徑或網絡");
        };
        document.head.appendChild(script);
    } else {
        main();
    }

}

function main(){
    $(document).ready(function() {
        $.get('../assets/template/menu.html', function(template) {
            const compiledTemplate = Handlebars.compile(template);
            const data = contentTrans["menu"][LANG];
            $('#menu').html(compiledTemplate(data));
        }).then(function(){

        });
        
        $.get('../assets/template/footer.html', function(template) {

        }).then(function(){

        });
    });

}