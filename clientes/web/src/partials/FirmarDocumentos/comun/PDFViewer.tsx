import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument } from 'pdf-lib';
import workerSrc from 'pdfjs-dist/build/pdf.worker?url';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

const modalStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
};

const PDFViewer: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [firmaUrl, setFirmaUrl] = useState<string | null>(null);
  const [selection, setSelection] = useState<Area | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [showCodeInput, setShowCodeInput] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [codeVerified, setCodeVerified] = useState(false);
  const [signedPdfUrl, setSignedPdfUrl] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfUrl(URL.createObjectURL(file));
      setPdfFile(file);
      setCurrentPage(1);
      setSelection(null);
    } else {
      alert('Selecciona un archivo PDF válido');
    }
  };

  const handleFirmaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFirmaUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Selecciona una imagen PNG válida');
    }
  };
  
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

  const generarCodigo = () => {
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(codigo);
    alert(`Código enviado por correo: ${codigo}`);
    setShowCodeInput(true);
  };

  const verificarCodigo = () => {
    if (inputCode === generatedCode) {
      setCodeVerified(true);
      setShowCodeInput(false);
      firmarPdf();
    } else {
      alert('Código incorrecto');
    }
  };

  const firmarPdf = async () => {
    if (!pdfFile || !firmaUrl || !selection) return;

    const pdfBytes = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const firmaBytes = await fetch(firmaUrl).then((res) => res.arrayBuffer());
    const firmaImage = await pdfDoc.embedPng(firmaBytes);
    const page = pdfDoc.getPage(currentPage - 1);

    const pageWidth = page.getWidth();
    const pageHeight = page.getHeight();

    const canvas = containerRef.current?.querySelector('canvas') as HTMLCanvasElement | null;
    if (!canvas) return;

    const canvasRect = canvas.getBoundingClientRect();
    const containerRect = containerRef.current!.getBoundingClientRect();

    const offsetX = canvasRect.left - containerRect.left;
    const offsetY = canvasRect.top - containerRect.top;

    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;

    const scaleX = pageWidth / canvasWidth;
    const scaleY = pageHeight / canvasHeight;

    const adjX = selection.x - offsetX;
    const adjY = selection.y - offsetY;

    const imgX = adjX * scaleX;
    const imgY = pageHeight - (adjY + selection.height) * scaleY;
    const imgWidth = selection.width * scaleX;
    const imgHeight = selection.height * scaleY;

    page.drawImage(firmaImage, {
      x: imgX,
      y: imgY,
      width: imgWidth,
      height: imgHeight,
    });

    const pdfFinal = await pdfDoc.save();
    const blob = new Blob([pdfFinal], { type: 'application/pdf' });
    const finalUrl = URL.createObjectURL(blob);
    setSignedPdfUrl(finalUrl);
  };

  return (
    <div className="p-8 min-h-screen flex flex-col items-center bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Selecione archivo PDF para firmar</h2>

      <div className="mb-6 flex gap-4">
        <p className="mt-1 text-xs/5 text-gray-500">
          Aqui el Archivo PDF
        </p>
        <input type="file" accept="application/pdf" onChange={handlePdfChange} />
        <p className="mt-1 text-xs/5 text-gray-500">
          Aqui el Archivo PNG firma
        </p>
        <input type="file" accept="image/png" onChange={handleFirmaChange} />
      </div>

      {pdfUrl ? (
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="relative border shadow bg-white"
          style={{ width: 'fit-content', maxWidth: '90vw', height: 'auto' }}
        >
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => setTotalPages(numPages)}
            onLoadError={(error) =>
              console.error('Error al cargar PDF:', error.message)
            }
          >
            <Page
              pageNumber={currentPage}
              scale={1.5}
              renderTextLayer={false}
            />
          </Document>

          {selection && (
            <div
              className="absolute border-2 border-blue-400 bg-blue-200 bg-opacity-30"
              style={{
                left: selection.x,
                top: selection.y,
                width: selection.width,
                height: selection.height,
                pointerEvents: 'none',
              }}
            />
          )}

          {selection && firmaUrl && (
            <img
              src={firmaUrl}
              alt="Firma"
              style={{
                position: 'absolute',
                left: selection.x,
                top: selection.y,
                width: selection.width,
                height: selection.height,
                objectFit: 'contain',
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      ) : (
        <p className="text-gray-600">Sube un archivo PDF para comenzar</p>
      )}

      {pdfUrl && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={currentPage === 1}
          >
            ⬅ Anterior
          </button>
          <span className="text-black font-medium">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={currentPage === totalPages}
          >
            Siguiente ➡
          </button>
        </div>
      )}

      {pdfUrl && firmaUrl && selection && !codeVerified && (
        <div className="mt-6">
          <button
            onClick={generarCodigo}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Firmar Documento
          </button>
        </div>
      )}

      {showCodeInput && (
        <div style={modalStyles}>
          <div className="bg-white rounded-lg p-6 shadow-lg text-center w-[90%] max-w-sm">
            <h3 className="text-lg font-semibold mb-4 text-black">Verificación</h3>
            <p className="text-gray-700 mb-3">
              Se ha enviado un código de verificación a tu correo.
            </p>
            <input
              type="text"
              placeholder="Ingresa el código"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="p-2 border rounded w-full mb-4"
            />
            <button
              onClick={verificarCodigo}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
            >
              Verificar código
            </button>
          </div>
        </div>
      )}

      {signedPdfUrl && (
        <div className="flex justify-center mt-6">
          <a
            href={signedPdfUrl}
            download="documento_firmado.pdf"
            className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            Descargar PDF Firmado
          </a>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
