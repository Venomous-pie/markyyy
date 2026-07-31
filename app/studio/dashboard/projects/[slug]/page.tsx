import { getProjectBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import ProjectEditor from '@/components/ProjectEditor';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectEditor project={project} />;
}
