const https = require('https');
const fs = require('fs');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const url = 'https://resume.io/r/9DFF3LBKD';
const options = {
  hostname: 'resume.io',
  path: '/sharing/web/9DFF3LBKD',
  method: 'GET'
}


const getHTMLDocument = element => {
  const dom = new JSDOM(element);
  const html = dom.window.document;
  return html;
}

const makeBodyScrollable = doc => {
  doc.documentElement.style.overflow = 'scroll';
  doc.body.style.overflow = 'unset';
  return doc.documentElement.outerHTML;
}

const writeToFile = doc => {
  fs.writeFile('resume7.html', doc, 'utf8', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    const document = getHTMLDocument(d);
    const finallDoc = makeBodyScrollable(document);
    writeToFile(finallDoc);
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()