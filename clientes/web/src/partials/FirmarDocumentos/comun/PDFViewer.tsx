

import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument } from 'pdf-lib';
import workerSrc from 'pdfjs-dist/build/pdf.worker?url';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// URL de tu backend (mock o real) que procesa firma avanzada con layout
const FIRAGOB_URL = 'http://localhost:4000/api/firmar-avanzada';

// Configura el worker de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

interface Area { x: number; y: number; width: number; height: number; }

const modalStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0, left: 0,
  width: '100vw', height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
};

const PDFViewer: React.FC = () => {
  // Estados de PDF y firma
  const [pdfUrl, setPdfUrl]             = useState<string | null>(null);
  const [pdfFile, setPdfFile]           = useState<File | null>(null);
  const [firmaUrl, setFirmaUrl]         = useState<string | null>(null);
  const [currentPage, setCurrentPage]   = useState(1);
  const [totalPages, setTotalPages]     = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Estados de selección de área
  const [selection, setSelection]       = useState<Area | null>(null);
  const [isDragging, setIsDragging]     = useState(false);
  const [startPos, setStartPos]         = useState<{ x: number; y: number } | null>(null);

  // Estados de flujo OTP y firma
  const [firmType, setFirmType]         = useState<'simple' | 'advanced' | null>(null);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [inputCode, setInputCode]         = useState('');
  const [codeVerified, setCodeVerified]   = useState(false);
  const [signedPdfUrl, setSignedPdfUrl]   = useState<string | null>(null);

  // 1) Carga de PDF
  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type === 'application/pdf') {
      setPdfFile(file);
      setPdfUrl(URL.createObjectURL(file));
      setCurrentPage(1);
      setSelection(null);
      setCodeVerified(false);
      setSignedPdfUrl(null);
    } else {
      alert('Selecciona un archivo PDF válido');
    }
  };

  // 2) Carga de PNG de firma
  const handleFirmaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setFirmaUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      alert('Selecciona una imagen PNG válida');
    }
  };

  // 3) Selección de área con el ratón
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    setStartPos({ x, y });
    setIsDragging(true);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !startPos || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    let y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    const sx = startPos.x, sy = startPos.y;
    const nx = Math.min(sx, x), ny = Math.min(sy, y);
    const nw = Math.abs(x - sx), nh = Math.abs(y - sy);
    const w  = Math.min(nw, rect.width - nx);
    const h  = Math.min(nh, rect.height - ny);
    setSelection({ x: nx, y: ny, width: w, height: h });
  };
  const handleMouseUp = () => setIsDragging(false);

  // 4) Generar OTP simulado
  const generarCodigo = () => {
    if (!firmType) {
      alert('Elige un tipo de firma primero');
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    alert(`Código enviado (simulado): ${code}`);
    setShowCodeInput(true);
  };

  // 5) Verificar OTP e iniciar firma
  const verificarCodigo = () => {
    if (inputCode !== generatedCode) {
      alert('Código incorrecto');
      return;
    }
    setCodeVerified(true);
    setShowCodeInput(false);
    firmType === 'simple' ? firmarPdfSimple() : firmarPdfAvanzada();
  };

  // 6) Mapea selección visual a coordenadas de PDF-lib
  const getPdfCoords = async () => {
    const pdfBytes = await pdfFile!.arrayBuffer();
    const pdfDoc   = await PDFDocument.load(pdfBytes);
    const page     = pdfDoc.getPage(currentPage - 1);
    const canvas   = containerRef.current!.querySelector('canvas') as HTMLCanvasElement;
    const crect    = canvas.getBoundingClientRect();
    const prect    = containerRef.current!.getBoundingClientRect();
    const pw = page.getWidth(), ph = page.getHeight();
    const scaleX = pw / crect.width, scaleY = ph / crect.height;
    const x = (selection!.x - (crect.left - prect.left)) * scaleX;
    const y = ph - (selection!.y - (crect.top - prect.top) + selection!.height) * scaleY;
    const width  = selection!.width  * scaleX;
    const height = selection!.height * scaleY;
    return { x, y, width, height, pageNum: currentPage };
  };

  // 7A) Firma simple con pdf-lib
  const firmarPdfSimple = async () => {
    const pdfBytes = await pdfFile!.arrayBuffer();
    const pdfDoc   = await PDFDocument.load(pdfBytes);
    const pngBytes = await fetch(firmaUrl!).then(r => r.arrayBuffer());
    const pngImg   = await pdfDoc.embedPng(pngBytes);
    const page     = pdfDoc.getPage(currentPage - 1);
    const { x, y, width, height } = await getPdfCoords();

    page.drawImage(pngImg, { x, y, width, height });

    const out = await pdfDoc.save();
    const blob = new Blob([out], { type: 'application/pdf' });
    setSignedPdfUrl(URL.createObjectURL(blob));
  };

  // 7 Firma avanzada con layout
  const firmarPdfAvanzada = async () => {
    //Base64 y checksum
    const bytes = await pdfFile!.arrayBuffer();
    const base64 = await new Promise<string>(res => {
      const r = new FileReader();
      r.onload  = () => res((r.result as string).split(',')[1]);
      r.readAsDataURL(pdfFile!);
    });
    const hashBuf = await crypto.subtle.digest('SHA-256', bytes);
    const checksum = Array.from(new Uint8Array(hashBuf))
      .map(b => b.toString(16).padStart(2, '0')).join('');

    //Coordenadas y página
    const { x, y, width, height, pageNum } = await getPdfCoords();

    //Construye el XML layout
    const firmaB64 = firmaUrl!.split(',')[1];
    const layoutXml = `
<AgileSignerConfig>
  <Application id="APP_ID">
    <Signature>
      <Visible active="true" layer2="false" label="true" pos="1">
        <llx>${x.toFixed(2)}</llx>
        <lly>${y.toFixed(2)}</lly>
        <urx>${(x + width).toFixed(2)}</urx>
        <ury>${(y + height).toFixed(2)}</ury>
        <page>${pageNum}</page>
        <image>BASE64</image>
        <BASE64VALUE>${firmaB64}</BASE64VALUE>
      </Visible>
    </Signature>
  </Application>
</AgileSignerConfig>`.trim();

    // d) Payload JSON
    const payload = {
      token:          'aqui_back',
      api_token_key:  'sandbox',
      files: [{
        'content-type':'application/pdf',
        content:       base64,
        checksum,
        description:   'Documento a firmar'
      }],
      layout: layoutXml
    };

    //Llamar al backend
    const resp = await fetch(FIRAGOB_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload)
    });

    if (!resp.ok) {
      const text = await resp.text();
      alert(`Error firma avanzada: ${resp.status} — ${text}`);
      return;
    }

    //Recibe blob PDF
    const blob = await resp.blob();
    setSignedPdfUrl(URL.createObjectURL(blob));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Selecione archivo PDF para firmar</h2>

      {/* Carga de archivos */}
      <div className="flex gap-4 mb-6">
        <p className="mt-1 text-xs/5 text-gray-500">
          Aqui el Archivo PDF
        </p>
        <input type="file" accept="application/pdf" onChange={handlePdfChange} />
        <p className="mt-1 text-xs/5 text-gray-500">
          Aqui el Archivo PNG firma
        </p>
        <input type="file" accept="image/png" onChange={handleFirmaChange} />
      </div>

      {/* Visor PDF + área + preview firma */}
      {pdfUrl ? (
        <Document file={pdfUrl} onLoadSuccess={({ numPages }) => setTotalPages(numPages)}>
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="relative inline-block border shadow bg-white"
          >
            <Page pageNumber={currentPage} scale={1.5} renderTextLayer={false} />

            {selection && (
              <div
                className="absolute border-2 border-blue-400 bg-blue-200 bg-opacity-30"
                style={{
                  left:  selection.x,
                  top:   selection.y,
                  width: selection.width,
                  height:selection.height,
                  pointerEvents:'none'
                }}
              />
            )}

            {selection && firmaUrl && (
              <img
                src={firmaUrl}
                alt="Firma"
                style={{
                  position:'absolute',
                  left:  selection.x,
                  top:   selection.y,
                  width: selection.width,
                  height:selection.height,
                  pointerEvents:'none'
                }}
              />
            )}
          </div>
        </Document>
      ) : (
        <p className="text-gray-600">Sube un archivo PDF para comenzar</p>
      )}

      {/* Paginación */}
      {pdfUrl && totalPages > 1 && (
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded"
          >⬅</button>
          <span>Página {currentPage} de {totalPages}</span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded"
          >➡</button>
        </div>
      )}

      {/* Selección de tipo y botón */}
      {pdfUrl && firmaUrl && selection && !codeVerified && (
        <div className="mt-6 flex flex-col items-center">
          <div className="flex gap-6 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={firmType === 'simple'}
                onChange={() => setFirmType('simple')}
              />
              Firma simple
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={firmType === 'advanced'}
                onChange={() => setFirmType('advanced')}
              />
              Firma avanzada
            </label>
          </div>
          <button
            onClick={generarCodigo}
            disabled={!firmType}
            className="px-6 py-2 bg-green-600 text-white rounded"
          >
            Firmar Documento
          </button>
        </div>
      )}

      {/* Modal OTP */}
      {showCodeInput && (
        <div style={modalStyles}>
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-4">Verificación</h3>
            <p className="text-gray-700 mb-3">
              Se ha enviado un código de verificación a tu correo.
            </p>
            <input
              type="text"
              value={inputCode}
              onChange={e => setInputCode(e.target.value)}
              className="border p-2 w-full mb-4"
              placeholder="Ingresa el código"
            />
            <button
              onClick={verificarCodigo}
              className="px-4 py-2 bg-blue-600 text-white rounded w-full"
            >
              Verificar
            </button>
          </div>
        </div>
      )}

      {/* Descargar PDF firmado */}
      {signedPdfUrl && (
        <a
          href={signedPdfUrl}
          download="documento_firmado.pdf"
          className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded"
        >
          Descargar PDF Firmado
        </a>
      )}
    </div>
  );
};

export default PDFViewer;
