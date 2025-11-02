import EditorJS from '@editorjs/editorjs';
import { EditorConfig } from '@editorjs/editorjs';

export interface EditorJsReady extends EditorJS {
  configuration: EditorConfig;
}
