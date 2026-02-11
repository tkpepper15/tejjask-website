import { CONFIG } from "../../site.config"
import { NextPageWithLayout, TPost } from "../types"
import { getPosts } from "../apis"
import MetaConfig from "src/components/MetaConfig"
import { queryClient } from "src/libs/react-query"
import { queryKey } from "src/constants/queryKey"
import { GetStaticProps } from "next"
import { dehydrate } from "@tanstack/react-query"
import { filterPosts } from "src/libs/utils/notion"
import BlogLayout from 'src/layouts/BlogLayout';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllTags } from "src/libs/utils/notion/getAllTags";

// Project data to be included alongside blog posts
const projectData: TPost[] = [
  {
    id: 'project-duke-applied-ethics',
    title: 'Duke Applied Ethics+ & NCSSM SRIP',
    description: "Research on the biopharma industry I presented at Duke, SNCURCS, and the NCSSM Alumni Weekend in 2024.",
    date: { start_date: '2024-07-01' },
    createdTime: '2024-07-01',
    slug: 'duke-applied-ethics',
    tags: ['Research', 'Healthcare'],
    categories: ['Project'],
    thumbnail: '/images/dukeappliedethics.png',
    status: ['Public'],
    type: ['Post'],
  },
  {
    id: 'project-brailliant',
    title: 'Brailliant Website',
    description: 'Accessible platform bridging visual and tactile learning through innovative Braille technology.',
    date: { start_date: '2025-03-01' },
    createdTime: '2025-03-01',
    slug: 'brailliant-website',
    tags: ['Accessibility', 'Design'],
    categories: ['Project'],
    thumbnail: '/images/braillebox.png',
    status: ['Public'],
    type: ['Post'],
  },
  {
    id: 'project-neuro-ophthalmology',
    title: 'Neuro-Ophthalmology Guide',
    description: 'Digital guide exploring the intersection of neurology and ophthalmology with interactive materials.',
    date: { start_date: '2024-03-01' },
    createdTime: '2024-03-01',
    slug: 'neuro-ophthalmology-guide',
    tags: ['Neuroscience', 'Research'],
    categories: ['Project'],
    thumbnail: '/images/neuro-ophthalmology.png',
    status: ['Public'],
    type: ['Post'],
  }
];

export const getStaticProps: GetStaticProps = async () => {
  const posts = filterPosts(await getPosts())
  await queryClient.prefetchQuery(queryKey.posts(), () => posts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: CONFIG.revalidateTime,
  }
}

interface PostCardProps {
  post: TPost;
  onTagClick?: (tag: string) => void;
  selectedTags?: string[];
}

// Define project external links mapping
const projectLinks: { [key: string]: string } = {
  'project-duke-applied-ethics': 'https://applied-ethics.vercel.app/',
  'project-brailliant': 'https://brailliant.vercel.app/',
  'project-neuro-ophthalmology': 'https://tkpepper15.github.io/neuro-midterm/',
};

const PostCard: React.FC<PostCardProps> = ({ post, onTagClick, selectedTags = [] }) => {
  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    onTagClick?.(tag);
  };

  const isProject = post.categories?.includes('Project');
  const externalLink = projectLinks[post.id];

  return (
    <PostCardWrapper>
      {isProject && externalLink ? (
        <ExternalStyledLink href={externalLink} target="_blank" rel="noopener noreferrer">
          <PostCardContent post={post} onTagClick={handleTagClick} selectedTags={selectedTags} />
        </ExternalStyledLink>
      ) : (
        <StyledLink href={`/${post.slug}`}>
          <PostCardContent post={post} onTagClick={handleTagClick} selectedTags={selectedTags} />
        </StyledLink>
      )}
    </PostCardWrapper>
  );
};

interface PostCardContentProps {
  post: TPost;
  onTagClick: (e: React.MouseEvent, tag: string) => void;
  selectedTags: string[];
}

const PostCardContent: React.FC<PostCardContentProps> = ({ post, onTagClick, selectedTags }) => {
  return (
    <>
      {post.thumbnail && (
        <ImageWrapper>
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </ImageWrapper>
      )}
      <CardBody>
        <PostDate>
          {new Date(post.date?.start_date || post.createdTime).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </PostDate>
        <PostTitle>{post.title}</PostTitle>
        <PostDescription>{post.description || post.summary}</PostDescription>
        <MetadataContainer>
          <MetadataRow>
            <AllTags>
              {post.categories && post.categories.length > 0 && 
                post.categories.map(category => (
                  <Category key={category}>{category}</Category>
                ))
              }
              {post.tags && post.tags.length > 0 && 
                post.tags.map(tag => (
                  <PostTag 
                    key={tag}
                    onClick={(e) => onTagClick(e, tag)}
                    isActive={selectedTags.includes(tag)}
                  >
                    {tag}
                  </PostTag>
                ))
              }
            </AllTags>
          </MetadataRow>
        </MetadataContainer>
      </CardBody>
    </>
  );
};

const BlogPage: NextPageWithLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  
  const { data: notionPosts = [] } = useQuery<TPost[]>(queryKey.posts());
  
  // Combine Notion posts with project data
  const posts = useMemo(() => {
    return [...notionPosts, ...projectData].sort((a, b) => {
      const dateA = new Date(a.date?.start_date || a.createdTime);
      const dateB = new Date(b.date?.start_date || b.createdTime);
      return dateB.getTime() - dateA.getTime();
    });
  }, [notionPosts]);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const { categories, tags } = useMemo(() => {
    const uniqueCategories = new Set();
    posts.forEach(post => {
      post.categories?.forEach(category => {
        if (category !== 'Project') { // Exclude Project from category filters
          uniqueCategories.add(category);
        }
      });
    });

    // Get tag counts from posts
    const tagCounts = getAllTags(posts);
    
    // Add Project category to tags for filtering
    const projectCount = posts.filter(post => 
      post.categories?.includes('Project')
    ).length;
    
    if (projectCount > 0) {
      tagCounts['Project'] = projectCount;
    }
    
    return { 
      categories: Array.from(uniqueCategories) as string[],
      tags: tagCounts
    };
  }, [posts]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(cat => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const filteredPosts = posts?.filter(post => {
    if (!post) return false;
    
    // Search matching
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Category matching - show all posts if no categories selected
    const matchesCategory = selectedCategories.length === 0 || 
      (post.categories && post.categories.some(cat => selectedCategories.includes(cat)));
    
    // Tag matching - show all posts if no tags selected
    // Check both post.tags and post.categories (for Project tag)
    const matchesTags = selectedTags.length === 0 ||
      (post.tags && post.tags.some(tag => selectedTags.includes(tag))) ||
      (post.categories && post.categories.some(category => selectedTags.includes(category)));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  const sortedTags = useMemo(() => {
    return Object.entries(tags)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 10); // Show only top 10 tags
  }, [tags]);

  const meta = {
    title: CONFIG.blog.title,
    description: CONFIG.blog.description,
    type: "website",
    url: CONFIG.link,
  }

  if (!mounted) return null;

  return (
    <>
      <MetaConfig {...meta} />
      <BlogLayout 
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryClick}
        categories={categories}
        selectedTags={selectedTags}
        onTagChange={handleTagClick}
        tags={sortedTags}
      >
        {!filteredPosts || filteredPosts.length === 0 ? (
          <EmptyState>No posts found</EmptyState>
        ) : (
          <PostGrid>
            {filteredPosts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onTagClick={handleTagClick}
                selectedTags={selectedTags}
              />
            ))}
          </PostGrid>
        )}
      </BlogLayout>
    </>
  );
};

const FilterBar = styled.div`
  margin-bottom: 1.5rem;
  min-height: 40px;
`;

const BlogGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BlogCard = styled(motion.article)`
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  height: 100%;
  display: flex;

  @media (max-width: 768px) {
    border-radius: 12px;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.gray8};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  width: 100%;
`;

const ExternalStyledLink = styled.a`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  width: 100%;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;

  @media (max-width: 768px) {
    height: 160px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
`;

const CardBody = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const PostDate = styled.time`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray10};
  display: block;
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const PostTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray12};
  margin: 0 0 0.75rem 0;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }
`;

const PostDescription = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.gray11};
  line-height: 1.6;
  margin-bottom: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    margin-bottom: 1rem;
    -webkit-line-clamp: 2;
  }
`;

const MetadataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: auto;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const Categories = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Category = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  color: ${({ theme }) => theme.colors.gray11};
  white-space: nowrap;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    font-size: 0.6875rem;
    padding: 0.2rem 0.4rem;
  }
`;

const FilterSection = styled.div`
  margin: 0 0 2rem;
  display: flex;
  flex-direction: column;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TagPill = styled.button<{ isActive: boolean }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  background: ${({ theme, isActive }) => isActive ? theme.colors.gray3 : 'none'};
  border: 1px solid ${({ theme, isActive }) => 
    isActive ? theme.colors.gray8 : theme.colors.gray5};
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.gray12 : theme.colors.gray11};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gray7};
    color: ${({ theme }) => theme.colors.gray12};
  }
`;

const MetadataRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PostTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const AllTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const PostTag = styled.button<{ isActive: boolean }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  background: none;
  border: 1px solid ${({ theme, isActive }) => 
    isActive ? theme.colors.gray7 : theme.colors.gray5};
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.gray12 : theme.colors.gray11};
  cursor: pointer;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    font-size: 0.6875rem;
    padding: 0.2rem 0.4rem;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.gray7};
    color: ${({ theme }) => theme.colors.gray12};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  border-radius: 12px;
  margin-top: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem 0;
    margin: 0.5rem 0;
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
`;

const EmptyText = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.gray12};
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const EmptyDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray11};
  font-size: 0.9375rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const PostGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 0.5rem;
    padding: 0 0.25rem;
  }
`;

const PostCardWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  height: 100%;
  display: flex;
  background: ${({ theme }) => theme.colors.gray2};

  @media (max-width: 768px) {
    border-radius: 8px;
    border: none;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.gray8};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
  }
`;

const Container = styled.div`
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

export default BlogPage;