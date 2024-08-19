export async function getArticles() {
    try {
        const response = await fetch('https://hn.algolia.com/api/v1/search_by_date?query=mobile');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.hits;
    } catch (error) {
        throw new Error(`Error fetching articles: ${error}`);
    }
}
