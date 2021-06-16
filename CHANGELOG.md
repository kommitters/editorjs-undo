# Changelog

## 0.1.7 (16.06.2021)

* Set the undo/redo event listeners in the holder element instead of the whole document.

## 0.1.6 (04.05.2021)

* Read-only mode support added.
* Dependencies updated. Security breaches covered.
* CI with github actions added.
* Minor bug fixes.

## 0.1.5 (05.04.2021)

* Bug fix: Cannot read property 'holder' of undefined.
* Dependencies updated. Security breaches covered.

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
