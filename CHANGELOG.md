# Changelog

## 2.0.22 (16.05.2023)

- Fix bug [#207](https://github.com/kommitters/editorjs-undo/issues/207) - Limit search scope to Editor (holder) only.

## 2.0.21 (18.04.2023)

- Add default shortcut for `CMD+SHIFT+Z` command to redo.
- Update all dependencies.

## 2.0.20 (10.03.2023)

- Add the `dist/bundle.js` file of previous release - Fix bug when there is the last element to undo: Uncaught TypeError: Cannot read properties of undefined (reading 'holder').

## 2.0.19 (07.03.2023)

- Fix bug when there is the last element to undo: Uncaught TypeError: Cannot read properties of undefined (reading 'holder').
- Update all dependencies.

## 2.0.18 (13.01.2023)

- Block egress traffic in GitHub Actions.
- Add stability badge in README.

## 2.0.17 (28.12.2022)

- Add Renovate as dependency update tool.
- Keep read-only permissions in CI workflow.

## 2.0.16 (23.12.2022)

- Harden GitHub Actions.

## 2.0.15 (06.12.2022)

- Fix bug `TypeError: can't access property "type", t[i] is undefined` ([#156](https://github.com/kommitters/editorjs-undo/issues/156))

## 2.0.14 (17.11.2022)

- Update README usage instructions for React
- Bump loader-utils from 2.0.3 to 2.0.4

## 2.0.13 (16.11.2022)

- Fix validation of shortcuts on other keyboard layouts

## 2.0.12 (09.11.2022)

- Bump loader-utils from 2.0.2 to 2.0.3

## 2.0.11 (28.10.2022)

- Fix "master" branch by "main" in the CI

## 2.0.10 (28.10.2022)

- Add Coverage Report with Coveralls

## 2.0.9 (13.09.2022)

- Add OpenSSF BestPractices & Scorecard badges
- Add CDN version documentation

## 2.0.8 (08.08.2022)

- Add scorecards actions

## 2.0.7 (02.08.2022)

- Fix bug, undo is ignored when pasting more than 1 paragraph

## 2.0.6 (25.07.2022)

- Add security policy to repository
- Update packages with known security breaches

## 2.0.5 (15.07.2022)

- Add workflow for automatic publishing in npm

## 2.0.4 (29.06.2022)

- Fix bug, hover over @editorjs/table trigger mutationDebouncer

## 2.0.3 (08.06.2022)

- Fix bug in the undo fuction in the block was dropped validation which prevents blocks that were defined with an id to being drop consistently

## 2.0.2 (07.06.2022)

- Fix bug in the block was dropped fuction, remove unnecesary index comparision

## 2.0.1 (10.05.2022)

- Bug fix in the save function, use indexInState instead of index.

## 2.0.0 (29.04.2022)

- Updated packages with known security breaches.
- Add a new corner case to consider the case when the content has changed in the not current block.
- solve a bug in shortcuts related to the common Mac commands.
- Add a new corner case to handle empty blocks in the editor.

## 2.0.0-rc.3 (14.03.2022)

- Add a custom debounceTimer in the config object to choose the save time.

## 2.0.0-rc.2 (28.02.2022)

- Optimizes the observer, saving with the EditorJS API only when the content changes.

## 2.0.0-rc.1 (24.02.2022)

- Set the caret feature to the undo and redo actions.
- Add support to readOnly toggle.

## 2.0.0-rc.0 (28.12.2022)

- In the undo/redo actions the plugin now updates the involved block.
- Update eslint-plugin-import to support eslint.
- Solve linter errors.

## 1.0.1 (07.12.2021)

- Updated packages with known security breaches.

## 1.0.0 (22.11.2021)

- Set the initial stack data to avoid deleting all the blocks in the last undo.

## 0.3.0 (21.09.2021)

- Custom undo/redo keyboard shortcuts allowed.
- Updated packages with known security breaches.

## 0.2.0 (09.09.2021)

- Accept strings in the holder key.
- Updated packages with known security breaches.
- Docs updated.

## 0.1.7 (16.06.2021)

- Set the undo/redo event listeners in the holder element instead of the whole document.

## 0.1.6 (04.05.2021)

- Read-only mode support added.
- Dependencies updated. Security breaches covered.
- CI with github actions added.
- Minor bug fixes.

## 0.1.5 (05.04.2021)

- Bug fix: Cannot read property 'holder' of undefined.
- Dependencies updated. Security breaches covered.

## 0.1.4 (14.08.2020)

- Bug fix: The editor is not registering any change if its instance is destroyed.
- New feature: The caret state is saved and recovered on each undo/redo operation.

## 0.1.3 (13.07.2020)

- Modify custom MutationObserver to avoid saving changes related to the editor destroy process.

## 0.1.2 (29.06.2020)

- Added custom MutationObserver to save changes in a shorter period of time.

## 0.1.1 (24.06.2020)

- Added support for Mac users using <kbd>⌘</kbd> + <kbd>Z</kbd> and <kbd>⌘</kbd> + <kbd>Y</kbd>.
- Bug fixes and other minor improvements.

## 0.1.0 (23.06.2020)

Initial release
