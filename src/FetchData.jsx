import { useState, useEffect } from 'react';

// Hook personnalisé pour la récupération de données
function useRemoteData(url) {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const loadData = async () => {
            try {
                const res = await fetch(url, { signal: controller.signal });

                if (!res.ok) throw new Error(`Échec de la requête (${res.status})`);

                const result = await res.json();
                setData(result);
            } catch (err) {
                if (err.name !== 'AbortError') setFetchError(err.message);
            } finally {
                setIsPending(false);
            }
        };

        loadData();

        // Nettoyage : annule la requête si le composant est démonté
        return () => controller.abort();
    }, [url]);

    return { data, isPending, fetchError };
}

// Composant d'affichage
function ArticleList() {
    const API_URL = 'https://jsonplaceholder.typicode.com/posts';
    const { data: articles, isPending, fetchError } = useRemoteData(API_URL);

    if (isPending) return <p>Récupération des données...</p>;
    if (fetchError) return <p>Une erreur est survenue : {fetchError}</p>;

    return (
        <section>
            <h2>Liste des publications</h2>
            <ul>
                {articles.slice(0, 5).map(({ id, title }) => (
                    <li key={id}>{title}</li>
                ))}
            </ul>
        </section>
    );
}

export default ArticleList;