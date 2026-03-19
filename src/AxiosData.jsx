import { useState, useEffect } from 'react';
import axios from 'axios';

// Hook personnalisé pour axios avec annulation
function useAxiosData(url) {
    const [records, setRecords] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [requestError, setRequestError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchRecords = async () => {
            try {
                const { data } = await axios.get(url, {
                    cancelToken: source.token,
                });
                setRecords(data);
            } catch (err) {
                if (!axios.isCancel(err)) setRequestError(err.message);
            } finally {
                setIsFetching(false);
            }
        };

        fetchRecords();

        // Nettoyage : annule la requête si le composant est démonté
        return () => source.cancel('Composant démonté');
    }, [url]);

    return { records, isFetching, requestError };
}

// Composant d'affichage
function UserDirectory() {
    const API_URL = 'https://jsonplaceholder.typicode.com/users';
    const { records: members, isFetching, requestError } = useAxiosData(API_URL);

    if (isFetching) return <p>Récupération des membres...</p>;
    if (requestError) return <p>Problème rencontré : {requestError}</p>;

    return (
        <section>
            <h2>Répertoire des membres</h2>
            <ul>
                {members.map(({ id, name, email }) => (
                    <li key={id}>
                        <strong>{name}</strong> — {email}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default UserDirectory;