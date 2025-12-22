import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import BlogDetail from '../templates/BlogDetail';
import postsData from '../data/posts.json';

const BlogPost = () => {
    const { slug } = useParams();
    const posts = Array.isArray(postsData) ? postsData : [];
    const post = posts.find(p => p.slug === slug);

    if (!post) {
        // Or render a 404
        return <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">Article not found. <a href="/blog" className="ml-2 text-brand-purple underline">Return to Blog</a></div>;
    }

    return <BlogDetail post={post} allPosts={posts} />;
};

export default BlogPost;
