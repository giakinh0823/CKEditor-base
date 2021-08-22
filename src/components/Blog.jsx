import React, { useState } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

const editorConfiguration = {
    toolbar: [
        'heading',
        '|',
        'fontSize',
        'fontFamily',
        '|',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'highlight',
        '|',
        'alignment',
        'restrictedEditingException',
        '|',
        'numberedList',
        'bulletedList',
        '|',
        'outdent',
        'indent',
        '|',
        'blockQuote',
        'todoList',
        'link',
        'insertTable',
        'imageUpload',
        'imageInsert',
        'mediaEmbed',
        '|',
        'code',
        'codeBlock',
        'htmlEmbed',
        '|',
        'specialCharacters',
        'superscript',
        'subscript',
        'removeFormat',
        '|',
        'pageBreak',
        '|',
        'undo',
        'redo',
        '|',
        'findAndReplace'
    ],
    language: 'vi',
    image: {
        toolbar: [
            'imageTextAlternative',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            'linkImage'
        ]
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableCellProperties',
            'tableProperties'
        ]
    },
};

Blog.propTypes = {

};

function Blog(props) {

    const [data, setData] = useState("")

    return (
        <div className="App">
            <h1>Viết Blog</h1>
            <CKEditor
                editor={Editor}
                data=""
                config={editorConfiguration}
                onReady={ editor => {
                    console.log( 'Editor is ready to use!', editor );

                    // Insert the toolbar before the editable area.
                    editor.ui.getEditableElement().parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement()
                    );
                } }
                onError={ ( { willEditorRestart } ) => {
                    // If the editor is restarted, the toolbar element will be created once again.
                    // The `onReady` callback will be called again and the new toolbar will be added.
                    // This is why you need to remove the older toolbar.
                    if ( willEditorRestart ) {
                        this.editor.ui.view.toolbar.element.remove();
                    }
                } }
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                    setData(data)
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
            <div dangerouslySetInnerHTML={{ __html: data }} />
        </div>
    );
}

export default Blog;