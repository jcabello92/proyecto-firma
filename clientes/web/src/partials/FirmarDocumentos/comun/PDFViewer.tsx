import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import workerSrc from 'pdfjs-dist/build/pdf.worker?url';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// -- configura el worker de PDF.js --
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

interface Area { x: number; y: number; width: number; height: number; }

const modalStyles: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0,
  width: '100vw', height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.6)',
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  zIndex: 999,
};

const PDFViewer: React.FC = () => {
  const [mode, setMode] = useState<'single'|'multiple'>('single');
  const [pdfFile, setPdfFile] = useState<File|null>(null);
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string|null>(null);
  const [pdfUrls, setPdfUrls] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selection, setSelection] = useState<Area|null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState<{x:number,y:number}|null>(null);
  const [firmaUrl, setFirmaUrl] = useState<string|null>(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [signedPdfUrls, setSignedPdfUrls] = useState<string[]>([]);
  const [isSigning, setIsSigning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // -- modo de un documento o varios y carga --
  const handleModeChange = (m: 'single'|'multiple') => {
    setMode(m);
    setPdfFile(null); setPdfFiles([]);
    setPdfUrl(null); setPdfUrls([]);
    setCurrentPage(1); setSelection(null);
    setSignedPdfUrls([]); setInputCode('');
    setGeneratedCode(''); setShowCodeInput(false);
    setIsSigning(false);
  };
  const handlePdfSingle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f?.type==='application/pdf') {
      setPdfFile(f); setPdfUrl(URL.createObjectURL(f));
      setCurrentPage(1); setSelection(null);
      setSignedPdfUrls([]); setInputCode(''); setGeneratedCode('');
    } else alert('Selecciona un PDF válido');
  };
  const handlePdfMultiple = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files||[]).filter(f=>f.type==='application/pdf');
    if (!files.length) return alert('Selecciona al menos un PDF válido');
    setPdfFiles(files); setPdfUrls(files.map(f=>URL.createObjectURL(f)));
    setCurrentPage(1); setSelection(null);
    setSignedPdfUrls([]); setInputCode(''); setGeneratedCode('');
    setPdfFile(null); setPdfUrl(null);
  };
  const handleFirmaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f?.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setFirmaUrl(reader.result as string);
      reader.readAsDataURL(f);
    } else alert('Selecciona una imagen PNG válida');
  };

  // --- PDF visible ---
  const visibleFileUrl =
    mode==='single'
      ? pdfUrl
      : pdfUrls.length>0
        ? pdfUrls[0]
        : null;

  // Selecciion del area del raton para la firma
  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setStartPos({ x: Math.max(0, Math.min(e.clientX - r.left, r.width)),
                  y: Math.max(0, Math.min(e.clientY - r.top,  r.height)) });
    setIsDragging(true);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging||!startPos||!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - r.left, r.width));
    const y = Math.max(0, Math.min(e.clientY - r.top,  r.height));
    const nx = Math.min(startPos.x, x), ny = Math.min(startPos.y, y);
    const nw = Math.abs(x - startPos.x), nh = Math.abs(y - startPos.y);
    setSelection({
      x: nx,
      y: ny,
      width:  Math.min(nw, r.width  - nx),
      height: Math.min(nh, r.height - ny)
    });
  };
  const onMouseUp = () => setIsDragging(false);

  // --- generador de codigo simulador
  const generarCodigo = () => {
    if (!selection||!firmaUrl) return alert('Selecciona un área y carga la firma primero');
    const code = Math.floor(100000+Math.random()*900000).toString();
    setGeneratedCode(code); alert(`Código simulado: ${code}`); setShowCodeInput(true);
  };
  const verificarCodigo = () => {
    if (inputCode!==generatedCode) return alert('Código incorrecto');
    setShowCodeInput(false); signFiles();
  };

  // --- dibuja la firma en el documento ---
  const getPdfCoords = async (file: File) => {
    const bytes = await file.arrayBuffer();
    const pdfDoc= await PDFDocument.load(bytes);
    const page  = pdfDoc.getPage(currentPage-1);
    const crect = (containerRef.current!.querySelector('canvas') as HTMLCanvasElement)
                   .getBoundingClientRect();
    const prect = containerRef.current!.getBoundingClientRect();
    const pw=page.getWidth(), ph=page.getHeight(),
          sx=pw/crect.width, sy=ph/crect.height;
    const x=(selection!.x-(crect.left-prect.left))*sx;
    const y=ph-(selection!.y-(crect.top-prect.top)+selection!.height)*sy;
    return { x, y, width: selection!.width*sx, height: selection!.height*sy };
  };
  const signFiles = async () => {
    setIsSigning(true);
    const inputs = mode==='single'? [pdfFile!] : pdfFiles;
    const out: string[] = [];
    for (const file of inputs) {
      const coords = await getPdfCoords(file);
      const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
      const buf    = await fetch(firmaUrl!).then(r=>r.arrayBuffer());
      const img    = await pdfDoc.embedPng(buf);
      const page   = pdfDoc.getPage(currentPage-1);
      page.drawImage(img, coords);
      out.push(URL.createObjectURL(new Blob([await pdfDoc.save()],{type:'application/pdf'})));
    }
    setSignedPdfUrls(out);
    setIsSigning(false);
  };

  // --- ZIP para muchos documentos firmados ---
  const handleDownloadAll = async () => {
    if (signedPdfUrls.length<2) return;
    const zip = new JSZip();
    await Promise.all(signedPdfUrls.map(async (url,i)=>{
      const blob = await fetch(url).then(r=>r.blob());
      zip.file(`documento_firmado_${i+1}.pdf`, blob);
    }));
    const content = await zip.generateAsync({ type:'blob' });
    FileSaver.saveAs(content, 'todos_firmados.zip');
  };

  return (
    <div className="p-8 min-h-screen flex flex-col items-center bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Selecione archivo PDF para firmar</h2>

      {/* --- modo si un archivo o varios --- */}
      <div className="mb-6 flex gap-6">
        <label className="flex items-center gap-2">
          <input type="radio"
                 checked={mode==='single'}
                 onChange={()=>handleModeChange('single')} />
          Un documento
        </label>
        <label className="flex items-center gap-2">
          <input type="radio"
                 checked={mode==='multiple'}
                 onChange={()=>handleModeChange('multiple')} />
          Múltiples documentos
        </label>
      </div>

      {/* --- carga el PDF(s) y PNG firma */}
      <div className="mb-6 flex items-center gap-4">
        <p className="mt-1 text-xs/5 text-gray-500">
          Aqui el Archivo PDF
        </p>
        {mode==='single'
          ? <input type="file" accept="application/pdf" onChange={handlePdfSingle}/>
          : <input type="file" multiple accept="application/pdf" onChange={handlePdfMultiple}/>
        }
        <p className="mt-1 text-xs/5 text-gray-500">
          Aqui el Archivo PNG firma
        </p>
        <input type="file" accept="image/png" onChange={handleFirmaChange}/>
      </div>

      {/* --- visor de PDF, seleccion y previw de la firma --- */}
      {visibleFileUrl
        ? (
          <Document file={visibleFileUrl}
                    onLoadSuccess={({numPages})=>setTotalPages(numPages)}>
            <div ref={containerRef}
                 onMouseDown={onMouseDown}
                 onMouseMove={onMouseMove}
                 onMouseUp={onMouseUp}
                 className="relative inline-block border shadow bg-white">
              <Page pageNumber={currentPage} scale={1.5} renderTextLayer={false}/>
              {selection && (
                <div className="absolute border-2 border-blue-400 bg-blue-200 bg-opacity-30"
                     style={{ left:selection.x, top:selection.y,
                              width:selection.width, height:selection.height,
                              pointerEvents:'none' }}/>
              )}
              {selection && firmaUrl && (
                <img src={firmaUrl} alt="Firma"
                     style={{ position:'absolute',
                              left:selection.x, top:selection.y,
                              width:selection.width, height:selection.height,
                              pointerEvents:'none' }}/>
              )}
            </div>
          </Document>
        )
        : <p className="text-gray-600">Sube tu(s) PDF(s) para comenzar</p>
      }

      {/* --- paginacion del PDF --- */}
      {visibleFileUrl && totalPages>1 && (
        <div className="flex items-center gap-4 mt-4">
          <button onClick={()=>setCurrentPage(p=>Math.max(p-1,1))}
                  disabled={currentPage===1}
                  className="px-4 py-2 bg-gray-300 rounded">⬅</button>
          <span>Página {currentPage} de {totalPages}</span>
          <button onClick={()=>setCurrentPage(p=>Math.min(p+1,totalPages))}
                  disabled={currentPage===totalPages}
                  className="px-4 py-2 bg-gray-300 rounded">➡</button>
        </div>
      )}

      {/* --- boton firmar solo aparece si esta el PDF y firma puesta --- */}
      {!signedPdfUrls.length && !isSigning && selection && firmaUrl && (
        <div className="mt-6">
          <button onClick={generarCodigo}
                  className="px-6 py-2 bg-green-600 text-white rounded">
            Firmar Documento
          </button>
        </div>
      )}

      {/* --- indicador de cargando (porque cuando son muchos archivos se demora en aparecer el boton de descarga por muchos datos) ---*/}
      {isSigning && <p className="mt-4 text-gray-700">Cargando documentos firmados…</p>}

      {/* --- modo de validacion del codigo --- */}
      {showCodeInput && (
        <div style={modalStyles}>
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-4">Verificación</h3>
            <p className="text-gray-700 mb-3">
              Se ha enviado un código de verificación a tu correo.
            </p>
            <input
              type="text"
              placeholder="Ingresa el código"
              value={inputCode}
              onChange={e=>setInputCode(e.target.value)}
              className="border p-2 w-full mb-4"
            />
            <button onClick={verificarCodigo}
                    className="px-4 py-2 bg-blue-600 text-white rounded w-full">
              Verificar código
            </button>
          </div>
        </div>
      )}

      {/* --- boton para descargar el documento firmado --- */}
      {!isSigning && signedPdfUrls.length>0 && (
        <div className="mt-6">
          {mode==='single'
            ? <a href={signedPdfUrls[0]}
                 download="documento_firmado.pdf"
                 className="px-6 py-2 bg-emerald-600 text-white rounded">
                Descargar documento firmado
              </a>
            : <button onClick={handleDownloadAll}
                      className="px-6 py-2 bg-blue-600 text-white rounded">
                Descargar todos en ZIP
              </button>
          }
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
