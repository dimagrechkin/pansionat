import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {unified} from 'unified'
import remarkRehype from 'remark-rehype'
import remarkParse from 'remark-parse'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug'

const postsDirectory = path.join(process.cwd(), 'src/posts')

export async function getPost(slug: string, lang: string) {
  const fullPath = path.join(postsDirectory, `${slug}.${lang}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(fileContents)

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    contentHtml,
    content,
    ...data,
  }
}

export async function getAllPosts(lang: string): Promise<{ slug: string }[]> {
  // Path to the posts directory
  const postsDir = path.join(process.cwd(), 'src/posts');

  // Read all files in the directory
  const files = fs.readdirSync(postsDir);

  // Filter files that match the current language
  const posts = files
    .filter((file) => file.endsWith(`.${lang}.md`)) // Match files with the given language
    .map((file) => ({
      slug: file.replace(`.${lang}.md`, ''), // Extract slug by removing language and extension
    }));

  return posts; // Return an array like [{ slug: 'my-post' }, { slug: 'another-post' }]
}
