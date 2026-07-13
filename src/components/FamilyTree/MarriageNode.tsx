import { Handle, Position } from "reactflow";

export default function MarriageNode() {

    return (

        <>

            <Handle

                type="target"

                position={Position.Top}

                style={{ opacity: 0 }}

            />

            <div className="flex h-3 w-8 items-center justify-center">

                <div className="h-0.5 w-full rounded-full bg-slate-400" />

            </div>

            <Handle

                type="source"

                position={Position.Bottom}

                style={{ opacity: 0 }}

            />

        </>

    );

}