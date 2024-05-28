import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

export const findContentBySlug = async (contentType, slug) => {
  if (!slug) return null;

  try {
    const readFile = fs.readFileSync(join('src/content/' + contentType, `${slug}.md`), 'utf-8');
    const { data: frontmatter, content } = matter(readFile);
    return {
      slug,
      ...frontmatter,
      content,
    };
  } catch (e) {}

  return null;
};

const load = (contentType) => {
  const files = fs.readdirSync('src/content/' + contentType);

  const content = Promise.all(
    files
      .filter((filename) => filename.endsWith('.md'))
      .map(async (filename) => {
        const slug = filename.replace('.md', '');
        return await findContentBySlug(contentType, slug);
      }),
  );

  return content;
};

let _content;

export const fetchContent = async (contentType) => {
  _content = _content || load(contentType);

  return await _content;
};

export const findLatestContent = async (contentType, count) => {
  const _count = count || 4;
  const posts = await fetchContent(contentType);

  return posts ? posts.slice(_count * -1) : [];
};

export const findContent = async (contentType, count) => {
  const _count = count || 4;
  const content = await fetchContent(contentType);

  return content ? content.slice(_count * -1) : [];
};

export const findContentByIds = async (ids) => {
  if (!Array.isArray(ids)) return [];

  const content = await fetchContent();

  return ids.reduce(function (r, id) {
    content.some(function (item) {
      return id === item.id && r.push(item);
    });
    return r;
  }, []);
};
