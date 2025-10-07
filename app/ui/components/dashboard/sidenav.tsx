// app/ui/components/dashboard/sidenav/index.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { useAuthStore } from "@/context/auth-store";
import { useBooksStore } from "@/context/books-store";
import Search from "./sidenav/search";
import UserGenres from "./sidenav/user-genre";
import Discovery from "./sidenav/discovery";
import UserProfile from "./sidenav/user-profile";
import { SideNavProps } from "./sidenav/types";


export default function SideNav({}: SideNavProps) {
  const { user, logout } = useAuthStore();
  const { 
    loadGenres, 
    searchBooks,
    searchResults, 
    isSearching,
    searchError 
  } = useBooksStore();
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    loadGenres();
  }, [loadGenres]);

  // Add useEffect to monitor search results changes
  useEffect(() => {
    if (searchResults) {
      console.log('📚 Search results updated:', searchResults);
      console.log(`🎉 Found ${searchResults.books.length} books using natural language search`);
    }
  }, [searchResults]);

  // Add useEffect to monitor search errors
  useEffect(() => {
    if (searchError) {
      console.error('❌ Search error occurred:', searchError);
    }
  }, [searchError]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔍 Natural language search initiated:', { searchQuery, searchType });
    
    if (!searchQuery.trim()) {
      console.log('❌ Search query is empty');
      return;
    }
    
    try {
      console.log('📡 Calling searchBooks (natural language search)...');
      
      // Use searchBooks for natural language queries
      await searchBooks(searchQuery, {
        searchType: searchType === "all" ? undefined : searchType,
        includeDescriptions: true
      });
      
      // Don't check searchResults here - it might not be updated yet
      console.log('✅ Natural language search request completed');
      
    } catch (error) {
      console.error('💥 Search failed:', error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const favoriteGenres = user?.preferences?.favoriteGenres || [];

  return (
    <div className="mt-28 flex h-full flex-col px-3 py-4 md:px-2 bg-gray-100">
      {/* Header */}
      <Link
        className="mb-6 flex h-20 items-end justify-start rounded-md bg-primary p-4 md:h-32"
        href="/"
      >
        <div className="w-full text-white flex text-2xl items-center gap-3 font-semibold">
          <GraduationCap size={48} /> 
          <span>LitKenya</span>
        </div>
      </Link>

      {/* Search Section - Now using natural language search */}
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchType={searchType}
        setSearchType={setSearchType}
        isLoading={isSearching}
        onSearch={handleSearch}
        showAdvanced={showAdvanced}
        setShowAdvanced={setShowAdvanced}
      />

      {/* Content Sections */}
      <div className="flex grow flex-col space-y-6">
        {/* User's Favorite Genres */}
        <UserGenres favoriteGenres={favoriteGenres} />

        {/* Discover New Genres */}
        <Discovery />

        {/* Spacer to push profile to bottom */}
        <div className="flex-grow"></div>

        {/* User Profile and Logout */}
        <UserProfile user={user} onLogout={handleLogout} />
      </div>
    </div>
  );
}