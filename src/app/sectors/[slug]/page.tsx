import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSectorBySlug, getAllSectors } from "@/data/sectorsData";
import SectorPageClient from "@/components/sectors/SectorPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const sectors = getAllSectors();
  const staticParams: { slug: string }[] = [];

  for (const s of sectors) {
    staticParams.push({ slug: s.slug });
    if (s.aliases) {
      for (const alias of s.aliases) {
        staticParams.push({ slug: alias });
      }
    }
  }

  return staticParams;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);

  if (!sector) {
    return {
      title: "Sector Not Found | INA Tech FM",
    };
  }

  return {
    title: `${sector.title} Facility Management & Engineering Services | INA Tech FM`,
    description: sector.description,
    openGraph: {
      title: `${sector.title} Facilities & Engineering | INA Tech FM`,
      description: sector.description,
      images: [sector.coverImage],
    },
  };
}

export default async function SectorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);

  if (!sector) {
    notFound();
  }

  return <SectorPageClient sector={sector} />;
}
