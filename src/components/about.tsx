import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Link from "next/link";

export default async function About({
    lang,
}: {
    lang: Locale;
}) {
    const dict = await getDictionary(lang);

    const cityLinks = {
        'Киев': {
            href: `/${lang}/blog/kyiv`,
            text: dict.about.section.links.kiev
        },
        'Києві': {
            href: `/${lang}/blog/kyiv`,
            text: 'Києві'
        },
        'Житомирі': {
            href: `/${lang}/blog/zhitomyr`,
            text: dict.about.section.links.zhitomir
        },
        'Житомир': {
             href: `/${lang}/blog/zhytomyr`,
             text: dict.about.section.links.zhitomir
         },
        'Львов': {
            href: `/${lang}/blog/lviv`,
            text: dict.about.section.links.lviv
        },
        'Львові': {
            href: `/${lang}/blog/lviv`,
            text: dict.about.section.links.lviv
        },
        'Хмельницкий': {
            href: `/${lang}/blog/khmelnytskyi`,
            text: dict.about.section.links.khmelnitskiy
        },
        'Хмельницькому': {
            href: `/${lang}/blog/khmelnytskyi`,
            text: dict.about.section.links.khmelnitskiy
        },
        'Тернополь': {
            href: `/${lang}/blog/ternopil`,
            text: dict.about.section.links.ternopil
        },
        'Тернополі': {
            href: `/${lang}/blog/ternopil`,
            text: dict.about.section.links.ternopil
        }
    };

    const renderParagraphWithLinks = (paragraph: string) => {
        if (!paragraph.includes('Киев') && !paragraph.includes('Києві')) return paragraph;

        const parts = paragraph.split(/(Киев|Житомир|Львов|Хмельницкий|Тернополь|Києві|Житомирі|Львові|Тернополі|Хмельницькому)/g);
        return parts.map((part, index) => {
            const cityLink = cityLinks[part as keyof typeof cityLinks];
            if (cityLink) {
                return (
                    <Link
                        key={index}
                        href={cityLink.href}
                        className="text-blue-400 hover:text-blue-600"
                    >
                        {cityLink.text}
                    </Link>
                );
            }
            return part;
        });
    };

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
                                    {renderParagraphWithLinks(paragraph)}
                                </p>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
}
