import ProjectEditor from '@/components/ProjectEditor';

const emptyProject = {
  slug: '',
  title: '',
  category: 'Brand Identity',
  year: new Date().getFullYear().toString(),
  tags: [],
  description: '',
  longDescription: '',
  image: '',
  gallery: [],
  videoUrl: '',
  challenge: '',
  solution: '',
  outcome: '',
  featured: false,
  order: 0,
};

export default function NewProjectPage() {
  return <ProjectEditor project={emptyProject} isNew />;
}
