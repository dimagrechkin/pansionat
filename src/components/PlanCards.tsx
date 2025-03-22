
// ^ If you're on Next.js app router (app directory) and need client-side interactivity

import { FC } from "react"
import { Check } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { getDictionary } from '@/i18n/get-dictionary'

import { Button } from "@/components/ui/button"

// If you don't need dynamic data (like from an API or i18n dictionary),
// you can hard-code your plan data here.
const lang = 'uk'



/**
 * This component has no props. It defines everything internally:
 * - plan data
 * - CTA labels
 * - highlight logic
 */
export const PlanCards: FC = async () => {
    const dict = await getDictionary(lang)
    const { pricing } = dict

    // CTA copy defined here
    const plans = [
        pricing.plans.free,
        pricing.plans.pro,
        pricing.plans.team
    ]

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-8">
            {plans.map((plan) => (
                <Card key={plan.name} className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <div className="mt-4">
                            <span className="text-4xl font-bold">{plan.price}</span>
                            {plan.price !== pricing.plans.free.price &&
                                <span className="text-sm text-muted-foreground">/mo</span>
                            }
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <ul className="space-y-2">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            variant={"default"}
                        >
                            {plan.price === pricing.plans.free.price ?
                                pricing.cta.free : pricing.cta.paid}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
