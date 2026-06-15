import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { useBlogs } from '../../hooks/useBlog'
import { formatDate } from '../../utils/helpers'

const FALLBACK_POSTS = [
  {
    id: 'b1',
    title: 'Laparoscopic Surgery: What You Need to Know',
    excerpt: 'Learn about the benefits of minimally invasive surgery and how it can help you recover faster than traditional open surgery.',
    date: 'OCTOBER 19, 2026',
    image: '/gallery/hospital-1.jpg'
  },
  {
    id: 'b2',
    title: 'Kidney Stones: When Do You Need Surgery?',
    excerpt: 'Discover the different treatment options available for kidney stones and when surgical intervention becomes necessary.',
    date: 'NOVEMBER 05, 2026',
    image: '/gallery/hospital-2.jpg'
  },
  {
    id: 'b3',
    title: 'Jaundice: When Is It a Surgical Emergency?',
    excerpt: 'Understand the difference between medical and surgical jaundice, and when you should seek immediate help.',
    date: 'DECEMBER 12, 2026',
    image: '/gallery/hospital-3.jpg'
  },
]

export default function BlogPreview() {
  const { blogs, loading } = useBlogs()
  const displayed = (blogs.length >= 3 ? blogs : FALLBACK_POSTS).slice(0, 3)

  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="container-max px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-14">
          <h2 className="font-heading font-black text-navy-800 text-3xl md:text-4xl mb-4">
            Latest News & Blog
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl leading-relaxed">
            In this section you can learn more about our latest medical breakthroughs, healthcare tips, and news from our clinical team to help you live a healthier life.
          </p>
        </div>

        {/* Blog Grid */}
        {loading ? (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="w-full h-56 bg-gray-200 rounded mb-4" />
                <div className="w-32 h-4 bg-gray-200 rounded mb-4" />
                <div className="w-48 h-6 bg-gray-200 rounded mb-2" />
                <div className="w-full h-16 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayed.map((post) => (
              <div key={post.id} className="group flex flex-col bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <Link to={`/blog/${post.id}`} className="overflow-hidden relative block h-56">
                  <img 
                    src={post.image || post.coverImage || '/gallery/hospital-1.jpg'} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="bg-primary-600 text-white text-[10px] font-bold px-4 py-2 uppercase tracking-widest self-start -mt-4 relative z-10 ml-6">
                  {post.date || formatDate(post.createdAt)}
                </div>
                <div className="pt-6 pb-8 px-6 flex-1 flex flex-col">
                  <h3 className="font-heading font-bold text-navy-800 text-lg mb-3 hover:text-primary-600 transition-colors leading-snug">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                    {post.excerpt || post.summary}
                  </p>
                  <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-primary-600 text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all">
                    LEARN MORE <FiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
