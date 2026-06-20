// ─────────────────────────────────────────────────────────────
// pages/BlogPost.jsx
// Individual blog post page at /blog/:slug.
// Fetches post by slug (also increments the view counter).
// Renders title, author, date, view count, category,
// full HTML content, and a share button.
// ─────────────────────────────────────────────────────────────

import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCalendar, FiUser, FiEye, FiTag, FiArrowLeft, FiShare2 } from 'react-icons/fi'
import SEO from '../components/SEO'
import { useBlogPost } from '../hooks/useBlog'
import { formatDate } from '../utils/helpers'
import { siteData } from '../data/siteData'
import toast from 'react-hot-toast'

export default function BlogPost() {
  const { slug } = useParams()
  const { post, loading, error } = useBlogPost(slug)

  const share = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-xl">Article not found.</p>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    )
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.image}
        type="article"
        keywords={post.tags}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          image: post.image || `${siteData.url}${siteData.seo.ogImage}`,
          author: { '@type': 'Person', name: post.author },
          publisher: {
            '@type': 'Organization',
            name: siteData.name,
            logo: { '@type': 'ImageObject', url: `${siteData.url}/favicon.png` },
          },
          datePublished: post.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteData.url}/blog/${post.slug}` },
        }}
      />

      {/* Hero cover */}
      <div className="h-72 md:h-96 bg-gradient-to-br from-navy-900 to-primary-700 relative overflow-hidden">
        {post.image && (
          <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-40" />
        )}
        <div className="absolute inset-0 flex items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container-max px-4 md:px-8 pb-10"
          >
            {post.category && (
              <span className="badge bg-primary-500 text-white mb-3 inline-block">{post.category}</span>
            )}
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white max-w-3xl">{post.title}</h1>
          </motion.div>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-4 gap-10">
            {/* Article */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3"
            >
              <Link to="/blog" className="inline-flex items-center gap-2 text-primary-600 text-sm font-medium mb-6 hover:gap-3 transition-all">
                <FiArrowLeft /> Back to Blog
              </Link>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
                <span className="flex items-center gap-1.5">
                  <FiUser className="w-4 h-4 text-primary-500" /> {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiCalendar className="w-4 h-4 text-primary-500" /> {formatDate(post.createdAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiEye className="w-4 h-4 text-primary-500" /> {post.views} views
                </span>
                <button
                  onClick={share}
                  className="flex items-center gap-1.5 text-primary-600 hover:text-primary-800 font-medium ml-auto"
                >
                  <FiShare2 className="w-4 h-4" /> Share
                </button>
              </div>

              {/* Content */}
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 flex-wrap">
                    <FiTag className="w-4 h-4 text-gray-400" />
                    {post.tags.map((tag) => (
                      <span key={tag} className="badge bg-gray-100 text-gray-600 text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              {/* Author card */}
              <div className="card p-6 mb-6 sticky top-24">
                <h4 className="font-heading font-semibold text-navy-800 mb-4">About the Author</h4>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-800 text-sm">{post.author}</p>
                    <p className="text-xs text-primary-600">{post.category} Specialist</p>
                  </div>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">
                  surgical physician at {siteData.name} specialising in {post.category}.
                </p>
                <Link to="/book-appointment" className="btn-primary text-sm py-2.5 w-full justify-center">
                  Book Consultation
                </Link>
              </div>

              <div className="card p-6">
                <h4 className="font-heading font-semibold text-navy-800 mb-3">Need Medical Help?</h4>
                <p className="text-gray-500 text-xs mb-4">Our specialists are available 6 days a week.</p>
                <Link to="/contact" className="btn-secondary text-sm py-2.5 w-full justify-center">
                  Contact Us
                </Link>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  )
}
