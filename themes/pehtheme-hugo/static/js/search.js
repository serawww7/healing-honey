let pages = [];

fetch('/index.json')
.then(response => response.json())
.then(data => {
    pages = data;

    const fuse = new Fuse(pages, {
        keys: ['title', 'contents'],
        threshold: 0.3
    });

    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');

    input.addEventListener('input', function() {

        const query = input.value;

        if(query.length < 2){
            results.innerHTML = '';
            return;
        }

        const matches = fuse.search(query);

        results.innerHTML = matches.map(item => `
            <div class="border rounded-xl p-4 mb-4">
                <a href="${item.item.permalink}"
                   class="text-xl font-bold text-blue-600">
                   ${item.item.title}
                </a>
            </div>
        `).join('');
    });
});