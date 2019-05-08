import React from 'react';
import { getSanitizingConverter, Editor } from '../src/MarkdownModules';

describe('CommentEditor', () => {

    beforeAll(() => {
        global.scrollBy = jest.fn()

        const div = document.createElement("div");
        document.body.appendChild(div);
        const test = mount( 
        <div>
            <div>
                <div id="wmd-button-bar"></div>
                <textarea id="wmd-input"></textarea>
            </div>
            <div id="wmd-preview"></div>
        </div>, {attachTo: div}
        );
        const converter = getSanitizingConverter();
        const editor = new Editor(converter);
        editor.run();
    });

    it("Click bold button", () => {
        document.getElementById('wmd-bold-button').click();
        const text = document.getElementById('wmd-input').value;
        expect(text).toEqual("**strong text**");
    });

    it("Click italic button", () => {
        document.getElementById('wmd-italic-button').click();
        const text = document.getElementById('wmd-input').value;
        expect(text).toEqual("*emphasized text*");
    });

    it("Click link button", () => {
        document.getElementById('wmd-link-button').click();
        const text = document.getElementById('wmd-input').value;
        expect(text).toEqual(`[enter link description here][1]\n\n\n  [1]: http://`);
    });

    it("Click quote button", () => {
        document.getElementById('wmd-quote-button').click();
        const text = document.getElementById('wmd-input').value;
        expect(text).toEqual(`> Blockquote`);
    });

    it("Click code button", () => {
        document.getElementById('wmd-code-button').click();
        const text = document.getElementById('wmd-input').value;
        expect(text).toEqual(`    enter code here`);
    });

    it("Click olist button", () => {
        document.getElementById('wmd-olist-button').click();
        const text = document.getElementById('wmd-input').value;
        expect(text).toEqual(` 1. List item`);
    });

    it("Click ulist button", () => {
        document.getElementById('wmd-ulist-button').click();
        const text = document.getElementById('wmd-input').value;
        expect(text).toEqual(` - List item`);
    });

    it("Click heading button", () => {
        const headingButton = document.getElementById('wmd-heading-button')
        headingButton.click();
        let text = document.getElementById('wmd-input').value;
        expect(text).toEqual(`## Heading ##`);

        headingButton.click();
        text = document.getElementById('wmd-input').value;
        expect(text).toEqual(`Heading\n=======`);
    });

    it("Click hr button", () => {
        document.getElementById('wmd-hr-button').click();
        const text = document.getElementById('wmd-input').value;
        expect(text).toEqual(`----------\n`);
    });

    afterEach(() => {
        document.getElementById('wmd-input').value = "";
    });

});