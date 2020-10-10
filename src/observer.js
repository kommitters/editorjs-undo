/* Add an uuid as it will be easier to track changes */
import genUUID from 'uuid/dist/v4';

/* For IE or other compat? */
(function () {

if ( typeof window.CustomEvent === "function" ) return false;

    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();
        
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

    const target = typeof this.holder === 'string' ? document.querySelector(`#${this.holder}`) : this.holder;

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

     // from editor.js
    const Block = {
    CSS: {
        wrapper: 'ce-block',
        wrapperStretched: 'ce-block--stretched',
        content: 'ce-block__content',
        focused: 'ce-block--focused',
        selected: 'ce-block--selected',
        dropTarget: 'ce-block--drop-target',
    }
    }
    
    function checkChangeType(mutation) {
        
            const isBlockElement = (el) => el instanceof Element
                ? el.classList.contains(Block.CSS.wrapper)
                : false
            if (
                !!Array.from(mutation.removedNodes)
                .find(isBlockElement)
            ) return 'remove'

            if (
                !!Array.from(mutation.addedNodes)
                .find(isBlockElement)
            ) return 'add'

            return 'update'
    }
    
    const changed = new Set()
    
    mutationList.forEach((mutation) => {
        
      const target = mutation.target //as Element
      const blockSelector = '.' + Block.CSS.wrapper

      /**
       * findChangedBlockElement
       * 
       * @param {MutationRecord} mutation
       * @param {String} changeType - add or remove or update
       * @return HTMLElement|null
       **/      
       function findChangedBlockElement(mutation, changeType) {
        if (changeType === 'add') {
          return Array.from(mutation.addedNodes).find((n) => n.classList.contains(Block.CSS.wrapper)) //as HTMLElement
        }

        if (changeType === 'remove') {
          return Array.from(mutation.removedNodes).find((n) => n.classList.contains(Block.CSS.wrapper)) //as HTMLElement
        }

        const el = mutation.target
        if (el instanceof Text)
          return el.parentElement?.closest(blockSelector)

        if (el instanceof Element)
          return el.querySelector(blockSelector) || el.closest(blockSelector)

        return null
      } 
        
      let totalBlocksMutated=false;  
      let contentBlockMutated=false;
        
      switch (mutation.type) {
        case 'childList':
          if (mutation.target.id === this.holder) {
            this.onDestroy();
          } else {
            contentMutated = true;
          }
          totalBlocksMutated = true;
          break;
        case 'characterData':
          contentBlockMutated = true;
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
      
      if(totalBlocksMutated || contentBlockMutated) {
          
        const changeType = checkChangeType(mutation);
        var mutType=mutation.type
         
        switch (mutation.type) {
            case 'childList': //when block is added, removed
            case 'characterData': //when block is updated
            const blockElement = findChangedBlockElement(mutation, changeType)
            if (blockElement) {
                const blockId = blockElement.dataset.blockId || genUUID()

                if (!blockElement.dataset.blockId)
                blockElement.setAttribute('data-block-id', blockId);
               
                changed.add({ blockId, mutType, changeType, blockElement });
            }
            break;
            case 'attributes':
            /**
            * Changes on Element.ce-block usually is functional
            */
            if (!target.classList.contains(Block.CSS.wrapper)) {
                const blockElement = findChangedBlockElement(mutation, changeType)
                if (blockElement) {
                const blockId = blockElement.dataset.blockId || genUUID()

                if (!blockElement.dataset.blockId)
                    blockElement.setAttribute('data-block-id', blockId);

                changed.add({ blockId, mutType, changeType, blockElement });
                }
                break;
            }
        }
      }
    });

    if (contentMutated) {

        if (changed.size > 0) {
            //this.onBlockChange(changed);
            let event = new CustomEvent("changeBlocks", {
                cancelable: true, // without that flag preventDefault doesn't work
                detail: {
                    changed: changed
                }
            });
            //console.log('Blockschanged',changed);
            document.dispatchEvent(event)
        }
        
        this.mutationDebouncer();
    }
     
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

  onDestroy() {
    const destroyEvent = new CustomEvent('destroy');
    document.dispatchEvent(destroyEvent);
    this.observer.disconnect();
  }
}
