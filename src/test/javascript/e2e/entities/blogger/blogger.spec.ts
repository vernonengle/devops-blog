/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BloggerComponentsPage, BloggerDeleteDialog, BloggerUpdatePage } from './blogger.page-object';

const expect = chai.expect;

describe('Blogger e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let bloggerUpdatePage: BloggerUpdatePage;
    let bloggerComponentsPage: BloggerComponentsPage;
    let bloggerDeleteDialog: BloggerDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Bloggers', async () => {
        await navBarPage.goToEntity('blogger');
        bloggerComponentsPage = new BloggerComponentsPage();
        await browser.wait(ec.visibilityOf(bloggerComponentsPage.title), 5000);
        expect(await bloggerComponentsPage.getTitle()).to.eq('blogApp.blogger.home.title');
    });

    it('should load create Blogger page', async () => {
        await bloggerComponentsPage.clickOnCreateButton();
        bloggerUpdatePage = new BloggerUpdatePage();
        expect(await bloggerUpdatePage.getPageTitle()).to.eq('blogApp.blogger.home.createOrEditLabel');
        await bloggerUpdatePage.cancel();
    });

    it('should create and save Bloggers', async () => {
        const nbButtonsBeforeCreate = await bloggerComponentsPage.countDeleteButtons();

        await bloggerComponentsPage.clickOnCreateButton();
        await promise.all([
            bloggerUpdatePage.setUsernameInput('username'),
            bloggerUpdatePage.setEmailInput('email'),
            bloggerUpdatePage.userSelectLastOption()
        ]);
        expect(await bloggerUpdatePage.getUsernameInput()).to.eq('username');
        expect(await bloggerUpdatePage.getEmailInput()).to.eq('email');
        await bloggerUpdatePage.save();
        expect(await bloggerUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await bloggerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Blogger', async () => {
        const nbButtonsBeforeDelete = await bloggerComponentsPage.countDeleteButtons();
        await bloggerComponentsPage.clickOnLastDeleteButton();

        bloggerDeleteDialog = new BloggerDeleteDialog();
        expect(await bloggerDeleteDialog.getDialogTitle()).to.eq('blogApp.blogger.delete.question');
        await bloggerDeleteDialog.clickOnConfirmButton();

        expect(await bloggerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
