# 📡 fetch() vs axios — Charger des données en React

> Guide pratique pour comprendre les requêtes HTTP, afficher des listes, et gérer les états de chargement et d'erreur.

---


## 1. fetch() vs axios — Différences clés

| Critère | `fetch()` | `axios` |
|---|---|---|
| **Intégré au navigateur** | ✅ Oui (natif) | ❌ Non (librairie externe) |
| **Gestion des erreurs HTTP** | ❌ Manuel (vérifie `res.ok`) | ✅ Automatique (rejette si 4xx/5xx) |
| **Parsing JSON** | Manuel (`.json()`) | Automatique (`res.data`) |
| **Timeout** | ❌ Non natif | ✅ Option `timeout` |
| **Annulation de requête** | `AbortController` | `CancelToken` ou `AbortController` |
| **Intercepteurs** | ❌ Non | ✅ Oui (`interceptors`) |
| **Support Node.js** | Récent (Node 18+) | ✅ Oui (universel) |

---

## Structure du code

<img width="315" height="525" alt="Screenshot 2026-03-19 at 04 25 12" src="https://github.com/user-attachments/assets/a0e3a826-36e7-4f12-8f12-ffaaaaa1c97a" />

---

## Photo d'affichage

<img width="1129" height="669" alt="Screenshot 2026-03-19 at 04 24 57" src="https://github.com/user-attachments/assets/610a4dd6-2c6e-4348-a914-733b4654e3aa" />


---

 
