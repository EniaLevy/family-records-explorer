import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { getAssetUrl } from "../../utils/assets";

pdfjs.GlobalWorkerOptions.workerSrc = getAssetUrl("/pdf.worker.min.mjs");

interface PDFViewerProps {

    file: string;

    originalUrl: string;

}

export default function PDFViewer({

    file,

    originalUrl,

}: PDFViewerProps) {

    const [pages, setPages] = useState(0);

    const [width, setWidth] = useState(700);

    const [loadedPages, setLoadedPages] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        function updateWidth() {

            if (!containerRef.current) return;

            setWidth(

                Math.min(

                    containerRef.current.clientWidth - 24,

                    1000

                )

            );

        }

        updateWidth();

        window.addEventListener(

            "resize",

            updateWidth

        );

        return () =>

            window.removeEventListener(

                "resize",

                updateWidth

            );

    }, []);

    useEffect(() => {

        setLoadedPages(false);

        setPages(0);

        containerRef.current?.scrollTo({

            top: 0,

            behavior: "auto",

        });

    }, [file]);

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">

            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h2 className="text-xl font-semibold md:text-2xl">

                        Aperçu

                    </h2>

                    <div className="mt-1 text-sm text-gray-500">

                        {pages} page{pages === 1 ? "" : "s"}

                    </div>

                    {pages > 1 && (

                        <div className="text-xs text-gray-400">

                            Faites défiler pour voir toutes les pages

                        </div>

                    )}

                </div>

                <div className="flex flex-wrap gap-3">

                    <a

                        href={originalUrl}

                        target="_blank"

                        rel="noopener noreferrer"

                        className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"

                    >

                        Ouvrir l'original

                    </a>

                    <a

                        href={originalUrl}

                        download

                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"

                    >

                        Télécharger

                    </a>

                </div>

            </div>

            <div

                ref={containerRef}

                className="overflow-auto rounded-xl border border-gray-200 bg-gray-100 p-2 md:p-6"

            >

                <Document

                    file={file}

                    loading={

                        <div className="py-16 text-center text-gray-500">

                            Chargement du document…

                        </div>

                    }

                    error={

                        <div className="py-16 text-center text-red-600">

                            Impossible de charger le document PDF.

                        </div>

                    }

                    onLoadSuccess={({ numPages }) => {

                        setPages(numPages);

                        setLoadedPages(true);

                    }}

                >

                    {loadedPages &&

                        Array.from(

                            { length: pages },

                            (_, index) => (

                                <div

                                    key={index}

                                    className="mb-10 last:mb-0 flex justify-center"

                                >

                                    <Page

                                        pageNumber={index + 1}

                                        width={width}

                                        className="shadow-xl"

                                    />

                                </div>

                            )

                        )

                    }

                </Document>

            </div>

        </div>

    );

}