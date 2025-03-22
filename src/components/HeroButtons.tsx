"use client";

import { Button } from "@/components/ui/button"
import Link from "next/link";

interface HeroButtonsProps {
    learnMoreLabel: string;
    watchDemoLabel: string;
}

export default function HeroButtons({
    learnMoreLabel,
    watchDemoLabel,
}: HeroButtonsProps) {

    const handleLearnMoreClick = () => {
        window.location.href = `tel:+380997055969`;
    };


    return (
        <div className="flex flex-col gap-2 min-[400px]:flex-row pt-6">
            <Button size="lg" onClick={handleLearnMoreClick}>
                {learnMoreLabel}
            </Button>
            <Link href="#contact-form">
                <Button size="lg" variant="outline">
                    {watchDemoLabel}
                </Button>
            </Link>

        </div>
    );
}
