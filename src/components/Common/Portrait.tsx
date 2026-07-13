import { FaUser } from "react-icons/fa";

interface PortraitProps {

    src?: string | null;

    alt: string;

    size?: "sm" | "md" | "lg";

}

export default function Portrait({

    src,

    alt,

    size = "md",

}: PortraitProps) {

    const dimensions = {

        sm: {

            container: "h-14 w-14",

            icon: "text-2xl",

        },

        md: {

            container: "h-28 w-28",

            icon: "text-5xl",

        },

        lg: {

            container: "h-40 w-40",

            icon: "text-6xl",

        },

    };

    const current = dimensions[size];

    if (src) {

        return (

            <img
                src={src}
                alt={alt}
                className={`${current.container} rounded-full border-4 border-slate-100 object-cover`}
            />

        );

    }

    return (

        <div
            className={`${current.container} flex items-center justify-center rounded-full bg-slate-100 text-slate-500 ${current.icon}`}
        >

            <FaUser />

        </div>

    );

}