// ─────────────────────────────────────────────────────────────
// pages/Blog.jsx
// Blog listing page with real-time search and category filtering.
// Fetches published blogs via useBlogs; client-side filtering
// covers search (title/excerpt) and category badge.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiCalendar, FiUser, FiEye, FiTag } from 'react-icons/fi'
import SEO from '../components/SEO'
import { useBlogs } from '../hooks/useBlog'
import { formatDate, truncate } from '../utils/helpers'

const ALL = 'All'

export default function Blog() {
  const { blogs, loading } = useBlogs(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(ALL)

  const categories = [ALL, ...new Set(blogs.map((b) => b.category).filter(Boolean))]

  const filtered = blogs.filter((b) => {
    const matchesSearch =
      !search ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt?.toLowerCase().includes(search.toLowerCase())
    const matchesCat = category === ALL || b.category === category
    return matchesSearch && matchesCat
  })

  return (
    <>
      <SEO
        title="Health Blog"
        description="Read expert health tips, medical guides, and patient stories from our specialist medical team at Sarvada Hospito Care."
      />

      {/* Hero */}
      <section className="page-hero text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container-max">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Health & Wellness Blog</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Expert medical insights, health tips, and patient success stories from our specialist team.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="container-max px-4 md:px-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles…"
              className="input-field pl-11"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles */}
      <section className="section-padding bg-section-gradient">
        <div className="container-max">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No articles found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.08 }}
                  className="card overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Cover */}
                  <div className="h-52 bg-gradient-to-br from-primary-100 to-accent-100 overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl">{post.category === 'Cardiology' ? '❤️' : post.category === 'Orthopedics' ? '🦴' : '🏥'}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    {post.category && (
                      <span className="badge bg-primary-50 text-primary-700 mb-3 inline-block">
                        <FiTag className="inline w-3 h-3 mr-1" />{post.category}
                      </span>
                    )}
                    <h2 className="font-heading font-bold text-navy-800 text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>

                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <FiUser className="w-3 h-3" /> {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiCalendar className="w-3 h-3" /> {formatDate(post.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiEye className="w-3 h-3" /> {post.views || 0}
                      </span>
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-primary-600 text-sm font-semibold hover:text-primary-800 transition-colors"
                    >
                      Read Full Article →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
