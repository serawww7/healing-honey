let pages = [];

fetch('/index.json')
.then(response => response.json())
.then(data => {

    pages = data;

    const fuse = new Fuse(pages, {
        keys: ['title', 'contents'],
        includeScore: true,
        threshold: 0.4
    });

    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');

    input.addEventListener('input', function() {

        const query = input.value.trim();

        if (query.length < 2) {
            results.innerHTML = '';
            return;
        }

        const matches = fuse.search(query);

        if(matches.length === 0){
            results.innerHTML =
            '<p class="text-zinc-500">Нічого не знайдено.</p>';
            return;
        }

        results.innerHTML = matches.map(item => `

            <div class="border rounded-2xl p-5 mb-4 hover:bg-zinc-50">

                <a href="${item.item.permalink}"
                   class="text-xl font-bold text-blue-600 hover:underline">

                    ${item.item.title}

                </a>

            </div>

        `).join('');
    });

});