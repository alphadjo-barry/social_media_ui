export default function Sidebar() {
    return (
        <div className="d-flex">
            {/* Sidebar */}
            <aside className="sidebar d-flex flex-column p-3">
                <ul className="nav nav-pills flex-column gap-1">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">
                            Accueil
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Profil
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Messages
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Amis
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-danger" href="#">
                            Déconnexion
                        </a>
                    </li>
                </ul>
            </aside>

            {/* Contenu principal */}
            <main className="flex-grow-1 p-4">
                {/* Ton contenu ici */}
            </main>
        </div>
    );
}
