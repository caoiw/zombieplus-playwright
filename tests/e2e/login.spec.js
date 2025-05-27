const { test } = require('../support')

test('deve logar como admin', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()
})

test('não deve logar com senha incorreta', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', '1111')
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.toast.containText(message)
})

test('não deve logar quando o e-mail é inválido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('teste.com.br', '1111')
    await page.login.alertHaveText('Email incorreto')
})

test('não deve logar quando o e-mail nao e preenchido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', '1111')
    await page.login.alertHaveText('Campo obrigatório')
})

test('não deve logar quando a senha nao e preenchida', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', '')
    await page.login.alertHaveText('Campo obrigatório')
})

test('não deve logar quando nenhum campo e preenchida', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', '')
    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})