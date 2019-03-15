import { element, by, ElementFinder } from 'protractor';

export class BlogComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-blog div table .btn-danger'));
    title = element.all(by.css('jhi-blog div h2#page-heading span')).first();

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

export class BlogUpdatePage {
    pageTitle = element(by.id('jhi-blog-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    contentInput = element(by.id('field_content'));
    datePostedInput = element(by.id('field_datePosted'));
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

    async setDatePostedInput(datePosted) {
        await this.datePostedInput.sendKeys(datePosted);
    }

    async getDatePostedInput() {
        return this.datePostedInput.getAttribute('value');
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

export class BlogDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-blog-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-blog'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
