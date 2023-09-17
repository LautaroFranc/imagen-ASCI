import React, { useRef, useState } from 'react';
import "./imageAscii.css"

function ImageToAscii() {
    const [asciiResult, setAsciiResult] = useState('');
    const [img, setImg] = useState('');
    const refIpunt= useRef<HTMLInputElement | null>(null)
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        try {
            const response = await fetch("http://localhost:3000/image-to-ascii", {
                method: 'POST',
                body: formData
            });

            const asciiText = await response.text();
            setAsciiResult(asciiText);
        } catch (error) {
            console.error("Error al subir y procesar la imagen", error);
        }
    };

    const handleupload = ()=>{
        if(refIpunt.current){
            refIpunt.current.click()
        }
    }
    const handleuploadimg = (event:React.ChangeEvent<HTMLInputElement>)=>{
     const file =event.target.files?.[0]
     if(file){
        const img = URL.createObjectURL(file)
        setImg(img)
     }

    }

    const clearImg = ()=>{
        setImg('')
        setAsciiResult('')
    }
    return (
        <div className='container'>
            <h2>Selecciona una imagen para convertir a ASCII</h2>
            <form onSubmit={handleSubmit}>
                {!img?<div  className='conatainerImagen' onClick={handleupload}>
                    subir imagen
                </div>:null}
                <input ref={refIpunt} type="file" name="image" accept="image/*" required  onChange={handleuploadimg}/>
                <br /><br />
               {img&&<button type="submit">Convertir a ASCII</button>}
            </form>
            {img&&<button className='clearBtm' onClick={clearImg}>limpiar</button>}

            <div className='resultImg'>
            {img&&<img src={img} />}
            {asciiResult&&<h3>Resultado:</h3>}
            <pre className={`${asciiResult?"showImg":""}`}>{asciiResult}</pre>
            </div>
           
        </div>
    );
}

export default ImageToAscii;
