"use client"
import React, { useState } from 'react'
import Cards from '../component/cards'
import Skeleton from '../component/Skeleton'
import { FaFilter, FaSearch, FaHistory } from 'react-icons/fa'

const CATEGORIES = ['All', 'New ForkLift', 'Rental ForkLift', 'Pre Owned ForkLift']

export default function ShopContent({ initialData }) {
    const [result] = useState(initialData || []);
    const [selected, setSelected] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredResult = result.filter(item => {
        const matchesCategory = selected === 'All' || item.metadata?.selected === selected;
        const matchesSearch = !searchQuery ||
            item.metadata?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.metadata?.description?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            {/* Filters & Search */}
            <div className="glass-strong p-4 rounded-2xl mb-12 flex flex-wrap items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 text-[#5ba3b5] font-bold text-sm uppercase mr-2">
                        <FaFilter className="text-xs" /> Filter:
                    </div>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelected(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                selected === cat
                                    ? 'bg-[#5ba3b5] text-white shadow-lg shadow-[#5ba3b5]/20'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="relative flex-1 min-w-[260px]">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by model or description..."
                        className="w-full pl-12 pr-4 py-3"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search inventory"
                    />
                </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-slate-400 font-medium mb-6">
                {filteredResult.length} {filteredResult.length === 1 ? 'unit' : 'units'} found
                {selected !== 'All' && ` in ${selected}`}
                {searchQuery && ` matching "${searchQuery}"`}
            </p>

            {/* Results Grid */}
            {filteredResult.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                    {filteredResult.map(e => (
                        <Cards
                            key={e.filename}
                            res={e.filename}
                            price={e.metadata?.price}
                            title={e.metadata?.title}
                            desc={e.metadata?.description ?? ''}
                            selected={e.metadata?.selected}
                        />
                    ))}
                </div>
            ) : (
                <div className="glass-strong p-16 text-center max-w-2xl mx-auto rounded-[32px]">
                    <FaHistory className="text-5xl text-slate-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">No matching units found</h3>
                    <p className="text-slate-500 mb-8">Try adjusting your filters or search query.</p>
                    <button
                        onClick={() => { setSelected('All'); setSearchQuery(''); }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#7ab8c7] transition-all duration-300"
                    >
                        Clear All Filters
                    </button>
                </div>
            )}
        </>
    )
}
