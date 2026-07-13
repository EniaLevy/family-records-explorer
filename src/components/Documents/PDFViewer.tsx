import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface PDFViewerProps {
    file: string;
}

export default function PDFViewer({
    file,
}: PDFViewerProps) {

    const [pages, setPages] = useState(0);

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-semibold">
                    Aperçu
                </h2>

                <span className="text-sm text-gray-500">

                    {pages} page{pages === 1 ? "" : "s"}

                </span>

            </div>

            <div className="overflow-auto rounded-xl border border-gray-200 bg-gray-100 p-6">

                <Document
                    file={file}
                    loading={<p>Chargement du document…</p>}
                    error={<p>Impossible de charger le document PDF.</p>}
                    onLoadSuccess={({ numPages }) =>
                        setPages(numPages)
                    }
                >
                    <Page
                        pageNumber={1}
                        width={700}
                    />
                </Document>

            </div>

        </div>

    );

}