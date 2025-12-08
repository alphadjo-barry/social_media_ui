import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './hooks/useTheme.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </StrictMode>
)
