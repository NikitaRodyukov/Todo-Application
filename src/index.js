import App from "./components/app/app";
import { createRoot } from 'react-dom/client'
import './index.css'

const root = createRoot(document.querySelector('.todoapp'))

root.render(<App />)