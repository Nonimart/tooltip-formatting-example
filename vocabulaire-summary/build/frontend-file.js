/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/frontend-file.js ***!
  \******************************/
window.addEventListener("DOMContentLoaded", event => {
  // GETTING ELEMENTS FROM THE DOM
  const vocabulaireSummary = document.querySelector(".homegrade-blocks-vocabulaire-summary");
  const wordsDetails = vocabulaireSummary.querySelectorAll("details");
  function openAccordion(wordDetail) {
    let contentDefinitionWrapper = wordDetail.querySelector(".homegrade-blocks-vocabulaire-summary__content-wrapper");
    let contentDefinitionParagraph = wordDetail.querySelector(".homegrade-blocks-vocabulaire-summary__content");
    wordDetail.setAttribute("open", "true");
    contentDefinitionWrapper.style.height = contentDefinitionParagraph.offsetHeight + "px";
  }
  function closeAccordion(wordDetail) {
    console.log("will close");
    let contentDefinitionWrapper = wordDetail.querySelector(".homegrade-blocks-vocabulaire-summary__content-wrapper");
    contentDefinitionWrapper.style.height = "0px";
    setTimeout(() => {
      wordDetail.removeAttribute("open");
    }, 300);
  }
  // HANDLING CLICK
  function toggleActive(wordDetail) {
    let isOpen = wordDetail.getAttribute("open");
    if (isOpen == null) {
      openAccordion(wordDetail);
    }
    if (isOpen == "true") {
      closeAccordion(wordDetail);
    }
  }

  // HANDLING CLICK
  Array.from(wordsDetails).forEach(wordDetail => {
    wordDetail.addEventListener("click", event => {
      event.preventDefault();
      toggleActive(wordDetail);
    });
  });
});
/******/ })()
;
//# sourceMappingURL=frontend-file.js.map