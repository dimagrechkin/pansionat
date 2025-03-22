import { Home, Heart } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/config"


export default async function Reason({
    lang
}: {
    lang: Locale
}) {
    const dict = await getDictionary(lang)

    return (
        <section className="w-full">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">

                    <div className="max-w-2xl mx-auto p-4">
                        <h2 className="text-2xl font-bold text-center mb-8">
                            {dict.reason.title}
                        </h2>
                        <div className="space-y-4">
                            {dict.reason.reasons.map((reason, index) => (
                                <Card key={index}>
                                    <CardContent className="flex p-6 flex-col items-center">
                                        <div className="items-center mb-4">
                                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                                {index === 0 ? (
                                                    <Heart className="w-6 h-6 text-white" />
                                                ) : (
                                                    <Home className="w-6 h-6 text-white" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                                            <p className="text-gray-600">
                                                {reason.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
