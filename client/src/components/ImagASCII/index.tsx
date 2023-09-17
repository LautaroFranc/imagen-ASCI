import React, { useRef, useState } from 'react';
import "./imageAscii.css"
import useFetch from '../../hooks/useFetch';

function ImageToAscii() {
    const { asciiResult, setData, setUrl, clearData } = useFetch()
    const [file, setFile] = useState<HTMLFormElement | null>(null);
    const [width, setWidth] = useState(120);
    const [img, setImg] = useState('');
    const refIpunt = useRef<HTMLInputElement | null>(null)


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        setFile(form)
        setUrl("http://localhost:3000/image-to-ascii")
        setData(formData)
    };

    const handleupload = () => {
        if (refIpunt.current) {
            refIpunt.current.click()
        }
    }
    const handleuploadimg = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const img = URL.createObjectURL(file)
            setImg(img)
        }

    }
    const handleMideshow = () => {
        if (file) {
            const formData = new FormData(file);
            setUrl("http://localhost:3000/image-to-ascii?width=" + width )
            setData(formData)
        }
    }


    const handleNumberW = (number: React.ChangeEvent<HTMLInputElement>) => {
        setWidth(+number.target.value)
    }
   
    const clearImg = () => {
        setImg('')
        clearData()
    }
    return (
        <div className='container'>
            <h2>Selecciona una imagen para convertir a ASCII</h2>

            <form onSubmit={handleSubmit}>
                {!img ? <div className='conatainerImagen' onClick={handleupload}>
                    subir imagen
                </div> : null}
                <input ref={refIpunt} className='inputFile' type="file" name="image" accept="image/*" required onChange={handleuploadimg} />
                <br /><br />
                {img && <button type="submit">Convertir a ASCII</button>}
            </form>
            {img && <button className='clearBtm' onClick={clearImg}>limpiar</button>}

            <div className='resultImg'>
                <div className='containerSetting'>
                    {asciiResult && <div className='inputNumber'>
                    <label>Tamaño:</label>

                        <div className='number' >
                            <input type='number' value={width} onChange={handleNumberW} />
                            <button onClick={handleMideshow}>Aceptar</button>
                        </div>
                    </div>}
                    {img && <img src={img} />}
                </div>
                {asciiResult && <h3>Resultado:</h3>}
                <pre className={`${asciiResult ? "showImg" : ""}`}>{asciiResult}</pre>
            </div>

        </div>
    );
}

export default ImageToAscii;
