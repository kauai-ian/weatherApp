import githubImage from './img/github.svg'

export function renderFooter() {
  const footer = document.createElement("footer");
  const footerContent = `<div class="footerContainer">
        <a href="https://github.com/kauai-ian" target="_blank">
          <img
            src="${githubImage}"
            alt="github"
            width="60px"
          />
          <p>Made on Planet Earth by Ian Tierney</p>
        </a>
      </div>`;
  footer.innerHTML = footerContent;
  document.body.appendChild(footer);
}
