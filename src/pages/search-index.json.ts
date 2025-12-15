import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  
  const searchIndex = posts.map((post) => {
    const slug = post.data.slug || post.slug;
    
    return {
      title: post.data.title,
      description: post.data.description || '',
      url: `/${slug}/`,
      pubDate: post.data.pubDate.toISOString(),
      tags: post.data.tags || [],
    };
  });
  
  return new Response(JSON.stringify(searchIndex), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
