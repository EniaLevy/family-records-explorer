import { FaInfoCircle } from "react-icons/fa";

import Tooltip from "./Tooltip";

interface ReferenceOnlyBadgeProps {

    compact?: boolean;

}

export default function ReferenceOnlyBadge({

    compact = false,

}: ReferenceOnlyBadgeProps) {

    return (

        <Tooltip

            content={

                <>

                    <div className="mb-2 font-semibold">

                        Référence uniquement

                    </div>

                    <p>

                        Cette personne est mentionnée dans les archives
                        mais ne possède pas encore de dossier individuel.

                    </p>

                    <p className="mt-2">

                        Elle apparaît dans les documents et l'arbre
                        familial, mais aucun profil détaillé n'a encore
                        été créé.

                    </p>

                </>

            }

        >

            <span

                className={`inline-flex items-center gap-1 rounded-full border border-slate-300 bg-slate-100 text-slate-600 ${
                    compact
                        ? "px-2 py-0.5 text-xs"
                        : "px-3 py-1 text-sm"
                }`}

            >

                <FaInfoCircle className="shrink-0" />

                Référence uniquement

            </span>

        </Tooltip>

    );

}