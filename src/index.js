// runs the app
import { renderFactory } from "./render";
import './style.css';

const weatherApp = renderFactory();
weatherApp.renderPage();
weatherApp.renderCredits();
