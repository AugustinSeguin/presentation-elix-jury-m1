import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import VideoPlayer from "./VideoPlayer"; // Assure-toi que le chemin est correct

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

function PDFViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const togglePDFViewer = () => {
    if (!showPDFViewer) {
      if (showVideo) {
        // peut etre changer le numéro de la page
        setPageNumber(7); // Affiche la page 7 si on vient de la vidéo
      }
      setShowPDFViewer(true);
      setShowVideo(false);
    } else {
      setShowPDFViewer(false);
    }
  };
  const toggleVideoViewer = () => {
    setShowVideo(!showVideo);
    setShowPDFViewer(false);
  };

  const handleVideoEnd = () => {
    // Passe à la page 7 quand la vidéo se termine
    setPageNumber(7);
    setShowVideo(false);
    setShowPDFViewer(true);
  };

  return (
    <div id="diapo">
      {showPDFViewer && (
        <div>
          <Document
            file="./diapo.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => console.error("Error loading PDF:", error)}
          >
            <Page pageNumber={pageNumber} width={1450} />
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
        </div>
      )}
      {showVideo && <VideoPlayer onEnd={handleVideoEnd} />}

      <br />
      <button className="button" onClick={togglePDFViewer}>
        PDF Viewer
      </button>
      <button onClick={toggleVideoViewer}>Video Viewer</button>
    </div>
  );
}

export default PDFViewer;
