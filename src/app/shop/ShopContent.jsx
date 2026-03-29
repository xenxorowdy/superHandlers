"use client"
import React, { useState, useMemo } from 'react'
import Cards from '../component/cards'
import { FaSearch, FaTimes, FaSortAmountDown } from 'react-icons/fa'

const CATEGORIES = [
  { key: 'All',               label: 'All' },
  { key: 'New ForkLift',      label: 'New' },
  { key: 'Rental ForkLift',   label: 'Rental' },
  { key: 'Pre Owned ForkLift',label: 'Pre-Owned' },
]

const SORT_OPTIONS = [
  { key: 'newest',     label: 'Newest First' },
  { key: 'price-asc',  label: 'Price: Low → High' },
  { key: 'price-desc', label: 'Price: High → Low' },
]
const CATEGORY_COLORS = {
    'New ForkLift':       { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'New' },
    'Rental ForkLift':    { bg: 'bg-blue-100',    text: 'text-blue-700',    label: 'Rental' },
    'Pre Owned ForkLift': { bg: 'bg-amber-100',   text: 'text-amber-700',   label: 'Pre-Owned' },
  }

export default function ShopContent({ initialData }) {
    const [selected, setSelected] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [sort, setSort] = useState('newest')

    const counts = useMemo(() => {
        const c = { All: initialData.length }
        CATEGORIES.slice(1).forEach(cat => {
            c[cat.key] = initialData.filter(i => i.metadata?.selected === cat.key).length
        })
        return c
    }, [initialData])

    const filteredResult = useMemo(() => {
        let list = initialData.filter(item => {
            const cat = CATEGORY_COLORS[item.metadata?.selected]
            if (!cat) {
                return false;
            }
            const matchesCat = selected === 'All' || item.metadata?.selected === selected
            const q = searchQuery.toLowerCase()
            const matchesSearch = !q ||
                item.metadata?.title?.toLowerCase().includes(q) ||
                item.metadata?.description?.toLowerCase().includes(q)
            return matchesCat && matchesSearch
        })

        if (sort === 'price-asc') {
            list = [...list].sort((a, b) => Number(a.metadata?.price || 0) - Number(b.metadata?.price || 0))
        } else if (sort === 'price-desc') {
            list = [...list].sort((a, b) => Number(b.metadata?.price || 0) - Number(a.metadata?.price || 0))
        }
        // 'newest' preserves DB order (already sorted by uploadDate desc)

        return list
    }, [initialData, selected, searchQuery, sort])
    const resultsCount = filteredResult.length

    const clearSearch = () => setSearchQuery('')

    return (
        <section>
            {/* Filter bar */}
            <div className="sticky top-[76px] z-30 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm mb-8 p-3 flex flex-wrap items-center gap-3">

                {/* Category tabs */}
                <div className="flex items-center gap-2 flex-wrap flex-1">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => setSelected(cat.key)}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                                selected === cat.key
                                    ? 'bg-[#5ba3b5] text-white shadow-md shadow-[#5ba3b5]/20'
                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                            }`}
                        >
                            {cat.label}
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                                selected === cat.key ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
                            }`}>
                                {counts[cat.key]}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative min-w-[220px] flex-1 max-w-xs">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search model or description…"
                        className="w-full pl-9 pr-8 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#5ba3b5] focus:outline-none focus:ring-2 focus:ring-[#5ba3b5]/20 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search inventory"
                    />
                    {searchQuery && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            aria-label="Clear search"
                        >
                            <FaTimes size={12} />
                        </button>
                    )}
                </div>

                {/* Sort */}
                <div className="relative">
                    <FaSortAmountDown className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none" />
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="pl-8 pr-8 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-semibold focus:border-[#5ba3b5] focus:outline-none focus:ring-2 focus:ring-[#5ba3b5]/20 transition-all appearance-none cursor-pointer"
                        aria-label="Sort listings"
                    >
                        {SORT_OPTIONS.map(o => (
                            <option key={o.key} value={o.key}>{o.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-slate-400 font-medium mb-6">
                <span className="text-slate-700 font-black">{resultsCount}</span> {resultsCount === 1 ? 'unit' : 'units'} found
                {selected !== 'All' && <> in <span className="text-[#5ba3b5] font-bold">{CATEGORIES.find(c => c.key === selected)?.label}</span></>}
                {searchQuery && <> matching &ldquo;<span className="text-slate-600 font-semibold">{searchQuery}</span>&rdquo;</>}
            </p>

            {/* Grid */}
            {resultsCount > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredResult.map(e => (
                        <Cards
                            key={e.filename}
                            res={e.filename}
                            price={e.metadata?.price}
                            title={e.metadata?.title}
                            desc={e.metadata?.description ?? ''}
                            selected={e.metadata?.selected}
                            uploadDate={e.uploadDate}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-24 text-center max-w-md mx-auto">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                        <FaSearch className="text-slate-300 text-xl" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">No units found</h3>
                    <p className="text-slate-500 mb-6 text-sm">Try a different category or clear the search.</p>
                    <button
                        onClick={() => { setSelected('All'); setSearchQuery('') }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#4a92a4] transition-colors text-sm"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </section>
    )
}
