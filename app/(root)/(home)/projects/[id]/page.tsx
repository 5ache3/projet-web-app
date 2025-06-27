import ProjectHero from '@/components/modals/project/ProjectHero';
import { getProject } from '@/lib/actions/project.actions';
import { getSession } from '@/lib/session';


export default async function page({ params }: { params: { id: string } }) {
  const {id} = await params;
  
  const session = await getSession();
  const u_id = session?.userId;
  let data;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/projects/${id}`);
    // const response = await getProject({id});

    data = await response.json();
    
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }

  if (data) {
    return  data ? (
    <section>
      <ProjectHero
        data={data}
        tasks={data.tasks || []} 
        u_id={u_id}
        p_id={id}
      />
    </section>

    ):<></>
  }

  return null; 
}
