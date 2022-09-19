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
		document.getElementById('wmd-input').value = "some text";
		document.getElementById('wmd-input').select();
		
        document.getElementById('wmd-bold-button').click();		
        const text = document.getElementById('wmd-input').value;
        expect(text).toEqual("**some text**");
    });

    it("Click italic button", () => {
        document.getElementById('wmd-italic-button').click();
        const text = document.getElementById('wmd-input').value;
        expect(text).toEqual("*emphasized text*");
    });

    it("Click link button", () => {
        document.getElementById('wmd-link-button').click();
        const text = document.getElementById('wmd-input').value;
        expect(text).toEqual(`[enter link description here][1]\n\n\n  [1]: https://`);
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

    it("Insert text with new line", () => {
        const converter = getSanitizingConverter();
        const text = converter.makeHtml("Test\nText");
        expect(text).toEqual("<p>Test <br>\nText</p>");
    });

    it("Check error is shown for http images that are trying to be loaded over HTTPS ", () => {
        delete global.window.location;
        global.window.location = new URL("https://www.dummy.com/");
        
        const renderConverter = getSanitizingConverter();
        let text = renderConverter.makeHtml("Test <img src=\"https://test.com\">");
        expect(text).toEqual("<p>Test </p>");

        const previewConverter = getSanitizingConverter("preview", {IMAGE_ERROR_MESSAGE: "Error message"});
        text = previewConverter.makeHtml("Test <img src=\"https://test.com\">");
        expect(text).toEqual("<p>Test <br /> <b> Error message</b> <br /></p>");
    });

    afterEach(() => {
        document.getElementById('wmd-input').value = "";
    });

});
