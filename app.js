const express = require('express');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');

async function generatePDF() {
    // Load cover and content pdfs
    const cover = await PDFDocument.load(fs.readFileSync('./pdf1.pdf'));
    const content = await PDFDocument.load(fs.readFileSync('./pdf2.pdf'));
  
    // Create a new document
    const doc = await PDFDocument.create();

    // Add the cover to the new doc
    const [coverPage] = await doc.copyPages(cover, [0]);
    doc.addPage(coverPage);

    // generate intro page
    const timesRomanFont = await doc.embedFont(StandardFonts.TimesRoman)

    const page = doc.addPage()
    const { width, height } = page.getSize()
    const fontSize = 11
    page.drawText(
`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula mollis tellus, non venenatis eros. 
Nulla porttitor ex vel nunc eleifend commodo. Ut vel libero sem. Cras quis dolor rutrum, egestas sapien a, 
tempor dui. Morbi congue enim nec tristique dignissim. Donec dignissim dui libero, at elementum sapien 
gravida a. Curabitur id leo justo. Aliquam lacinia faucibus ipsum vitae finibus. Vivamus tempus massa ut tortor
vehicula viverra.

Duis gravida nulla porta, dignissim turpis ac, rutrum nibh. Fusce viverra urna ac est convallis sagittis. 
Fusce faucibus libero ut ex faucibus porta. Quisque sed nunc condimentum, efficitur lacus ut, tempor massa. 
Etiam eleifend enim ac massa blandit, egestas convallis ante dapibus. Morbi aliquam, mi convallis scelerisque 
laoreet, nisl ante aliquet neque, vitae feugiat sapien ligula auctor sapien. Quisque metus lacus, lobortis eget
odio vel, vehicula commodo ante.

Vestibulum elementum sodales auctor. Nullam non vehicula nisl, vel molestie elit. Pellentesque aliquet porta
magna, vitae scelerisque odio volutpat at. Phasellus ac ante eros. Donec vitae sapien sed libero varius gravida. 
Nunc at ornare purus, in viverra sem. Nulla facilisi. Phasellus ultricies tortor in orci dictum, ac tempor enim 
fermentum.

Aliquam sed diam ex. Integer aliquam diam quis nisl congue, at blandit ex commodo. Cras tincidunt diam at sapien 
aliquet aliquet. Vestibulum accumsan tempor sem, et cursus purus feugiat vitae. Phasellus a nisl id urna cursus 
varius ac a mauris. Vivamus commodo ullamcorper ipsum eu vehicula. Mauris eget semper leo. Donec luctus 
dignissim ligula in aliquam. Etiam metus arcu, venenatis eu consectetur quis, rhoncus quis mi. Ut hendrerit 
venenatis efficitur. Morbi semper volutpat enim et aliquam. Fusce posuere ultrices risus, in fermentum nisl auctor 
quis. Praesent at felis est. Maecenas non eleifend nibh. Integer eget tincidunt nulla. Integer volutpat lectus 
et felis rhoncus, a elementum mauris gravida.

Duis suscipit ligula in sem scelerisque maximus. Phasellus malesuada mattis rhoncus. Vivamus eget ipsum ut risus 
sodales dignissim. Proin accumsan, tortor ut varius accumsan, eros risus faucibus lorem, quis viverra eros mi 
vitae nulla. Donec fringilla facilisis leo ac vehicula. Donec at consectetur risus, quis dapibus orci. In laoreet, 
justo quis condimentum vestibulum, nunc eros congue dolor, eu pellentesque turpis enim vitae sem.`, 
    {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
    })
  
    // Add individual content pages
    const contentPages = await doc.copyPages(content, content.getPageIndices());
    for (const page of contentPages) {
      doc.addPage(page);
    }
  
    // Write the PDF to a file
    fs.writeFileSync('./test.pdf', await doc.save());
  }

var app = express();
app.get('/', function (req, res) {

    (async () => {        
        await generatePDF().catch(err => console.log(err));
        res.write("Done!");
        res.end();
    
      })();

    res.write('Merge Running!\n');
});
app.listen(3000, function () {
  console.log('Test app listening on port 3000!');
});

