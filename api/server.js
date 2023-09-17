const express = require('express');
const multer = require('multer');
const cors = require('cors');
const Jimp = require('jimp');


const app = express();

app.use(cors("*"));

const PORT = 3000;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const asciiChars = [".", ",", ":", ";", "+", "*", "?", "%", "S", "#", "@"];


app.post('/image-to-ascii', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No se subió ninguna imagen.');
    }
    const { width } = req.query;
    try {

        const imageBuffer = req.file.buffer;
        let image = await Jimp.read(imageBuffer);

        if (width ) {
            image = image.resize(Number(width) || 120, Jimp.AUTO);

        } else {
            image = image.resize(120, Jimp.AUTO);
        }
        let asciiImage = "";

        for (let y = 0; y < image.bitmap.height; y++) {
            for (let x = 0; x < image.bitmap.width; x++) {
                const pixelColor = Jimp.intToRGBA(image.getPixelColor(x, y));
                const avgColor = (pixelColor.r + pixelColor.g + pixelColor.b) / 4;
                const asciiIndex = Math.floor(((255 - avgColor) / 255) * (asciiChars.length - 1));
                asciiImage += asciiChars[asciiIndex];
            }
            asciiImage += '\n';
        }

        res.send(asciiImage);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error al procesar la imagen. :' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
