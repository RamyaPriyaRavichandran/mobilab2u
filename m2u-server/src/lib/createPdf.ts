import fs from 'node:fs'
import path from 'node:path'
import handlebars from 'handlebars'
import puppeteer from 'puppeteer'

export async function createPDF(templatePath: string, data: object) {
  const templateHtml = fs.readFileSync(
    path.join(process.cwd(), templatePath),
    'utf8',
  )
  const template = handlebars.compile(templateHtml)
  const html = template(data, {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  })

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true,
  })
  const page = await browser.newPage()
  await page.setContent(html)
  const pdfDoc = await page.pdf({ format: 'A4', printBackground: true })
  await browser.close()
  return pdfDoc
}
