import ProjectHero from '@/components/modals/project/ProjectHero';
import { getProject } from '@/lib/actions/project.actions';
import { currentUser } from '@clerk/nextjs/server';

export default async function page({ params }: { params: { id: string } }) {
  const id = await params.id;
  const url = `http://localhost:3000/api/projects/${id}`.trim();
  const user = await currentUser();
  const u_id=user?.id;
  let data;
  try {
    // const response = await fetch(url);
    const response = await getProject({id});

    data = await response;
    
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }

  if (data) {
    return (
      <section>
        <ProjectHero
          data={data}
          tasks={data.tasks || []} 
          u_id={u_id}
        />
      </section>
    );
  }

  return null; 
}
