import { element, by, ElementFinder } from 'protractor';

export class CommentComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-comment div table .btn-danger'));
    title = element.all(by.css('jhi-comment div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CommentUpdatePage {
    pageTitle = element(by.id('jhi-comment-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    contentInput = element(by.id('field_content'));
    blogSelect = element(by.id('field_blog'));
    bloggerSelect = element(by.id('field_blogger'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setContentInput(content) {
        await this.contentInput.sendKeys(content);
    }

    async getContentInput() {
        return this.contentInput.getAttribute('value');
    }

    async blogSelectLastOption() {
        await this.blogSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async blogSelectOption(option) {
        await this.blogSelect.sendKeys(option);
    }

    getBlogSelect(): ElementFinder {
        return this.blogSelect;
    }

    async getBlogSelectedOption() {
        return this.blogSelect.element(by.css('option:checked')).getText();
    }

    async bloggerSelectLastOption() {
        await this.bloggerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async bloggerSelectOption(option) {
        await this.bloggerSelect.sendKeys(option);
    }

    getBloggerSelect(): ElementFinder {
        return this.bloggerSelect;
    }

    async getBloggerSelectedOption() {
        return this.bloggerSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class CommentDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-comment-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-comment'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
