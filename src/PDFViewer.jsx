import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

function PDFViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const togglePDFViewer = () => {
    setShowPDFViewer(!showPDFViewer);
  };

  return (
    <div id="diapo">
      {showPDFViewer && (
        <>
          <Document
            file="./diapo.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => console.error("Error loading PDF:", error)}
          >
            {[pageNumber - 1, pageNumber, pageNumber + 1].map((page) => (
              <div key={page} style={{ display: page === pageNumber ? 'block' : 'none' }}>
                <Page pageNumber={page} width={1450} />
              </div>
            ))}
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <input
            id="pageNumberInput"
            type="number"
            min={1}
            max={numPages || 1}
            value={pageNumber}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= 1 && val <= (numPages || 1)) {
                setPageNumber(val);
              }
            }}
            style={{ width: "60px", marginRight: "10px" }}
            aria-label="Numéro de page"
          />
          <button
            className="button"
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <button
            className="button"
            onClick={() =>
              setPageNumber((prev) =>
                prev + 1 > (numPages || 1) ? numPages : prev + 1
              )
            }
          >
            Next
          </button>
        </>
      )}
      <button onClick={togglePDFViewer}>PDF Viewer</button>
    </div>
  );
}

export default PDFViewer;
