import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Link from "next/link";

export default async function About({
    lang,
}: {
    lang: Locale;
}) {
    const dict = await getDictionary(lang);

    return (
        <section className="w-full py-12 md:py-24 lg:py-12">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold">
                            {dict.about.title}
                        </h1>
                        <div className="flex justify-center space-x-2">
                            <div
                                className={`h-0.5 w-${dict.about.divider.lineWidth} bg-blue-200 mt-3`}
                            />
                            <div className="text-blue-200">{dict.about.divider.line}</div>
                            <div
                                className={`h-0.5 w-${dict.about.divider.lineWidth} bg-blue-200 mt-3`}
                            />
                        </div>
                    </div>
                    {/* About Section */}
                    <section className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8">
                            {dict.about.section.title}
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-600">
                            {dict.about.section.description.map((paragraph: string, idx: number) => (
                                <p key={idx}>
                                    {paragraph.includes("Днепр") ? (
                                        <>
                                            {paragraph.split("Днепр")[0]}
                                            <Link
                                                href="#"
                                                className="text-blue-400 hover:text-blue-600"
                                            >
                                                {dict.about.section.links.dnipro}
                                            </Link>
                                            {paragraph
                                                .split("Днепр")[1]
                                                .split("Запорожье")[0]}
                                            <Link
                                                href="#"
                                                className="text-blue-400 hover:text-blue-600"
                                            >
                                                {dict.about.section.links.zaporizhzhia}
                                            </Link>
                                            {paragraph.split("Запорожье")[1]}
                                        </>
                                    ) : (
                                        paragraph
                                    )}
                                </p>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
}
