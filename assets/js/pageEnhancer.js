(function() {
    const baseUrl = `/`; 
    const version = Date.now();

    const headerElement = document.getElementById('header');
    const originalContent = Array.from(headerElement.children).filter(el => 
        el.tagName !== 'SCRIPT' || el.src !== '../assets/js/pageEnhancer.js' // 排除 pageEnhancer.js 本身
    );

    loadHeader();
    handleImageLoading();

    function loadHeader() {
        fetch(`${baseUrl}assets/template/header.html`)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            const links = doc.querySelectorAll('link');
            links.forEach(link => {
                const newLink = document.createElement('link');
                newLink.href = link.href + `?v=${version}`;
                newLink.rel = link.rel;
                headerElement.appendChild(newLink);
            });

            const scripts = Array.from(doc.querySelectorAll('script'));
            const scriptSrcs = scripts
                .map(script => script.src ? `${script.src}?v=${version}` : null)
                .filter(src => src);

            return scriptSrcs.reduce((promise, src) => {
                return promise.then(() => {
                    return new Promise((resolve, reject) => {
                        const script = document.createElement('script');
                        script.src = src;
                        script.onload = resolve;
                        script.onerror = reject;
                        headerElement.appendChild(script);
                    });
                });
            }, Promise.resolve()).then(() => {
                const inlineScripts = scripts.filter(script => !script.src);
                inlineScripts.forEach(script => {
                    const newScript = document.createElement('script');
                    newScript.textContent = script.textContent;
                    headerElement.appendChild(newScript);
                });
            });
        })
        .catch(error => console.error('載入 header 失敗:', error));
    }

    function handleImageLoading() {
        document.addEventListener('DOMContentLoaded', () => {
            const images = document.querySelectorAll('img');
            if (images.length === 0) {
                document.body.style.display = 'block';
            } else {
                let loadedCount = 0;
                images.forEach(img => {
                    if (img.complete) {
                        loadedCount++;
                        if (loadedCount === images.length) {
                            document.body.style.transition = 'opacity 0.5s';
                            document.body.style.opacity = '0';
                            document.body.style.display = 'block';
                            setTimeout(() => document.body.style.opacity = '1', 10);
                        }
                    } else {
                        img.addEventListener('load', () => {
                            loadedCount++;
                            if (loadedCount === images.length) {
                                document.body.style.transition = 'opacity 0.5s';
                                document.body.style.opacity = '0';
                                document.body.style.display = 'block';
                                setTimeout(() => document.body.style.opacity = '1', 10);
                            }
                        });
                        img.addEventListener('error', () => {
                            loadedCount++;
                            if (loadedCount === images.length) {
                                document.body.style.transition = 'opacity 0.5s';
                                document.body.style.opacity = '0';
                                document.body.style.display = 'block';
                                setTimeout(() => document.body.style.opacity = '1', 10);
                            }
                        });
                    }
                });
            }
        });
    }
	
	document.addEventListener('DOMContentLoaded', () => {
		const images = document.querySelectorAll('img');
		if (images.length === 0) {
			document.body.style.display = 'block';
		} else {
			let loadedCount = 0;
			images.forEach(img => {
				if (img.complete) {
					loadedCount++;
					if (loadedCount === images.length) {
						document.body.style.transition = 'opacity 0.5s';
						document.body.style.opacity = '0';
						document.body.style.display = 'block';
						setTimeout(() => document.body.style.opacity = '1', 10);
					}
				} else {
					img.addEventListener('load', () => {
						loadedCount++;
						if (loadedCount === images.length) {
							document.body.style.transition = 'opacity 0.5s';
							document.body.style.opacity = '0';
							document.body.style.display = 'block';
							setTimeout(() => document.body.style.opacity = '1', 10);
						}
					});
					img.addEventListener('error', () => {
						loadedCount++;
						if (loadedCount === images.length) {
							document.body.style.transition = 'opacity 0.5s';
							document.body.style.opacity = '0';
							document.body.style.display = 'block';
							setTimeout(() => document.body.style.opacity = '1', 10);
						}
					});
				}
			});
		}
	});

})();