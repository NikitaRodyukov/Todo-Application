import { createRoot } from 'react-dom/client'

import App from './components/app/app'
import './index.css'

const root = createRoot(document.querySelector('.todoapp'))

root.render(<App />)
