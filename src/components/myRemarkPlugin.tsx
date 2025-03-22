/**
 * @import {} from 'mdast-util-directive'
 * @import {} from 'mdast-util-to-hast'
 * @import {Root} from 'mdast'
 * @import {VFile} from 'vfile'
 */

import { visit } from 'unist-util-visit'

export function myRemarkPlugin() {
    return (tree, file) => {
        visit(tree, (node) => {
            // Only handle directive nodes
            if (
                node.type === 'containerDirective' ||
                node.type === 'leafDirective' ||
                node.type === 'textDirective'
            ) {
                // 1) Handle `::youtube` directive
                if (node.name === 'youtube') {
                    const data = node.data || (node.data = {})
                    const attributes = node.attributes || {}
                    const id = attributes.id

                    if (node.type === 'textDirective') {
                        file.fail(
                            'Unexpected `:youtube` text directive, use two colons for a leaf directive',
                            node
                        )
                    }

                    if (!id) {
                        file.fail('Unexpected missing `id` on `youtube` directive', node)
                    }

                    data.hName = 'iframe'
                    data.hProperties = {
                        src: 'https://www.youtube.com/embed/' + id,
                        width: 400,
                        height: 300,
                        frameBorder: 0,
                        allow: 'picture-in-picture',
                        allowFullScreen: true
                    }
                }

                // 2) Handle `::mysection` directive
                else if (node.name === 'mysection') {
                    // If you want to produce a simple HTML structure (no React components):
                    const data = node.data || (node.data = {})

                    // Turn the directive into a <section> with classes
                    data.hName = 'section'
                    data.hProperties = {
                        className:
                            'w-full py-12 md:py-24 lg:py-24 bg-gradient-to-r from-primary/20 to-transparent text-white text-center font-bold text-xl mb-4'
                    }

                    // Optionally overwrite child content:
                    // (Only applies if this is a *container* directive with children.)
                    node.children = [
                        {
                            type: 'element',
                            tagName: 'h2',
                            properties: {
                                // Tailwind: center, bold, xl text, margin bottom
                                className: 'text-center font-bold text-xl mb-4'
                            },
                            children: [
                                {
                                    type: 'text',
                                    value: 'Бесплатная консультация!',
                                    properties: {
                                        // Tailwind: center, bold, xl text, margin bottom
                                        className: 'text-center font-bold text-xl mb-4'
                                    },
                                }
                            ]
                        },
                        {
                            type: 'element',
                            tagName: 'p',
                            properties: {
                                // Tailwind: center, bold, xl text, margin bottom
                                className: 'text-center font-bold text-xl mb-3'
                            },
                            children: [
                                {
                                    type: 'text',
                                    value: '+38 (099) 705-59-69'
                                }
                            ]
                        },
                        {
                            type: 'element',
                            tagName: 'p',
                            properties: {
                                className: 'text-center font-bold text-xl'
                            },
                            children: [
                                {
                                    type: 'text',
                                    value: 'Мы заботимся о наших постояльцах и наблюдаем за ними.'
                                }
                            ]
                        }
                    ]
                }
                else if (node.name === 'card') {
                    const data = node.data || (node.data = {})
                    data.hName = 'div'
                    // Add classes or inline style as you prefer:
                    data.hProperties = { className: 'p-4 mb-4 border rounded-xl shadow-md' }
                    // We do *not* overwrite children here so that the markdown headings, paragraphs, etc. remain intact
                    // The node’s children (heading, text) get wrapped inside the div.
                }
                else if (node.name === 'plancards') {
                    // We'll produce <plancards> in the final HTML
                    const data = node.data || (node.data = {})
                    data.hName = 'plancards'
                    // If you want to preserve the directive's children, do nothing
                    // If you want to remove them, do: node.children = []
                    // If you want to pass attributes, you could do data.hProperties = { ... }
                }


            }

        })
    }
}
