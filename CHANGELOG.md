# Changelog

## BigBrother (10.10.2020)

@sosie-js : BigBrother (branch) is now watching your change blocks and informs you throughout changeBlocks event..It's the upgrade/merge of the Observer with the one more spying one, hughfenghen provided on [y-editorjs](https://github.com/hughfenghen/y-editorjs.git). 

In your script this and watch the console..

```javascript
    //Blocks Listener(s) may need to be upated on enter or remove,
        document.addEventListener('changeBlocks', function(evt){
            var changedSet=evt.detail.changed;
            changedSet.forEach(entry => {
                //console.log('changeBlocks',entry);
                var block=entry.blockElement;
                var blockId=block.dataset.blockId;
                var blockData= block.innerText ? [block.innerText] : block;
                switch(entry.changeType) {
                    case 'add':
                        console.log('Block ('+blockId+') added', blockData);
                    break;
                    case 'remove':
                        console.log('Block ('+blockId+') removed', blockData);
                    break;
                    case 'update':
                    default:
                        console.log('Block ('+blockId+') updated', blockData);
                }
            });
        });
```


## 0.1.4 (14.08.2020)

* Bug fix: The editor is not registering any change if its instance is destroyed.
* New feature: The caret state is saved and recovered on each undo/redo operation.

## 0.1.3 (13.07.2020)

* Modify custom MutationObserver to avoid saving changes related to the editor destroy process.

## 0.1.2 (29.06.2020)

* Added custom MutationObserver to save changes in a shorter period of time.

## 0.1.1 (24.06.2020)

* Added support for Mac users using  <kbd>⌘</kbd> + <kbd>Z</kbd> and  <kbd>⌘</kbd> + <kbd>Y</kbd>.
* Bug fixes and other minor improvements.

## 0.1.0 (23.06.2020)

Initial release
