import { default as EditorJS, EditorConfig } from '@editorjs/editorjs';
export interface EditorJsReady extends EditorJS {
    configuration: EditorConfig;
}
