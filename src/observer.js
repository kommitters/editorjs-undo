/**
 * @typedef {Object} Observer
 * @description Custom MutationObserver to detect changes in the editor.
 * @property {String} holder — Editor.js holder id.
 * @property {Object} observer - MutationObserver object that detects changes in the editor.
 * @property {Number} debounceTimer - Delay time for the debouncer.
 * @property {Function} mutationDebouncer - Debouncer to delay the changes registration.
 */
export default class Observer {
  /**
   * Creates a new instance of the Observer object.
   * @param {Function} registerChange - Function that register a change in the history stack.
   * @param {String} holder - Editor.js holder id.
   */
  constructor(registerChange, holder) {
    this.holder = holder;
    this.observer = null;
    this.debounceTimer = 200;
    this.mutationDebouncer = this.debounce(() => {
      registerChange();
    }, this.debounceTimer);
  }

  /**
   * Sets a mutation observer to catch every change in the editor.
   */
  setMutationObserver() {
    const observerOptions = {
      childList: true,
      attributes: true,
      subtree: true,
      characterData: true,
      characterDataOldValue: true,
    };

    const target = document.querySelector(`#${this.holder}`);

    this.observer = new MutationObserver((mutationList) => {
      this.mutationHandler(mutationList);
    });
    this.observer.observe(target, observerOptions);
  }

  /**
   * Handles the mutations and checks if a new mutation has been produced.
   * @param {Object} mutationList The registered mutations
   */
  mutationHandler(mutationList) {
    let contentMutated = false;

    mutationList.forEach((mutation) => {
      switch (mutation.type) {
        case 'childList':
        case 'characterData':
          contentMutated = true;
          break;
        case 'attributes':
          if (!mutation.target.classList.contains('ce-block')) {
            contentMutated = true;
          }
          break;
        default:
          break;
      }
    });

    if (contentMutated) this.mutationDebouncer();
  }


  /**
   * Delays invoking a function until after wait millis have elapsed.
   * @param {Function} callback The function to be delayed.
   * @param {Number} wait The deplay time in millis.
   */
  debounce(callback, wait) {
    let timeout;
    return (...args) => {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => callback.apply(context, args), wait);
    };
  }
}
