const { expect } = require('@playwright/test')

export class Tvshows {

    constructor(page) {
        this.page = page
    }

    async goForm() {
        await this.page.locator('a[href$="tvshows"]').click()
        await this.page.locator('a[href$="register"]').click()

    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
    }

    async create(tvshow) {

        await this.goForm()

        await this.page.getByLabel('Titulo da série').fill(tvshow.title)
        await this.page.getByLabel('Sinopse').fill(tvshow.overview)

        await this.page.locator('#select_company_id .react-select__indicator').click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: tvshow.company })
            .click()

        await this.page.locator('#select_year .react-select__indicator')
            .click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: tvshow.release_year })
            .click()

        await this.page.getByRole('textbox', { name: 'Temporadas' })
            .fill(tvshow.seasons)

        await this.page.locator('input[name=cover]')
            .setInputFiles('tests/support/fixtures' + tvshow.cover)
        
        if (tvshow.featured){
            await this.page.locator('.featured .react-switch').click()
        }

        await this.submit()
    }

    async search(target) {
        await this.page.getByPlaceholder('Busque pelo nome')
            .fill(target)

        await this.page.click('.actions button')
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

    async remove(title) {
        await this.page.getByRole('row', {name: title}).getByRole('button').click()
        await this.page.click('.confirm-removal')
    }
    
    async tableHave(content) {
        const cells = this.page.locator('table >> role=cell').filter({ hasText: /Zumbi/ })
        await expect(cells).toContainText(content)    
    }

    async visit() {
         await this.page.locator('a[href$="tvshows"]').click()
    }
}