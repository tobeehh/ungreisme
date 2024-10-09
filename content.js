// Funktion, um alle Artikel auf der Seite zu überprüfen
function checkArticles() {
    // Finde alle Listenelemente, die Artikelvorschauen enthalten
    const articles = document.querySelectorAll('li[data-article-id]');

    articles.forEach(article => {
        // Prüfe, ob der Artikel von Friedhelm Greis ist
        const articleLink = article.querySelector('a[href*="https://www.golem.de/news"]');

        if (articleLink) {
            // Lade den Artikel im Hintergrund
            fetch(articleLink.href)
                .then(response => response.text())
                .then(html => {
                    // Erstelle ein temporäres DOM-Element zum Parsen des HTML-Inhalts
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');

                    // Suche nach dem Link zur Autorenseite von Friedhelm Greis
                    const authorLink = doc.querySelector('a[href="https://www.golem.de/specials/autor-friedhelm-greis/"]');

                    if (authorLink) {
                        // Blende den Artikel aus, wenn der Autor Friedhelm Greis ist
                        article.style.display = 'none';
                    }
                })
                .catch(error => {
                    console.error('Fehler beim Laden des Artikels:', error);
                });
        }
    });
}

// Starte die Überprüfung, sobald die Seite geladen ist
window.addEventListener('load', checkArticles);
