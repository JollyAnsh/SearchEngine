document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const searchHistory = document.getElementById('searchHistory');
    const clearHistoryButton = document.getElementById('clearHistoryButton');

    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];

    function updateHistoryDisplay() {
        searchHistory.innerHTML = '';
        history.forEach((term, index) => {
            const li = document.createElement('li');
            li.textContent = term;
            li.style.animationDelay = `${index * 0.1}s`;
            li.classList.add('fade-in');
            li.addEventListener('click', () => {
                searchInput.value = term;
                performSearch(term);
            });
            searchHistory.appendChild(li);
        });
    }

    function addToHistory(term) {
        const index = history.indexOf(term);
        if (index > -1) {
            history.splice(index, 1);
        }
        history.unshift(term);
        if (history.length > 5) {
            history.pop();
        }
        localStorage.setItem('searchHistory', JSON.stringify(history));
        updateHistoryDisplay();
    }

    function performSearch(term) {
        searchResults.innerHTML = '';
        searchResults.classList.add('fade-in');
        
        const mockResults = [
            { title: 'Result 1 for ' + term, description: 'This is a description for the first search result.' },
            { title: 'Another Result for ' + term, description: 'Here\'s another interesting find related to your search.' },
            { title: term + ' Information', description: 'Discover more about ' + term + ' with this comprehensive guide.' }
        ];

        mockResults.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('search-result', 'fade-in');
            resultElement.innerHTML = `
                <h3>${result.title}</h3>
                <p>${result.description}</p>
            `;
            searchResults.appendChild(resultElement);
        });
    }

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            addToHistory(searchTerm);
            performSearch(searchTerm);
            
            searchButton.textContent = 'Searching...';
            searchButton.disabled = true;
            setTimeout(() => {
                searchButton.textContent = 'Search';
                searchButton.disabled = false;
            }, 1000);
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    clearHistoryButton.addEventListener('click', () => {
        history = [];
        localStorage.removeItem('searchHistory');
        updateHistoryDisplay();
        
        clearHistoryButton.textContent = 'Cleared!';
        setTimeout(() => {
            clearHistoryButton.textContent = 'Clear History';
        }, 1000);
    });

    updateHistoryDisplay();
});