import { Controller, Get, Render, Res } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Response } from 'express';
import { Readable } from 'stream';
import styles from './less/index.less';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return { message: this.appService.getHello(), styles: styles.toString() };
  }

  @Get('downloadPdf')
  async downloadPdf(@Res() res: Response) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const filename = `doc/test.pdf`;
    const page = await browser.newPage();
    const url = 'http://localhost:3000';
    await page.goto(url, { waitUntil: 'networkidle2' });
    const pdf = await page.pdf({
      path: filename,
      width: '1188px',
      height: '840px',
      scale: 1,
      printBackground: true,
      landscape: false,
      displayHeaderFooter: false,
    });
    await browser.close();
    const stream = new Readable();
    stream.push(pdf);
    stream.push(null);
    /* 直接打开
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdf.length,
    });*/
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename=${filename}`,
    });
    stream.pipe(res);
  }
}
