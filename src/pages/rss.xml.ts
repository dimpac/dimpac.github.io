import rss from '@astrojs/rss';
import { SITE } from '../config';
import { getVisiblePosts } from '../utils/posts';

export async function GET(context: { site: URL }) {
  const posts = await getVisiblePosts();

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: '<language>en</language>',
  });
}
