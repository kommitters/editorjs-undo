import EditorJs, { EditorConfig } from '@editorjs/editorjs';
import { EditorJsReady } from '../../src/types';

/**
 * Mocks for Editor.js instance object.
 */
export class EditorJsTest extends EditorJs implements EditorJsReady {
  configuration: EditorConfig = {};
}
