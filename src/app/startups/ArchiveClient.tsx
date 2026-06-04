"use client";

import { useState, useMemo } from "react";
import { StartupCard } from "@/components/startup/StartupCard";
import { Startup } from "@/types/database";
import styles from "./page.module.css";

interface Props {
  allStartups: Startup[];
}

export default function ArchiveClient({ allStartups }: Props) {
  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [capitalFilter, setCapitalFilter] = useState("All");
  const [reasonFilter, setReasonFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const validCategories = allStartups.map(s => s.primary_category).filter((c): c is NonNullable<typeof c> => c !== null);
  const categories = ["All", ...Array.from(new Set(validCategories))].sort();

  const validReasons = allStartups.map(s => s.primary_failure_reason).filter((c): c is NonNullable<typeof c> => c !== null);
  const failureReasons = ["All", ...Array.from(new Set(validReasons))].sort();

  const filteredAndSortedStartups = useMemo(() => {
    let result = [...allStartups];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(query) || 
        (s.one_line_summary?.toLowerCase().includes(query) ?? false) ||
        (s.primary_category?.toLowerCase().includes(query) ?? false)
      );
    }

    if (categoryFilter !== "All") {
      result = result.filter(s => s.primary_category === categoryFilter);
    }

    if (reasonFilter !== "All") {
      result = result.filter(s => s.primary_failure_reason === reasonFilter);
    }

    if (capitalFilter !== "All") {
      result = result.filter(s => {
        const raised = s.total_raised_usd;
        if (capitalFilter === "< $1M") return raised < 1000000;
        if (capitalFilter === "$1M - $10M") return raised >= 1000000 && raised < 10000000;
        if (capitalFilter === "$10M - $50M") return raised >= 10000000 && raised < 50000000;
        if (capitalFilter === "> $50M") return raised >= 50000000;
        return true;
      });
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "newest": return (b.shut_down_year || 0) - (a.shut_down_year || 0);
        case "oldest": return (a.shut_down_year || 0) - (b.shut_down_year || 0);
        case "funding-high": return b.total_raised_usd - a.total_raised_usd;
        case "funding-low": return a.total_raised_usd - b.total_raised_usd;
        default: return 0;
      }
    });

    return result;
  }, [allStartups, searchQuery, categoryFilter, reasonFilter, capitalFilter, sortBy]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>The Archive</h1>
        <p className={styles.subtitle}>
          A complete record of {allStartups.length} failed AI startups, the billions lost, and the lessons left behind.
        </p>
      </header>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search startups, categories, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.input}
          />
        </div>
        
        <div className={styles.filters}>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={styles.select}>
            <option value="All">All Categories</option>
            {categories.filter(c => c !== "All").map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select value={reasonFilter} onChange={(e) => setReasonFilter(e.target.value)} className={styles.select}>
            <option value="All">All Failure Reasons</option>
            {failureReasons.filter(r => r !== "All").map(reason => <option key={reason} value={reason}>{reason}</option>)}
          </select>

          <select value={capitalFilter} onChange={(e) => setCapitalFilter(e.target.value)} className={styles.select}>
            <option value="All">All Funding Levels</option>
            <option value="< $1M">Less than $1M</option>
            <option value="$1M - $10M">$1M to $10M</option>
            <option value="$10M - $50M">$10M to $50M</option>
            <option value="> $50M">More than $50M</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.select}>
            <option value="newest">Newest Deaths First</option>
            <option value="oldest">Oldest Deaths First</option>
            <option value="funding-high">Highest Funding First</option>
            <option value="funding-low">Lowest Funding First</option>
          </select>
        </div>
      </div>

      <div className={styles.resultsCount}>
        Showing {filteredAndSortedStartups.length} {filteredAndSortedStartups.length === 1 ? 'startup' : 'startups'}
      </div>

      {filteredAndSortedStartups.length > 0 ? (
        <div className={styles.grid}>
          {filteredAndSortedStartups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>No startups found matching your criteria.</p>
          <button 
            className="btn" 
            onClick={() => {
              setSearchQuery("");
              setCategoryFilter("All");
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
